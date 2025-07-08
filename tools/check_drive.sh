#!/bin/bash
# Fail if MEDIA_ROOT not writable
CHECK_PATH="${DJANGO_MEDIA_ROOT:-./media}"
if [ ! -w "$CHECK_PATH" ]; then
  echo "$CHECK_PATH not writable" >&2
  exit 1
fi
