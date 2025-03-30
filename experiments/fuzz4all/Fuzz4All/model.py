# model.py

import os
import time
from typing import List
from openai import OpenAI

os.environ["TOKENIZERS_PARALLELISM"] = "false"  # Disable warning

class GPT4Model:
    def __init__(self, model_name: str, device: str, eos: List[str], max_tokens: int) -> None:
        self.model_name = model_name
        self.device = device  # Device is not used with OpenAI API but kept for compatibility
        self.eos = eos[:4]  # Limit to maximum 4 stop sequences
        self.max_tokens = max_tokens

        # Ensure the API key is set
        if 'OPENAI_API_KEY' not in os.environ:
            raise ValueError("Please set the OPENAI_API_KEY environment variable.")

        self.client = OpenAI(
            api_key=os.environ['OPENAI_API_KEY'],
        )

    def generate(
        self, prompt: str, batch_size: int = 1, temperature: float = 0.8, max_tokens: int = 512
    ) -> List[str]:
        completions = []
        for _ in range(batch_size):
            try:
                response = self.client.chat.completions.create(
                    model=self.model_name,
                    messages=[{"role": "user", "content": prompt}],
                    max_tokens=max_tokens,
                    temperature=temperature,
                    top_p=0.95,
                    n=1,
                    stop=self.eos,
                )
                generated_text = response.choices[0].message.content.strip()
                completions.append(generated_text)
            except Exception as e:
                # Generic exception handling
                print(f"An error occurred: {e}")
                completions.append("")
        return completions

def make_model(eos: List[str], model_name: str, device: str, max_length: int):
    """Returns a language model instance using the OpenAI API."""

    kwargs_for_model = {
        "model_name": model_name,
        "eos": eos,
        "device": device,
        "max_tokens": max_length,
    }

    # Print the model config
    print("=== Model Config ===")
    for k, v in kwargs_for_model.items():
        print(f"{k}: {v}")

    model_obj = GPT4Model(**kwargs_for_model)

    print(f"model_obj (class name): {model_obj.__class__.__name__}")
    print("====================")

    return model_obj
