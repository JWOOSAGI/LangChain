
from dataclasses import dataclass


@dataclass
class TitanicModel:
    context: str
    fname : str
    train : object
    test: object
    id: str
    label: str

    @property
    def context(self) -> str: return self._context

    @context.setter
    def context(self, context): self._context = context

    @property
    def fname(self) ->str: return self._fname