ECMAScript (/ˈɛkməskrɪpt/; ES)[1] is a standard for scripting languages, including JavaScript, JScript, and ActionScript. It is best known as a JavaScript standard intended to ensure the interoperability of web pages across different web browsers.[2] It is standardized by Ecma International in the document ECMA-262.

ECMAScript is commonly used for client-side scripting on the World Wide Web, and it is increasingly being used for server-side applications and services using runtime environments - Node.js,[3] deno[4] and bun.[5]

ECMAScript, ECMA-262, JavaScript
ECMA-262, or the ECMAScript Language Specification, defines the ECMAScript Language, or just ECMAScript.[6] ECMA-262 specifies only language syntax and the semantics of the core application programming interface (API), such as Array, Function, and globalThis, while valid implementations of JavaScript add their own functionality such as input/output and file system handling.

History
The ECMAScript specification is a standardized specification of a scripting language developed by Brendan Eich of Netscape; initially named Mocha, then LiveScript, and finally JavaScript.[7] In December 1995, Sun Microsystems and Netscape announced JavaScript in a press release.[8] In November 1996, Netscape announced a meeting of the Ecma International standards organization to advance the standardization of JavaScript.[9] The first edition of ECMA-262 was adopted by the Ecma General Assembly in June 1997. Several editions of the language standard have been published since then. The name "ECMAScript" was a compromise between the organizations involved in standardizing the language, especially Netscape and Microsoft, whose disputes dominated the early standards sessions. Eich commented that "ECMAScript was always an unwanted trade name that sounds like a skin disease."[10] ECMAScript has been formalized through operational semantics by work at Stanford University and the Department of Computing, Imperial College London for security analysis and standardization.[11] "ECMA" stood for "European Computer Manufacturers Association" until 1994.

Evolution
Main article: ECMAScript version history
Ecma's Technical Committee 39 (TC39) is responsible for the maintenance of ECMAScript.[12] New proposals to the language go through a staged process, with each stage representing the completeness of the proposal's specification. Consensus must be reached within the committee to advance a proposal to the next stage. Proposals that reach stage 4, the final stage, will be included into the next version of the standard.[13] Since the release of version 6 in June 2015, new major versions have been finalized and published every June.[14]

Features
[icon]	
This section needs expansion. You can help by adding to it. (February 2017)
Main articles: ECMAScript syntax and JavaScript § Features
The ECMAScript language includes structured, dynamic, functional, and prototype-based features.[15]

Imperative and structured
ECMAScript JavaScript supports C-style structured programming. Previously, JavaScript only supported function scoping using the keyword var, but ECMAScript 2015 added the keywords let and const, allowing JavaScript to support both block scoping and function scoping. JavaScript supports automatic semicolon insertion, meaning that semicolons that normally terminate a statement in C may be omitted in JavaScript.[16]

Like C-style languages, control flow is done with the while, for, do / while, if / else, and switch statements. Functions are weakly typed and may accept and return any type. Arguments not provided default to undefined.

Weakly typed
ECMAScript is weakly typed. This means that certain types are assigned implicitly based on the operation being performed. However, there are several quirks in JavaScript's implementation of the conversion of a variable from one type to another. These quirks have been the subject of a talk entitled Wat.[17][18]

Dynamic
ECMAScript is dynamically typed. Thus, a type is associated with a value rather than an expression. ECMAScript supports various ways to test the type of objects, including duck typing.[19]

Transpiling
Main article: JavaScript § transpilers
Since ES 2015, transpiling JavaScript has become very common. Transpilation is a source-to-source compilation in which newer versions of JavaScript are used, and a transpiler rewrites the source code so that it is supported by older browsers. Usually, transpilers transpile down to ES3 to maintain compatibility with all versions of browsers. The settings to transpile to a specific version can be configured according to need. Transpiling adds an extra step to the build process and is sometimes done to avoid needing polyfills. Polyfills create new features for older environments that lack them. Polyfills do this at runtime in the interpreter, such as the user's browser or on the server. Instead, transpiling rewrites the ECMA code itself during the build phase of development before it reaches the interpreter.

Conformance
In 2010, Ecma International started developing a standards test for Ecma 262 ECMAScript.[20] Test262 is an ECMAScript conformance test suite that can be used to check how closely a JavaScript implementation follows the ECMAScript Specification. The test suite contains thousands of individual tests, each of which tests some specific requirement(s) of the ECMAScript specification. The development of Test262 is a project of the Ecma Technical Committee 39 (TC39). The testing framework and the individual tests are contributed to Ecma by member organizations of TC39.

Important contributions were made by Google (Sputnik test suite) and Microsoft, who both contributed thousands of tests. The Test262 test suite consisted of 38014 tests as of January 2020.[21] ECMAScript specifications through ES7 are well-supported in major web browsers. The table below shows the conformance rate for current versions of software with respect to the most recent editions of ECMAScript.