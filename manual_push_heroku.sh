#!/bin/bash

git push $1 `git subtree split --prefix server $2`:master --force

