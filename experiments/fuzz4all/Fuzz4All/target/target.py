# target.py

import glob
import os
import random
import time
from enum import Enum
from typing import Any, Dict, List, Tuple, Union

from rich.progress import track
from openai import OpenAI

from Fuzz4All.model import make_model
from Fuzz4All.util.api_request import create_config, request_engine
from Fuzz4All.util.Logger import LEVEL, Logger

class FResult(Enum):
    SAFE = 1  # Validation returns okay
    FAILURE = 2  # Validation contains error (something wrong with validation)
    ERROR = 3  # Validation returns a potential error (look into)
    LLM_WEAKNESS = 4  # The generated input is ill-formed due to the weakness of the language model
    TIMED_OUT = 10  # Timed out, can be okay in certain targets

class Target(object):
    def __init__(self, language="c", timeout=10, folder="/", **kwargs):
        self.language = language
        self.folder = folder
        self.timeout = timeout
        self.CURRENT_TIME = time.time()
        # Model-based variables
        self.batch_size = kwargs["bs"]
        self.temperature = kwargs["temperature"]
        self.max_length = kwargs["max_length"]
        self.device = kwargs["device"]
        self.model_name = kwargs["model_name"]
        self.model = None
        # Loggers
        self.g_logger = Logger(self.folder, "log_generation.txt", level=kwargs["level"])
        self.v_logger = Logger(self.folder, "log_validation.txt", level=kwargs["level"])
        # Main logger for system messages
        self.m_logger = Logger(self.folder, "log.txt", level=kwargs["level"])
        # System messages for prompting
        self.SYSTEM_MESSAGE = None
        self.AP_SYSTEM_MESSAGE = "You are an auto-prompting tool"
        self.AP_INSTRUCTION = (
            "Please summarize the above documentation in a concise manner to describe the usage and "
            "functionality of the target."
        )
        # Prompt-based variables
        self.hw = kwargs["use_hw"]
        self.no_input_prompt = kwargs["no_input_prompt"]
        self.prompt_used = None
        self.prompt = None
        self.initial_prompt = None
        self.prev_example = None
        # Prompt strategies
        self.se_prompt = self.wrap_in_comment(
            "Please create a semantically equivalent program to the previous generation."
        )
        self.m_prompt = self.wrap_in_comment(
            "Please create a mutated program that modifies the previous generation."
        )
        self.c_prompt = self.wrap_in_comment(
            "Please combine the two previous programs into a single program."
        )
        self.p_strategy = kwargs["prompt_strategy"]
        # EOS based
        self.special_eos = None
        if "model_name" in kwargs:
            self.model_name = kwargs["model_name"]
        if "target_name" in kwargs:
            self.target_name = kwargs["target_name"]
        # Initialize the OpenAI client
        if 'OPENAI_API_KEY' not in os.environ:
            raise ValueError("Please set the OPENAI_API_KEY environment variable.")

        self.client = OpenAI(
            api_key=os.environ['OPENAI_API_KEY'],
        )

    @staticmethod
    def _create_prompt_from_config(config_dict: Dict[str, Any]) -> Dict:
        """Read the prompt ingredients via a config file."""
        documentation, example_code, hand_written_prompt = None, None, None

        # Read the prompt ingredients from the config file
        target = config_dict["target"]
        path_documentation = target["path_documentation"]
        if path_documentation is not None:
            documentation = open(path_documentation, "r").read()
        path_example_code = target["path_example_code"]
        if path_example_code is not None:
            example_code = open(path_example_code, "r").read()
        trigger_to_generate_input = target["trigger_to_generate_input"]
        input_hint = target["input_hint"]
        path_hand_written_prompt = target["path_hand_written_prompt"]
        if path_hand_written_prompt is not None:
            hand_written_prompt = open(path_hand_written_prompt, "r").read()
        target_string = target["target_string"]
        dict_compat = {
            "docstring": documentation,
            "example_code": example_code,
            "separator": trigger_to_generate_input,
            "begin": input_hint,
            "hw_prompt": hand_written_prompt,
            "target_api": target_string,
        }
        return dict_compat

    def write_back_file(self, code: str):
        raise NotImplementedError

    def validate_prompt(self, prompt: str):
        fos = self.model.generate(
            prompt,
            batch_size=self.batch_size,
            temperature=self.temperature,
            max_tokens=self.max_length,
        )
        unique_set = set()
        score = 0
        for fo in fos:
            code = self.prompt_used["begin"] + "\n" + fo
            wb_file = self.write_back_file(code)
            result, _ = self.validate_individual(wb_file)
            if (
                result == FResult.SAFE
                and self.filter(code)
                and self.clean_code(code) not in unique_set
            ):
                unique_set.add(self.clean_code(code))
                score += 1
        return score

    def wrap_prompt(self, prompt: str) -> str:
        raise NotImplementedError

    def wrap_in_comment(self, prompt: str) -> str:
        raise NotImplementedError

    def _create_auto_prompt_message(self, message: str) -> List[dict]:
        return [
            {"role": "system", "content": self.AP_SYSTEM_MESSAGE},
            {"role": "user", "content": message + "\n" + self.AP_INSTRUCTION},
        ]

    def auto_prompt(self, **kwargs) -> str:
        os.makedirs(self.folder + "/prompts", exist_ok=True)

        # If we have already done auto-prompting, just return the best prompt
        if os.path.exists(self.folder + "/prompts/best_prompt.txt"):
            self.m_logger.logo("Using existing prompt...", level=LEVEL.INFO)
            with open(
                self.folder + "/prompts/best_prompt.txt", "r", encoding="utf-8"
            ) as f:
                return f.read()
        if kwargs["no_input_prompt"]:
            self.m_logger.logo("Without any input prompt...", level=LEVEL.INFO)
            best_prompt = (
                f"{self.prompt_used['separator']}\n{self.prompt_used['begin']}"
            )
        elif kwargs["hw"]:
            self.m_logger.logo("Using handwritten prompt...", level=LEVEL.INFO)
            best_prompt = self.wrap_prompt(kwargs["hw_prompt"])
        else:
            self.m_logger.logo("Using auto-prompting...", level=LEVEL.INFO)
            message = kwargs["message"]
            # First run with temperature 0.0 to get the initial prompt
            response = self._call_openai_api(
                self._create_auto_prompt_message(message),
                temperature=0.0
            )
            greedy_prompt = self.wrap_prompt(response)
            with open(
                self.folder + "/prompts/greedy_prompt.txt", "w", encoding="utf-8"
            ) as f:
                f.write(greedy_prompt)
            # Validate the initial prompt
            best_prompt = greedy_prompt
            best_score = self.validate_prompt(greedy_prompt)
            with open(self.folder + "/prompts/scores.txt", "a") as f:
                f.write(f"Greedy prompt score: {str(best_score)}\n")
            # Generate additional prompts with higher temperature
            for i in track(range(3), description="Generating prompts..."):
                response = self._call_openai_api(
                    self._create_auto_prompt_message(message),
                    temperature=1.0
                )
                prompt = self.wrap_prompt(response)
                with open(
                    self.folder + f"/prompts/prompt_{i}.txt",
                    "w",
                    encoding="utf-8",
                ) as f:
                    f.write(prompt)
                score = self.validate_prompt(prompt)
                if score > best_score:
                    best_score = score
                    best_prompt = prompt
                # Dump score
                with open(self.folder + "/prompts/scores.txt", "a") as f:
                    f.write(f"Prompt {i} score: {str(score)}\n")

        # Dump best prompt
        with open(self.folder + "/prompts/best_prompt.txt", "w", encoding="utf-8") as f:
            f.write(best_prompt)

        return best_prompt

    def _call_openai_api(self, messages: List[Dict[str, str]], temperature: float = 0.0) -> str:
        """Calls the OpenAI API to generate a prompt."""
        try:
            response = self.client.chat.completions.create(
                model=self.model_name,  # Use your specified model
                messages=messages,
                temperature=temperature,
                max_tokens=500,
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            # Generic exception handling
            print(f"An error occurred during auto-prompting: {e}")
            return ""

    def initialize(self):
        self.m_logger.logo(
            "Initializing... This may take a while...", level=LEVEL.INFO
        )
        self.m_logger.logo("Loading model...", level=LEVEL.INFO)
        eos = [
            self.prompt_used["separator"],
            "<eom>",
            self.se_prompt,
            self.m_prompt,
            self.c_prompt,
        ]
        if hasattr(self, "config_dict"):
            llm = self.config_dict["llm"]
            model_name = llm["model_name"]
            additional_eos = llm.get("additional_eos", [])
            if additional_eos:
                eos += additional_eos
        else:
            model_name = self.model_name

        if self.special_eos is not None:
            eos.append(self.special_eos)

        self.model = make_model(
            eos=eos,
            model_name=model_name,
            device=self.device,
            max_length=self.max_length,
        )
        self.m_logger.logo("Model Loaded", level=LEVEL.INFO)
        self.initial_prompt = self.auto_prompt(
            message=self.prompt_used["docstring"],
            hw_prompt=self.prompt_used["hw_prompt"] if self.hw else None,
            hw=self.hw,
            no_input_prompt=self.no_input_prompt,
        )
        self.prompt = self.initial_prompt
        self.m_logger.logo("Initialization Done", level=LEVEL.INFO)

    def generate_model(self) -> List[str]:
        self.g_logger.logo(self.prompt, level=LEVEL.VERBOSE)
        return self.model.generate(
            self.prompt,
            batch_size=self.batch_size,
            temperature=self.temperature,
            max_tokens=self.max_length,
        )

    def generate(self, **kwargs) -> Union[List[str], bool]:
        try:
            fos = self.generate_model()
        except Exception as e:
            # Catch any errors during generation
            self.m_logger.logo(f"An error occurred during generation: {e}", level=LEVEL.INFO)
            return False
        new_fos = []
        for fo in fos:
            self.g_logger.logo("========== Sample =========", level=LEVEL.VERBOSE)
            new_fos.append(self.clean(self.prompt_used["begin"] + "\n" + fo))
            self.g_logger.logo(
                self.clean(self.prompt_used["begin"] + "\n" + fo), level=LEVEL.VERBOSE
            )
            self.g_logger.logo("========== Sample =========", level=LEVEL.VERBOSE)
        return new_fos

    def filter(self, code: str) -> bool:
        raise NotImplementedError

    def clean(self, code: str) -> str:
        raise NotImplementedError

    def clean_code(self, code: str) -> str:
        raise NotImplementedError

    def update_strategy(self, new_code: str) -> str:
        while True:
            strategy = random.randint(0, self.p_strategy)
            # Generate new code using separator
            if strategy == 0:
                return f"\n{new_code}\n{self.prompt_used['separator']}\n"
            # Mutate existing code
            elif strategy == 1:
                return f"\n{new_code}\n{self.m_prompt}\n"
            # Semantically equivalent code generation
            elif strategy == 2:
                return f"\n{new_code}\n{self.se_prompt}\n"
            # Combine previous two code generations
            else:
                if self.prev_example is not None:
                    return f"\n{self.prev_example}\n{self.prompt_used['separator']}\n{self.prompt_used['begin']}\n{new_code}\n{self.c_prompt}\n"

    def update(self, **kwargs):
        new_code = ""
        for result, code in kwargs["prev"]:
            if (
                result == FResult.SAFE
                and self.filter(code)
                and self.clean_code(code) != self.prev_example
            ):
                new_code = self.clean_code(code)
        if new_code != "" and self.p_strategy != -1:
            self.prompt = (
                self.initial_prompt
                + self.update_strategy(new_code)
                + self.prompt_used["begin"]
                + "\n"
            )
            self.prev_example = new_code

    def validate_individual(self, filename) -> Tuple[FResult, str]:
        raise NotImplementedError

    def parse_validation_message(self, f_result, message, file_name):
        self.v_logger.logo("Validating {} ...".format(file_name), level=LEVEL.TRACE)
        if f_result == FResult.SAFE:
            self.v_logger.logo("{} is safe".format(file_name), level=LEVEL.VERBOSE)
        elif f_result == FResult.FAILURE:
            self.v_logger.logo(
                "{} failed validation with error message: {}".format(
                    file_name, message
                ), level=LEVEL.VERBOSE
            )
        elif f_result == FResult.ERROR:
            self.v_logger.logo(
                "{} has potential error!\nError message:\n{}".format(
                    file_name, message
                ), level=LEVEL.VERBOSE
            )
            self.m_logger.logo(
                "{} has potential error!".format(file_name), level=LEVEL.INFO
            )
        elif f_result == FResult.TIMED_OUT:
            self.v_logger.logo("{} timed out".format(file_name), level=LEVEL.VERBOSE)

    def validate_all(self):
        for fuzz_output in track(
            glob.glob(self.folder + "/*.fuzz"),
            description="Validating",
        ):
            f_result, message = self.validate_individual(fuzz_output)
            self.parse_validation_message(f_result, message, fuzz_output)