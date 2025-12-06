"""
src package initializer.

This file allows importing modules from the src package, such as:
    from src.compliance_engine import check_compliance

It also exposes commonly used functions at the package level.
"""

from .compliance_engine import check_compliance

__all__ = ["check_compliance"]
