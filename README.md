# taskonfirm
![lint](https://github.com/loxygenK/taskonfirm/workflows/lint/badge.svg)
![test](https://github.com/loxygenK/taskonfirm/workflows/test/badge.svg)
![.github/workflows/ci-test-run.yml](https://github.com/loxygenK/taskonfirm/workflows/.github/workflows/ci-test-run.yml/badge.svg)

Fails when any check-box in the pull request's body is not checked. <br>

## How this works
Just fails when there are unchecked checkboxes.<br>
Checkboxes which the label is surrounded by `~~` isn't be checked.

## How to use
`Use` this action in **`pull_request` event**.

```yaml
name: Todo check

on:
  pull_request:
    types: [ opened, edited ]

jobs:
  eslint:
    runs-on: ubuntu-latest

    steps:
      - uses: loxygenK/taskonfirm@v1.0.0
```

---

PRの本文のチェックボックスにチェックが入っていないと落ちるactionです。 <br>

## 仕様
**チェックが入っていないチェックボックス**があると落ちます。<br>
ただし、**チェックボックスのラベルが`~~`で囲まれている場合**は判定対象になりません。

## 使い方
**`pull_request`** イベントの中で`use`してください。.

```yaml
name: Todo check

on:
  pull_request:
    types: [ opened, edited ]

jobs:
  eslint:
    runs-on: ubuntu-latest

    steps:
      - uses: loxygenK/taskonfirm@v1.0.0
```
