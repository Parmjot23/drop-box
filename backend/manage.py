#!/usr/bin/env python3
"""Django's command-line utility for administrative tasks."""
from __future__ import annotations

import os
import sys


def main() -> None:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'localbox.settings')
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
