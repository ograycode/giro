# Giro
A package manager for customizing the Vivaldi browser.

## Installation

`npm install -g giro`

## Usage

Giro adds `giro.css` to Vivaldi's `common.css` on `install` and on `uninstall` removes all customizations.

### Commands

#### Install

The `install` command looks for `giro.css` file, adds it to Vivaldi and copies the file. This allows you to reinstall after an update or modifying your customization.

Below is an example which hides the home button.

```
$ echo ".button-addressfield.home,.button-tabbar.home,.button-toolbar-small.home,.button-toolbar.home{display:none !important}" > giro.css
$ giro install
Giro installed
```

#### Uninstall

The `uninstall` command will remove the `giro.css` import from Vivaldi.

```
$ giro uninstall
Giro has been uninstalled
```

## Known Limitations

- All customizations have to be in `giro.css`
- Only tested on osx el capitan
