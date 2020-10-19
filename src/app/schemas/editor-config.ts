import { NgxMonacoEditorConfig } from 'ngx-monaco-editor';

export const monacoConfig: NgxMonacoEditorConfig = {
  onMonacoLoad: () => {
    const monaco = (<any>window).monaco;

    monaco.languages.register({ id: 'protobuf' });
    monaco.languages.setMonarchTokensProvider('protobuf', monarchTokenProvider);
    monaco.editor.defineTheme('protobuf-theme', theme);
  }
};

const theme: any = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'keyword', foreground: '324aa8', fontStyle: 'bold' },
  ]
};

const monarchTokenProvider: any = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  defaultToken: 'invalid',

  keywords: [
    'message', 'oneof', 'enum', 'map', 'repeated', 'optional', 'required',
    'package', 'import', 'option', 'syntax', 'weak', 'public', 'reserved', 'extensions',
    'to', 'max', 'min'
  ],

  brackets: [
    { open: '{', close: '}', token: 'delimiter.curly' },
    { open: '<', close: '>', token: 'delimiter.angle' }
  ],

  typeKeywords: [
    'double', 'float', 'int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64', 'fixed32', 'fixed64', 'sfixed32', 'sfixed64', 'bool', 'string', 'bytes'
  ],

  namespaceFollows: [
    'package'
  ],

  // operators: [
  //   '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
  //   '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
  //   '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
  //   '%=', '<<=', '>>=', '>>>='
  // ],

  // // we include these common regular expressions
  // symbols:  /[=]+/,

  // // C# style strings
  // escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  rules: {},

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // // identifiers and keywords
      // [/[a-z_$][\w$]*/, { cases: { '@typeKeywords': 'keyword',
      //                              '@keywords': 'keyword',
      //                              '@default': 'identifier' } }],
      // [/[A-Z][\w\$]*/, 'type.identifier' ],  // to show class names nicely

      [/\@?[a-zA-Z_]\w*/, {
        cases: {
          '@namespaceFollows': { token: 'keyword.$0', next: '@namespace' },
          '@keywords': { token: 'keyword.$0', next: '@qualified' },
          '@typeKeywords': { token: 'type.$0', next: '@qualified' },
          //'@symbols': { token: 'symbol', next: '@qualified' },
          '@default': { token: 'identifier', next: '@qualified' }
        }
      }],

      // // whitespace
      { include: '@whitespace' },

      { include: '@delimiter' },

      { include: '@symbols' },

      [/[{}<>\[\]]/, '@brackets'],

      [/"/, { token: 'string.quote', next: '@litstring' }],

      { include: '@litnumber' },

      // // delimiters and operators
      // [/[{}()\[\]]/, '@brackets'],
      // [/[<>](?!@symbols)/, '@brackets'],
      // [/@symbols/, { cases: { '@operators': 'operator',
      //                         '@default'  : '' } } ],

      // // @ annotations.
      // // As an example, we emit a debugging log message on these tokens.
      // // Note: message are supressed during the first load -- change some lines to see them.
      // [/@\s*[a-zA-Z_\$][\w\$]*/, { token: 'annotation', log: 'annotation token: $0' }],

      // // numbers
      // [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
      // [/0[xX][0-9a-fA-F]+/, 'number.hex'],
      // [/\d+/, 'number'],

      // // delimiter: after number because of .\d floats
      // [/[;,.]/, 'delimiter'],

      // // strings
      // [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
      // [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],

      // // characters
      // [/'[^\\']'/, 'string'],
      // [/(')(@escapes)(')/, ['string','string.escape','string']],
      // [/'/, 'string.invalid']
    ],

    commentBlock: [
      [/[^\/*]+/, 'comment.block'],
      [/[\/*]/, 'comment.block'],
      ["\\*/", 'comment.block', '@pop'],
    ],
    commentLine: [
      [/\/\//, 'comment.line'],
      [/.*$/, 'comment.line', '@pop'],
    ],

    string: [
      [/[^\\"]+/, 'string'],
      // [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
    ],

    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/\/\*/, 'comment.block', '@commentBlock'],
      [/\/\//, 'comment.line', '@commentLine'],
    ],

    delimiter: [
      [/[;,.]/, 'delimiter']
    ],

    namespace: [
      { include: '@whitespace' },
      [/[A-Z]\w*/, 'namespace'],
      [/[\.]/, 'delimiter'],
      ['', '', '@pop'],
    ],

    qualified: [
      [/[a-zA-Z_][\w]*/, {
        cases: {
          '@keywords': { token: 'keyword.$0' },
          '@default': 'identifier'
        }
      }],
      [/\./, 'delimiter'],
      ['', '', '@pop'],
    ],

    litstring: [
      [/[^"]+/, 'string'],
      // [/""/, 'string.escape'],
      [/"/, { token: 'string.quote', next: '@pop' }]
    ],

    litnumber: [
      [/[0-9]+/, 'literal.number']
    ],


    symbols: [
      [/[=]+/, 'symbol']
    ],
  },
};
