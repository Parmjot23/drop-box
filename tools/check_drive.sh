#!/bin/bash
# Fail if /mnt/localbox not writable
if [ ! -w /mnt/localbox ]; then
  echo "/mnt/localbox not writable" >&2
  exit 1
fi
