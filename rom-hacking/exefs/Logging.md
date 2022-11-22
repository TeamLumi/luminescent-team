# Logging

## WIP - These docs are a Work In Progress and are currently mostly for my own use

## Introduction

Logging is a very useful tool for debugging. You can send text messages from your switch/emulator to your PC hosting the logging server.

## How To

1. Edit `config.cmake` and change the server IP to your PCs IP.
2. In your code, add `#include "logger.hpp"` to the top of your file.
3. Call the `socket_log_fmt("<Your Message>");` method to send a message to the logging server.
4. Rebuild your project