# Fuzz4All/target/JavaScript/JavaScript.py

import subprocess
import time
from typing import List, Union

from Fuzz4All.target.target import FResult, Target
from Fuzz4All.util.Logger import LEVEL
from Fuzz4All.util.util import comment_remover

class JavaScriptTarget(Target):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.SYSTEM_MESSAGE = "You are a JavaScript Fuzzer"
        if kwargs["template"] == "fuzzing_with_config_file":
            config_dict = kwargs["config_dict"]
            self.prompt_used = self._create_prompt_from_config(config_dict)
            self.config_dict = config_dict
        else:
            raise NotImplementedError

    def write_back_file(self, code):
        try:
            with open(
                "/tmp/temp{}.js".format(self.CURRENT_TIME), "w", encoding="utf-8"
            ) as f:
                f.write(code)
        except:
            pass
        return "/tmp/temp{}.js".format(self.CURRENT_TIME)

    def wrap_prompt(self, prompt: str) -> str:
        return f"// {prompt}\n{self.prompt_used['separator']}\n{self.prompt_used['begin']}"

    def wrap_in_comment(self, prompt: str) -> str:
        return f"// {prompt}"

    def filter(self, code) -> bool:
        clean_code = code.replace(self.prompt_used["begin"], "").strip()
        if self.prompt_used.get("target_api", "") and self.prompt_used["target_api"] not in clean_code:
            return False
        return True

    def clean(self, code: str) -> str:
        code = comment_remover(code)
        return code

    def clean_code(self, code: str) -> str:
        code = comment_remover(code)
        code = "\n".join(
            [
                line
                for line in code.split("\n")
                if line.strip() != "" and line.strip() != self.prompt_used["begin"]
            ]
        )
        return code

    def validate_individual(self, filename) -> (FResult, str):
        try:
            cmd = f"{self.target_name} {filename}"
            exit_code = subprocess.run(
                cmd,
                shell=True,
                capture_output=True,
                encoding="utf-8",
                timeout=5,
                text=True,
            )
        except subprocess.TimeoutExpired:
            # Kill the process if it times out
            subprocess.run(
                f"pkill -f '{self.target_name} {filename}'",
                shell=True,
            )
            return FResult.TIMED_OUT, "Execution timed out"

        if exit_code.returncode == 0:
            return FResult.SAFE, "Execution successful"
        else:
            stderr = exit_code.stderr.strip()
            if stderr:
                return FResult.ERROR, stderr
            else:
                return FResult.FAILURE, "Unknown error occurred"

    def validate_all(self):
        # Implement if needed
        pass