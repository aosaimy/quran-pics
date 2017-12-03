# quranic-pics
An npm module script that generates ayats as a picture easily for uses with documents, webpages, etc.

## Install
`npm install aosaimy/quran-pics`

## Usage
### Via Command Line: 
`quranpics --help`, and for a specific command `quranpics search --help`

```
quranpics [command]

Commands:
  quranpics ayah [id]  produce ayah picture
  quranpics ayat       produce multiple ayah in one picture
  quranpics search     search for an ayah

Options:
  --help         Show help                                             [boolean]
  --version      Show version number                                   [boolean]
  --out, -o      if set, image will be save to the given path, otherwise it will be
                 output to standard output
  --verbose, -v  print more details                             [default: false]
  --size, -s     the height of the output picture in pixels       [default: 200]
  --format, -f   the format of the picture.                     [default: "PNG"]
```

### In code:
TODO

### Examples
`quranpics search محمد -v -f JPEG > tmp.jpeg`