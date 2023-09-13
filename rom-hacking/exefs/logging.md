---
sidebar_position: 6
---

# Logging

## Introduction

Logging is a very useful tool for debugging. You can send text messages from your switch/emulator to your PC hosting the logging server.

## Sending logs from the code

1. Edit `config.cmake` and change the server IP to your PCs IP. If testing on emulator, the loopback address (127.0.0.1) will work as well.
2. In your code, add `#include "logger/logger.h"` to the top of your file.
3. Call the `Logger::log("<Your message>\n")` method to send a message to the logging server.

:::info

Make sure to always end your message with `\n`. A message is only sent by the logger once a line break is detected.

:::

4. Rebuild your project for the changes to take effect.

## Running the logging server

Simply run the `scripts\logger_server.py` script in python. Make sure to start the server before running the game, since it only attempts to connect at launch and does not send logs otherwise.
