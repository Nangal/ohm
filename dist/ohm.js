(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ohm = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ohm = require('..');
module.exports = ohm.makeRecipe(["grammar",{"source":"BuiltInRules {\n\n  alnum  (an alpha-numeric character)\n    = letter\n    | digit\n\n  letter  (a letter)\n    = lower\n    | upper\n    | unicodeLtmo\n\n  digit  (a digit)\n    = \"0\"..\"9\"\n\n  hexDigit  (a hexadecimal digit)\n    = digit\n    | \"a\"..\"f\"\n    | \"A\"..\"F\"\n\n  ListOf<elem, sep>\n    = NonemptyListOf<elem, sep>\n    | EmptyListOf<elem, sep>\n\n  NonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  EmptyListOf<elem, sep>\n    = /* nothing */\n\n  listOf<elem, sep>\n    = nonemptyListOf<elem, sep>\n    | emptyListOf<elem, sep>\n\n  nonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  emptyListOf<elem, sep>\n    = /* nothing */\n\n}"},"BuiltInRules",null,null,{"alnum":["define",{"sourceInterval":[18,78]},"an alpha-numeric character",[],["alt",{"sourceInterval":[60,78]},["app",{"sourceInterval":[60,66]},"letter",[]],["app",{"sourceInterval":[73,78]},"digit",[]]]],"letter":["define",{"sourceInterval":[82,142]},"a letter",[],["alt",{"sourceInterval":[107,142]},["app",{"sourceInterval":[107,112]},"lower",[]],["app",{"sourceInterval":[119,124]},"upper",[]],["app",{"sourceInterval":[131,142]},"unicodeLtmo",[]]]],"digit":["define",{"sourceInterval":[146,177]},"a digit",[],["range",{"sourceInterval":[169,177]},"0","9"]],"hexDigit":["define",{"sourceInterval":[181,254]},"a hexadecimal digit",[],["alt",{"sourceInterval":[219,254]},["app",{"sourceInterval":[219,224]},"digit",[]],["range",{"sourceInterval":[231,239]},"a","f"],["range",{"sourceInterval":[246,254]},"A","F"]]],"ListOf":["define",{"sourceInterval":[258,336]},null,["elem","sep"],["alt",{"sourceInterval":[282,336]},["app",{"sourceInterval":[282,307]},"NonemptyListOf",[["param",{},0],["param",{},1]]],["app",{"sourceInterval":[314,336]},"EmptyListOf",[["param",{},0],["param",{},1]]]]],"NonemptyListOf":["define",{"sourceInterval":[340,388]},null,["elem","sep"],["seq",{"sourceInterval":[372,388]},["param",{},0],["star",{"sourceInterval":[377,388]},["seq",{"sourceInterval":[378,386]},["param",{},1],["param",{},0]]]]],"EmptyListOf":["define",{"sourceInterval":[392,434]},null,["elem","sep"],["seq",{"sourceInterval":[438,438]}]],"listOf":["define",{"sourceInterval":[438,516]},null,["elem","sep"],["alt",{"sourceInterval":[462,516]},["app",{"sourceInterval":[462,487]},"nonemptyListOf",[["param",{},0],["param",{},1]]],["app",{"sourceInterval":[494,516]},"emptyListOf",[["param",{},0],["param",{},1]]]]],"nonemptyListOf":["define",{"sourceInterval":[520,568]},null,["elem","sep"],["seq",{"sourceInterval":[552,568]},["param",{},0],["star",{"sourceInterval":[557,568]},["seq",{"sourceInterval":[558,566]},["param",{},1],["param",{},0]]]]],"emptyListOf":["define",{"sourceInterval":[572,614]},null,["elem","sep"],["seq",{"sourceInterval":[616,616]}]]}]);

},{"..":42}],2:[function(require,module,exports){
var ohm = require('..');
module.exports = ohm.makeRecipe(["grammar",{"source":"Ohm {\n\n  Grammars\n    = Grammar*\n\n  Grammar\n    = ident SuperGrammar? \"{\" Rule* \"}\"\n\n  SuperGrammar\n    = \"<:\" ident\n\n  Rule\n    = ident Formals? ruleDescr? \"=\"  RuleBody  -- define\n    | ident Formals?            \":=\" RuleBody  -- override\n    | ident Formals?            \"+=\" RuleBody  -- extend\n\n  RuleBody\n    = \"|\"? NonemptyListOf<TopLevelTerm, \"|\">\n\n  TopLevelTerm\n    = Seq caseName  -- inline\n    | Seq\n\n  Formals\n    = \"<\" ListOf<ident, \",\"> \">\"\n\n  Params\n    = \"<\" ListOf<Seq, \",\"> \">\"\n\n  Alt\n    = NonemptyListOf<Seq, \"|\">\n\n  Seq\n    = Iter*\n\n  Iter\n    = Pred \"*\"  -- star\n    | Pred \"+\"  -- plus\n    | Pred \"?\"  -- opt\n    | Pred\n\n  Pred\n    = \"~\" Lex  -- not\n    | \"&\" Lex  -- lookahead\n    | Lex\n\n  Lex\n    = \"#\" Base  -- lex\n    | Base\n\n  Base\n    = ident Params? ~(ruleDescr? \"=\" | \":=\" | \"+=\")  -- application\n    | terminal \"..\" terminal                         -- range\n    | terminal                                       -- terminal\n    | \"(\" Alt \")\"                                    -- paren\n\n  ruleDescr  (a rule description)\n    = \"(\" ruleDescrText \")\"\n\n  ruleDescrText\n    = (~\")\" any)*\n\n  caseName\n    = \"--\" (~\"\\n\" space)* name (~\"\\n\" space)* (\"\\n\" | &\"}\")\n\n  name  (a name)\n    = nameFirst nameRest*\n\n  nameFirst\n    = \"_\"\n    | letter\n\n  nameRest\n    = \"_\"\n    | alnum\n\n  ident  (an identifier)\n    = name\n\n  terminal\n    = \"\\\"\" terminalChar* \"\\\"\"\n\n  terminalChar\n    = escapeChar\n    | ~\"\\\\\" ~\"\\\"\" ~\"\\n\" any\n\n  escapeChar  (an escape sequence)\n    = \"\\\\\\\\\"                                     -- backslash\n    | \"\\\\\\\"\"                                     -- doubleQuote\n    | \"\\\\\\'\"                                     -- singleQuote\n    | \"\\\\b\"                                      -- backspace\n    | \"\\\\n\"                                      -- lineFeed\n    | \"\\\\r\"                                      -- carriageReturn\n    | \"\\\\t\"                                      -- tab\n    | \"\\\\u\" hexDigit hexDigit hexDigit hexDigit  -- unicodeEscape\n    | \"\\\\x\" hexDigit hexDigit                    -- hexEscape\n\n  space\n   += comment\n\n  comment\n    = \"//\" (~\"\\n\" any)* \"\\n\"  -- singleLine\n    | \"/*\" (~\"*/\" any)* \"*/\"  -- multiLine\n\n  tokens = token*\n\n  token = caseName | comment | ident | operator | punctuation | terminal | any\n\n  operator = \"<:\" | \"=\" | \":=\" | \"+=\" | \"*\" | \"+\" | \"?\" | \"~\" | \"&\"\n\n  punctuation = \"<\" | \">\" | \",\" | \"--\"\n}"},"Ohm",null,"Grammars",{"Grammars":["define",{"sourceInterval":[9,32]},null,[],["star",{"sourceInterval":[24,32]},["app",{"sourceInterval":[24,31]},"Grammar",[]]]],"Grammar":["define",{"sourceInterval":[36,83]},null,[],["seq",{"sourceInterval":[50,83]},["app",{"sourceInterval":[50,55]},"ident",[]],["opt",{"sourceInterval":[56,69]},["app",{"sourceInterval":[56,68]},"SuperGrammar",[]]],["terminal",{"sourceInterval":[70,73]},"{"],["star",{"sourceInterval":[74,79]},["app",{"sourceInterval":[74,78]},"Rule",[]]],["terminal",{"sourceInterval":[80,83]},"}"]]],"SuperGrammar":["define",{"sourceInterval":[87,116]},null,[],["seq",{"sourceInterval":[106,116]},["terminal",{"sourceInterval":[106,110]},"<:"],["app",{"sourceInterval":[111,116]},"ident",[]]]],"Rule_define":["define",{"sourceInterval":[131,181]},null,[],["seq",{"sourceInterval":[131,170]},["app",{"sourceInterval":[131,136]},"ident",[]],["opt",{"sourceInterval":[137,145]},["app",{"sourceInterval":[137,144]},"Formals",[]]],["opt",{"sourceInterval":[146,156]},["app",{"sourceInterval":[146,155]},"ruleDescr",[]]],["terminal",{"sourceInterval":[157,160]},"="],["app",{"sourceInterval":[162,170]},"RuleBody",[]]]],"Rule_override":["define",{"sourceInterval":[188,240]},null,[],["seq",{"sourceInterval":[188,227]},["app",{"sourceInterval":[188,193]},"ident",[]],["opt",{"sourceInterval":[194,202]},["app",{"sourceInterval":[194,201]},"Formals",[]]],["terminal",{"sourceInterval":[214,218]},":="],["app",{"sourceInterval":[219,227]},"RuleBody",[]]]],"Rule_extend":["define",{"sourceInterval":[247,297]},null,[],["seq",{"sourceInterval":[247,286]},["app",{"sourceInterval":[247,252]},"ident",[]],["opt",{"sourceInterval":[253,261]},["app",{"sourceInterval":[253,260]},"Formals",[]]],["terminal",{"sourceInterval":[273,277]},"+="],["app",{"sourceInterval":[278,286]},"RuleBody",[]]]],"Rule":["define",{"sourceInterval":[120,297]},null,[],["alt",{"sourceInterval":[131,297]},["app",{"sourceInterval":[131,170]},"Rule_define",[]],["app",{"sourceInterval":[188,227]},"Rule_override",[]],["app",{"sourceInterval":[247,286]},"Rule_extend",[]]]],"RuleBody":["define",{"sourceInterval":[301,354]},null,[],["seq",{"sourceInterval":[316,354]},["opt",{"sourceInterval":[316,320]},["terminal",{"sourceInterval":[316,319]},"|"]],["app",{"sourceInterval":[321,354]},"NonemptyListOf",[["app",{"sourceInterval":[336,348]},"TopLevelTerm",[]],["terminal",{"sourceInterval":[350,353]},"|"]]]]],"TopLevelTerm_inline":["define",{"sourceInterval":[377,400]},null,[],["seq",{"sourceInterval":[377,389]},["app",{"sourceInterval":[377,380]},"Seq",[]],["app",{"sourceInterval":[381,389]},"caseName",[]]]],"TopLevelTerm":["define",{"sourceInterval":[358,410]},null,[],["alt",{"sourceInterval":[377,410]},["app",{"sourceInterval":[377,389]},"TopLevelTerm_inline",[]],["app",{"sourceInterval":[407,410]},"Seq",[]]]],"Formals":["define",{"sourceInterval":[414,454]},null,[],["seq",{"sourceInterval":[428,454]},["terminal",{"sourceInterval":[428,431]},"<"],["app",{"sourceInterval":[432,450]},"ListOf",[["app",{"sourceInterval":[439,444]},"ident",[]],["terminal",{"sourceInterval":[446,449]},","]]],["terminal",{"sourceInterval":[451,454]},">"]]],"Params":["define",{"sourceInterval":[458,495]},null,[],["seq",{"sourceInterval":[471,495]},["terminal",{"sourceInterval":[471,474]},"<"],["app",{"sourceInterval":[475,491]},"ListOf",[["app",{"sourceInterval":[482,485]},"Seq",[]],["terminal",{"sourceInterval":[487,490]},","]]],["terminal",{"sourceInterval":[492,495]},">"]]],"Alt":["define",{"sourceInterval":[499,533]},null,[],["app",{"sourceInterval":[509,533]},"NonemptyListOf",[["app",{"sourceInterval":[524,527]},"Seq",[]],["terminal",{"sourceInterval":[529,532]},"|"]]]],"Seq":["define",{"sourceInterval":[537,552]},null,[],["star",{"sourceInterval":[547,552]},["app",{"sourceInterval":[547,551]},"Iter",[]]]],"Iter_star":["define",{"sourceInterval":[567,584]},null,[],["seq",{"sourceInterval":[567,575]},["app",{"sourceInterval":[567,571]},"Pred",[]],["terminal",{"sourceInterval":[572,575]},"*"]]],"Iter_plus":["define",{"sourceInterval":[591,608]},null,[],["seq",{"sourceInterval":[591,599]},["app",{"sourceInterval":[591,595]},"Pred",[]],["terminal",{"sourceInterval":[596,599]},"+"]]],"Iter_opt":["define",{"sourceInterval":[615,631]},null,[],["seq",{"sourceInterval":[615,623]},["app",{"sourceInterval":[615,619]},"Pred",[]],["terminal",{"sourceInterval":[620,623]},"?"]]],"Iter":["define",{"sourceInterval":[556,642]},null,[],["alt",{"sourceInterval":[567,642]},["app",{"sourceInterval":[567,575]},"Iter_star",[]],["app",{"sourceInterval":[591,599]},"Iter_plus",[]],["app",{"sourceInterval":[615,623]},"Iter_opt",[]],["app",{"sourceInterval":[638,642]},"Pred",[]]]],"Pred_not":["define",{"sourceInterval":[657,672]},null,[],["seq",{"sourceInterval":[657,664]},["terminal",{"sourceInterval":[657,660]},"~"],["app",{"sourceInterval":[661,664]},"Lex",[]]]],"Pred_lookahead":["define",{"sourceInterval":[679,700]},null,[],["seq",{"sourceInterval":[679,686]},["terminal",{"sourceInterval":[679,682]},"&"],["app",{"sourceInterval":[683,686]},"Lex",[]]]],"Pred":["define",{"sourceInterval":[646,710]},null,[],["alt",{"sourceInterval":[657,710]},["app",{"sourceInterval":[657,664]},"Pred_not",[]],["app",{"sourceInterval":[679,686]},"Pred_lookahead",[]],["app",{"sourceInterval":[707,710]},"Lex",[]]]],"Lex_lex":["define",{"sourceInterval":[724,740]},null,[],["seq",{"sourceInterval":[724,732]},["terminal",{"sourceInterval":[724,727]},"#"],["app",{"sourceInterval":[728,732]},"Base",[]]]],"Lex":["define",{"sourceInterval":[714,751]},null,[],["alt",{"sourceInterval":[724,751]},["app",{"sourceInterval":[724,732]},"Lex_lex",[]],["app",{"sourceInterval":[747,751]},"Base",[]]]],"Base_application":["define",{"sourceInterval":[766,827]},null,[],["seq",{"sourceInterval":[766,811]},["app",{"sourceInterval":[766,771]},"ident",[]],["opt",{"sourceInterval":[772,779]},["app",{"sourceInterval":[772,778]},"Params",[]]],["not",{"sourceInterval":[780,811]},["alt",{"sourceInterval":[782,810]},["seq",{"sourceInterval":[782,796]},["opt",{"sourceInterval":[782,792]},["app",{"sourceInterval":[782,791]},"ruleDescr",[]]],["terminal",{"sourceInterval":[793,796]},"="]],["terminal",{"sourceInterval":[799,803]},":="],["terminal",{"sourceInterval":[806,810]},"+="]]]]],"Base_range":["define",{"sourceInterval":[834,889]},null,[],["seq",{"sourceInterval":[834,856]},["app",{"sourceInterval":[834,842]},"terminal",[]],["terminal",{"sourceInterval":[843,847]},".."],["app",{"sourceInterval":[848,856]},"terminal",[]]]],"Base_terminal":["define",{"sourceInterval":[896,954]},null,[],["app",{"sourceInterval":[896,904]},"terminal",[]]],"Base_paren":["define",{"sourceInterval":[961,1016]},null,[],["seq",{"sourceInterval":[961,972]},["terminal",{"sourceInterval":[961,964]},"("],["app",{"sourceInterval":[965,968]},"Alt",[]],["terminal",{"sourceInterval":[969,972]},")"]]],"Base":["define",{"sourceInterval":[755,1016]},null,[],["alt",{"sourceInterval":[766,1016]},["app",{"sourceInterval":[766,811]},"Base_application",[]],["app",{"sourceInterval":[834,856]},"Base_range",[]],["app",{"sourceInterval":[896,904]},"Base_terminal",[]],["app",{"sourceInterval":[961,972]},"Base_paren",[]]]],"ruleDescr":["define",{"sourceInterval":[1020,1079]},"a rule description",[],["seq",{"sourceInterval":[1058,1079]},["terminal",{"sourceInterval":[1058,1061]},"("],["app",{"sourceInterval":[1062,1075]},"ruleDescrText",[]],["terminal",{"sourceInterval":[1076,1079]},")"]]],"ruleDescrText":["define",{"sourceInterval":[1083,1114]},null,[],["star",{"sourceInterval":[1103,1114]},["seq",{"sourceInterval":[1104,1112]},["not",{"sourceInterval":[1104,1108]},["terminal",{"sourceInterval":[1105,1108]},")"]],["app",{"sourceInterval":[1109,1112]},"any",[]]]]],"caseName":["define",{"sourceInterval":[1118,1186]},null,[],["seq",{"sourceInterval":[1133,1186]},["terminal",{"sourceInterval":[1133,1137]},"--"],["star",{"sourceInterval":[1138,1152]},["seq",{"sourceInterval":[1139,1150]},["not",{"sourceInterval":[1139,1144]},["terminal",{"sourceInterval":[1140,1144]},"\n"]],["app",{"sourceInterval":[1145,1150]},"space",[]]]],["app",{"sourceInterval":[1153,1157]},"name",[]],["star",{"sourceInterval":[1158,1172]},["seq",{"sourceInterval":[1159,1170]},["not",{"sourceInterval":[1159,1164]},["terminal",{"sourceInterval":[1160,1164]},"\n"]],["app",{"sourceInterval":[1165,1170]},"space",[]]]],["alt",{"sourceInterval":[1174,1185]},["terminal",{"sourceInterval":[1174,1178]},"\n"],["lookahead",{"sourceInterval":[1181,1185]},["terminal",{"sourceInterval":[1182,1185]},"}"]]]]],"name":["define",{"sourceInterval":[1190,1230]},"a name",[],["seq",{"sourceInterval":[1211,1230]},["app",{"sourceInterval":[1211,1220]},"nameFirst",[]],["star",{"sourceInterval":[1221,1230]},["app",{"sourceInterval":[1221,1229]},"nameRest",[]]]]],"nameFirst":["define",{"sourceInterval":[1234,1266]},null,[],["alt",{"sourceInterval":[1250,1266]},["terminal",{"sourceInterval":[1250,1253]},"_"],["app",{"sourceInterval":[1260,1266]},"letter",[]]]],"nameRest":["define",{"sourceInterval":[1270,1300]},null,[],["alt",{"sourceInterval":[1285,1300]},["terminal",{"sourceInterval":[1285,1288]},"_"],["app",{"sourceInterval":[1295,1300]},"alnum",[]]]],"ident":["define",{"sourceInterval":[1304,1337]},"an identifier",[],["app",{"sourceInterval":[1333,1337]},"name",[]]],"terminal":["define",{"sourceInterval":[1341,1379]},null,[],["seq",{"sourceInterval":[1356,1379]},["terminal",{"sourceInterval":[1356,1360]},"\""],["star",{"sourceInterval":[1361,1374]},["app",{"sourceInterval":[1361,1373]},"terminalChar",[]]],["terminal",{"sourceInterval":[1375,1379]},"\""]]],"terminalChar":["define",{"sourceInterval":[1383,1440]},null,[],["alt",{"sourceInterval":[1402,1440]},["app",{"sourceInterval":[1402,1412]},"escapeChar",[]],["seq",{"sourceInterval":[1419,1440]},["not",{"sourceInterval":[1419,1424]},["terminal",{"sourceInterval":[1420,1424]},"\\"]],["not",{"sourceInterval":[1425,1430]},["terminal",{"sourceInterval":[1426,1430]},"\""]],["not",{"sourceInterval":[1431,1436]},["terminal",{"sourceInterval":[1432,1436]},"\n"]],["app",{"sourceInterval":[1437,1440]},"any",[]]]]],"escapeChar_backslash":["define",{"sourceInterval":[1483,1538]},null,[],["terminal",{"sourceInterval":[1483,1489]},"\\\\"]],"escapeChar_doubleQuote":["define",{"sourceInterval":[1545,1602]},null,[],["terminal",{"sourceInterval":[1545,1551]},"\\\""]],"escapeChar_singleQuote":["define",{"sourceInterval":[1609,1666]},null,[],["terminal",{"sourceInterval":[1609,1615]},"\\'"]],"escapeChar_backspace":["define",{"sourceInterval":[1673,1728]},null,[],["terminal",{"sourceInterval":[1673,1678]},"\\b"]],"escapeChar_lineFeed":["define",{"sourceInterval":[1735,1789]},null,[],["terminal",{"sourceInterval":[1735,1740]},"\\n"]],"escapeChar_carriageReturn":["define",{"sourceInterval":[1796,1856]},null,[],["terminal",{"sourceInterval":[1796,1801]},"\\r"]],"escapeChar_tab":["define",{"sourceInterval":[1863,1912]},null,[],["terminal",{"sourceInterval":[1863,1868]},"\\t"]],"escapeChar_unicodeEscape":["define",{"sourceInterval":[1919,1978]},null,[],["seq",{"sourceInterval":[1919,1960]},["terminal",{"sourceInterval":[1919,1924]},"\\u"],["app",{"sourceInterval":[1925,1933]},"hexDigit",[]],["app",{"sourceInterval":[1934,1942]},"hexDigit",[]],["app",{"sourceInterval":[1943,1951]},"hexDigit",[]],["app",{"sourceInterval":[1952,1960]},"hexDigit",[]]]],"escapeChar_hexEscape":["define",{"sourceInterval":[1985,2040]},null,[],["seq",{"sourceInterval":[1985,2008]},["terminal",{"sourceInterval":[1985,1990]},"\\x"],["app",{"sourceInterval":[1991,1999]},"hexDigit",[]],["app",{"sourceInterval":[2000,2008]},"hexDigit",[]]]],"escapeChar":["define",{"sourceInterval":[1444,2040]},"an escape sequence",[],["alt",{"sourceInterval":[1483,2040]},["app",{"sourceInterval":[1483,1489]},"escapeChar_backslash",[]],["app",{"sourceInterval":[1545,1551]},"escapeChar_doubleQuote",[]],["app",{"sourceInterval":[1609,1615]},"escapeChar_singleQuote",[]],["app",{"sourceInterval":[1673,1678]},"escapeChar_backspace",[]],["app",{"sourceInterval":[1735,1740]},"escapeChar_lineFeed",[]],["app",{"sourceInterval":[1796,1801]},"escapeChar_carriageReturn",[]],["app",{"sourceInterval":[1863,1868]},"escapeChar_tab",[]],["app",{"sourceInterval":[1919,1960]},"escapeChar_unicodeEscape",[]],["app",{"sourceInterval":[1985,2008]},"escapeChar_hexEscape",[]]]],"space":["extend",{"sourceInterval":[2044,2063]},null,[],["app",{"sourceInterval":[2056,2063]},"comment",[]]],"comment_singleLine":["define",{"sourceInterval":[2081,2118]},null,[],["seq",{"sourceInterval":[2081,2103]},["terminal",{"sourceInterval":[2081,2085]},"//"],["star",{"sourceInterval":[2086,2098]},["seq",{"sourceInterval":[2087,2096]},["not",{"sourceInterval":[2087,2092]},["terminal",{"sourceInterval":[2088,2092]},"\n"]],["app",{"sourceInterval":[2093,2096]},"any",[]]]],["terminal",{"sourceInterval":[2099,2103]},"\n"]]],"comment_multiLine":["define",{"sourceInterval":[2125,2161]},null,[],["seq",{"sourceInterval":[2125,2147]},["terminal",{"sourceInterval":[2125,2129]},"/*"],["star",{"sourceInterval":[2130,2142]},["seq",{"sourceInterval":[2131,2140]},["not",{"sourceInterval":[2131,2136]},["terminal",{"sourceInterval":[2132,2136]},"*/"]],["app",{"sourceInterval":[2137,2140]},"any",[]]]],["terminal",{"sourceInterval":[2143,2147]},"*/"]]],"comment":["define",{"sourceInterval":[2067,2161]},null,[],["alt",{"sourceInterval":[2081,2161]},["app",{"sourceInterval":[2081,2103]},"comment_singleLine",[]],["app",{"sourceInterval":[2125,2147]},"comment_multiLine",[]]]],"tokens":["define",{"sourceInterval":[2165,2180]},null,[],["star",{"sourceInterval":[2174,2180]},["app",{"sourceInterval":[2174,2179]},"token",[]]]],"token":["define",{"sourceInterval":[2184,2260]},null,[],["alt",{"sourceInterval":[2192,2260]},["app",{"sourceInterval":[2192,2200]},"caseName",[]],["app",{"sourceInterval":[2203,2210]},"comment",[]],["app",{"sourceInterval":[2213,2218]},"ident",[]],["app",{"sourceInterval":[2221,2229]},"operator",[]],["app",{"sourceInterval":[2232,2243]},"punctuation",[]],["app",{"sourceInterval":[2246,2254]},"terminal",[]],["app",{"sourceInterval":[2257,2260]},"any",[]]]],"operator":["define",{"sourceInterval":[2264,2329]},null,[],["alt",{"sourceInterval":[2275,2329]},["terminal",{"sourceInterval":[2275,2279]},"<:"],["terminal",{"sourceInterval":[2282,2285]},"="],["terminal",{"sourceInterval":[2288,2292]},":="],["terminal",{"sourceInterval":[2295,2299]},"+="],["terminal",{"sourceInterval":[2302,2305]},"*"],["terminal",{"sourceInterval":[2308,2311]},"+"],["terminal",{"sourceInterval":[2314,2317]},"?"],["terminal",{"sourceInterval":[2320,2323]},"~"],["terminal",{"sourceInterval":[2326,2329]},"&"]]],"punctuation":["define",{"sourceInterval":[2333,2369]},null,[],["alt",{"sourceInterval":[2347,2369]},["terminal",{"sourceInterval":[2347,2350]},"<"],["terminal",{"sourceInterval":[2353,2356]},">"],["terminal",{"sourceInterval":[2359,2362]},","],["terminal",{"sourceInterval":[2365,2369]},"--"]]]}]);

},{"..":42}],3:[function(require,module,exports){
var ohm = require('..');
module.exports = ohm.makeRecipe(["grammar",{"source":"OperationsAndAttributes {\n\n  AttributeSignature =\n    name\n\n  OperationSignature =\n    name Formals?\n\n  Formals\n    = \"(\" ListOf<name, \",\"> \")\"\n\n  name  (a name)\n    = nameFirst nameRest*\n\n  nameFirst\n    = \"_\"\n    | letter\n\n  nameRest\n    = \"_\"\n    | alnum\n\n}"},"OperationsAndAttributes",null,"AttributeSignature",{"AttributeSignature":["define",{"sourceInterval":[29,58]},null,[],["app",{"sourceInterval":[54,58]},"name",[]]],"OperationSignature":["define",{"sourceInterval":[62,100]},null,[],["seq",{"sourceInterval":[87,100]},["app",{"sourceInterval":[87,91]},"name",[]],["opt",{"sourceInterval":[92,100]},["app",{"sourceInterval":[92,99]},"Formals",[]]]]],"Formals":["define",{"sourceInterval":[104,143]},null,[],["seq",{"sourceInterval":[118,143]},["terminal",{"sourceInterval":[118,121]},"("],["app",{"sourceInterval":[122,139]},"ListOf",[["app",{"sourceInterval":[129,133]},"name",[]],["terminal",{"sourceInterval":[135,138]},","]]],["terminal",{"sourceInterval":[140,143]},")"]]],"name":["define",{"sourceInterval":[147,187]},"a name",[],["seq",{"sourceInterval":[168,187]},["app",{"sourceInterval":[168,177]},"nameFirst",[]],["star",{"sourceInterval":[178,187]},["app",{"sourceInterval":[178,186]},"nameRest",[]]]]],"nameFirst":["define",{"sourceInterval":[191,223]},null,[],["alt",{"sourceInterval":[207,223]},["terminal",{"sourceInterval":[207,210]},"_"],["app",{"sourceInterval":[217,223]},"letter",[]]]],"nameRest":["define",{"sourceInterval":[227,257]},null,[],["alt",{"sourceInterval":[242,257]},["terminal",{"sourceInterval":[242,245]},"_"],["app",{"sourceInterval":[252,257]},"alnum",[]]]]}]);

},{"..":42}],4:[function(require,module,exports){
'use strict';

module.exports = {
  toAST: require('./semantics-toAST').helper,
  semanticsForToAST: require('./semantics-toAST').semantics
};

},{"./semantics-toAST":5}],5:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var pexprs = require('../src/pexprs');
var MatchResult = require('../src/MatchResult');
var Grammar = require('../src/Grammar');
var extend = require('util-extend');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

var defaultOperation = {
  _terminal: function() {
    return this.primitiveValue;
  },

  _nonterminal: function(children) {
    var ctorName = this._node.ctorName;
    var mapping = this.args.mapping;

    // without customization
    if (!mapping.hasOwnProperty(ctorName)) {
      // intermediate node
      if (this._node instanceof pexprs.Alt || this._node instanceof pexprs.Apply) {
        return children[0].toAST(mapping);
      }

      // lexical rule
      if (this.isLexical()) {
        return this.sourceString;
      }

      // singular node (e.g. only surrounded by literals or lookaheads)
      var realChildren = children.filter(function(child) {
        return !child.isTerminal();
      });
      if (realChildren.length === 1) {
        return realChildren[0].toAST(mapping);
      }

      // rest: terms with multiple children
    }

    // direct forward
    if (typeof mapping[ctorName] === 'number') {
      return children[mapping[ctorName]].toAST(mapping);
    }

    // named/mapped children or unnamed children ('0', '1', '2', ...)
    var propMap = mapping[ctorName] || children;
    var node = {
      type: ctorName
    };
    for (var prop in propMap) {
      var mappedProp = mapping[ctorName] && mapping[ctorName][prop];
      if (typeof mappedProp === 'number') {
        // direct forward
        node[prop] = children[mappedProp].toAST(mapping);
      } else if ((typeof mappedProp === 'string') || (typeof mappedProp === 'boolean') ||
          (mappedProp === null)) {
        // primitive value
        node[prop] = mappedProp;
      } else if ((typeof mappedProp === 'object') && (mappedProp instanceof Number)) {
        // primitive number (must be unboxed)
        node[prop] = Number(mappedProp);
      } else if (typeof mappedProp === 'function') {
        // computed value
        node[prop] = mappedProp.call(this, children);
      } else if (mappedProp === undefined) {
        if (children[prop] && !children[prop].isTerminal()) {
          node[prop] = children[prop].toAST(mapping);
        } else {
          // delete predefined 'type' properties, like 'type', if explicitely removed
          delete node[prop];
        }
      }
    }
    return node;
  },

  _iter: function(children) {
    if (this._node.isOptional()) {
      if (this.numChildren === 0) {
        return null;
      } else {
        return children[0].toAST(this.args.mapping);
      }
    }

    return children.map(function(child) {
      return child.toAST(this.args.mapping);
    }, this);
  },

  NonemptyListOf: function(first, sep, rest) {
    return [first.toAST(this.args.mapping)].concat(rest.toAST(this.args.mapping));
  },

  EmptyListOf: function() {
    return [];
  }
};

// Returns a plain JavaScript object that includes an abstract syntax tree (AST)
// for the given match result `res` containg a concrete syntax tree (CST) and grammar.
// The optional `mapping` parameter can be used to customize how the nodes of the CST
// are mapped to the AST (see /doc/extras.md#toastmatchresult-mapping).
function toAST(res, mapping) {
  if (!(res instanceof MatchResult) || res.failed()) {
    throw new Error('toAST() expects a succesfull MatchResult as first parameter');
  }

  mapping = extend({}, mapping);
  var operation = extend({}, defaultOperation);
  for (var termName in mapping) {
    if (typeof mapping[termName] === 'function') {
      operation[termName] = mapping[termName];
      delete mapping[termName];
    }
  }
  var g = res._cst.grammar;
  var s = g.createSemantics().addOperation('toAST(mapping)', operation);
  return s(res).toAST(mapping);
}

// Returns a semantics containg the toAST(mapping) operation for the given grammar g.
function semanticsForToAST(g) {
  if (!(g instanceof Grammar)) {
    throw new Error('semanticsToAST() expects a Grammar as parameter');
  }

  return g.createSemantics().addOperation('toAST(mapping)', defaultOperation);
}

module.exports = {
  helper: toAST,
  semantics: semanticsForToAST
};

},{"../src/Grammar":29,"../src/MatchResult":33,"../src/pexprs":61,"util-extend":26}],6:[function(require,module,exports){
'use strict';

var assign        = require('es5-ext/object/assign')
  , normalizeOpts = require('es5-ext/object/normalize-options')
  , isCallable    = require('es5-ext/object/is-callable')
  , contains      = require('es5-ext/string/#/contains')

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

},{"es5-ext/object/assign":7,"es5-ext/object/is-callable":10,"es5-ext/object/normalize-options":14,"es5-ext/string/#/contains":16}],7:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.assign
	: require('./shim');

},{"./is-implemented":8,"./shim":9}],8:[function(require,module,exports){
'use strict';

module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};

},{}],9:[function(require,module,exports){
'use strict';

var keys  = require('../keys')
  , value = require('../valid-value')

  , max = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, l = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try { dest[key] = src[key]; } catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

},{"../keys":11,"../valid-value":15}],10:[function(require,module,exports){
// Deprecated

'use strict';

module.exports = function (obj) { return typeof obj === 'function'; };

},{}],11:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.keys
	: require('./shim');

},{"./is-implemented":12,"./shim":13}],12:[function(require,module,exports){
'use strict';

module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) { return false; }
};

},{}],13:[function(require,module,exports){
'use strict';

var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};

},{}],14:[function(require,module,exports){
'use strict';

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

module.exports = function (options/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};

},{}],15:[function(require,module,exports){
'use strict';

module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};

},{}],16:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? String.prototype.contains
	: require('./shim');

},{"./is-implemented":17,"./shim":18}],17:[function(require,module,exports){
'use strict';

var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};

},{}],18:[function(require,module,exports){
'use strict';

var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

},{}],19:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')() ? Symbol : require('./polyfill');

},{"./is-implemented":20,"./polyfill":22}],20:[function(require,module,exports){
'use strict';

var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};

},{}],21:[function(require,module,exports){
'use strict';

module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};

},{}],22:[function(require,module,exports){
// ES2015 Symbol polyfill for environments that do not support it (or partially support it)

'use strict';

var d              = require('d')
  , validateSymbol = require('./validate-symbol')

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// If there's native implementation of given symbol, let's fallback to it
	// to ensure proper interoperability with other native functions e.g. Array.from
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));

},{"./validate-symbol":23,"d":6}],23:[function(require,module,exports){
'use strict';

var isSymbol = require('./is-symbol');

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};

},{"./is-symbol":21}],24:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],25:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],26:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = extend;
function extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || typeof add !== 'object') return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}

},{}],27:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var GrammarDecl = require('./GrammarDecl');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Builder() {}

Builder.prototype = {
  currentDecl: null,

  newGrammar: function(name) {
    return new GrammarDecl(name);
  },

  grammar: function(metaInfo, name, superGrammar, defaultStartRule, rules) {
    var gDecl = new GrammarDecl(name);
    if (superGrammar) {
      gDecl.withSuperGrammar(this.fromRecipe(superGrammar));
    }
    if (defaultStartRule) {
      gDecl.withDefaultStartRule(defaultStartRule);
    }
    if (metaInfo && metaInfo.source) {
      gDecl.withSource(metaInfo.source);
    }

    var self = this;
    this.currentDecl = gDecl;
    Object.keys(rules).forEach(function(ruleName) {
      var ruleRecipe = rules[ruleName];

      var action = ruleRecipe[0]; // define/extend/override
      var metaInfo = ruleRecipe[1];
      var description = ruleRecipe[2];
      var formals = ruleRecipe[3];
      var body = self.fromRecipe(ruleRecipe[4]);

      var source;
      if (gDecl.source && metaInfo && metaInfo.sourceInterval) {
        var inputStream = gDecl.source.inputStream;
        source = inputStream.interval.apply(inputStream, metaInfo.sourceInterval);
      }
      gDecl[action](ruleName, formals, body, description, source);
    });
    this.currentDecl = null;
    return gDecl.build();
  },

  terminal: function(x) {
    return new pexprs.Terminal(x);
  },

  range: function(from, to) {
    return new pexprs.Range(from, to);
  },

  param: function(index) {
    return new pexprs.Param(index);
  },

  alt: function(/* term1, term1, ... */) {
    var terms = [];
    for (var idx = 0; idx < arguments.length; idx++) {
      var arg = arguments[idx];
      if (!(arg instanceof pexprs.PExpr)) {
        arg = this.fromRecipe(arg);
      }
      if (arg instanceof pexprs.Alt) {
        terms = terms.concat(arg.terms);
      } else {
        terms.push(arg);
      }
    }
    return terms.length === 1 ? terms[0] : new pexprs.Alt(terms);
  },

  seq: function(/* factor1, factor2, ... */) {
    var factors = [];
    for (var idx = 0; idx < arguments.length; idx++) {
      var arg = arguments[idx];
      if (!(arg instanceof pexprs.PExpr)) {
        arg = this.fromRecipe(arg);
      }
      if (arg instanceof pexprs.Seq) {
        factors = factors.concat(arg.factors);
      } else {
        factors.push(arg);
      }
    }
    return factors.length === 1 ? factors[0] : new pexprs.Seq(factors);
  },

  star: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Star(expr);
  },

  plus: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Plus(expr);
  },

  opt: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Opt(expr);
  },

  not: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Not(expr);
  },

  la: function(expr) {
    // TODO: temporary to still be able to read old recipes
    return this.lookahead(expr);
  },

  lookahead: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Lookahead(expr);
  },

  lex: function(expr) {
    if (!(expr instanceof pexprs.PExpr)) {
      expr = this.fromRecipe(expr);
    }
    return new pexprs.Lex(expr);
  },

  app: function(ruleName, optParams) {
    if (optParams && optParams.length > 0) {
      optParams = optParams.map(function(param) {
        return param instanceof pexprs.PExpr ? param :
          this.fromRecipe(param);
      }, this);
    }
    return new pexprs.Apply(ruleName, optParams);
  },

  fromRecipe: function(recipe) {
    // the meta-info of 'grammar' is proccessed in Builder.grammar
    var result = this[recipe[0]].apply(this,
      recipe[0] === 'grammar' ? recipe.slice(1) : recipe.slice(2));

    var metaInfo = recipe[1];
    if (metaInfo) {
      if (metaInfo.sourceInterval && this.currentDecl) {
        result.withSource(
          this.currentDecl.sourceInterval.apply(this.currentDecl, metaInfo.sourceInterval)
        );
      }
    }
    return result;
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Builder;

},{"./GrammarDecl":30,"./pexprs":61}],28:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

/*
  `Failure`s represent expressions that weren't matched while parsing. They are used to generate
  error messages automatically. The interface of `Failure`s includes the collowing methods:

  - getText() : String
  - getType() : String  (one of {"description", "string", "code"})
  - isDescription() : bool
  - isStringTerminal() : bool
  - isCode() : bool
  - isFluffy() : bool
  - makeFluffy() : void
  - subsumes(Failure) : bool
*/

function isValidType(type) {
  return type === 'description' || type === 'string' || type === 'code';
}

function Failure(pexpr, text, type) {
  if (!isValidType(type)) {
    throw new Error('invalid Failure type: ' + type);
  }
  this.pexpr = pexpr;
  this.text = text;
  this.type = type;
  this.fluffy = false;
}

Failure.prototype.getPExpr = function() {
  return this.pexpr;
};

Failure.prototype.getText = function() {
  return this.text;
};

Failure.prototype.getType = function() {
  return this.type;
};

Failure.prototype.isDescription = function() {
  return this.type === 'description';
};

Failure.prototype.isStringTerminal = function() {
  return this.type === 'string';
};

Failure.prototype.isCode = function() {
  return this.type === 'code';
};

Failure.prototype.isFluffy = function() {
  return this.fluffy;
};

Failure.prototype.makeFluffy = function() {
  this.fluffy = true;
};

Failure.prototype.clearFluffy = function() {
  this.fluffy = false;
};

Failure.prototype.subsumes = function(that) {
  return this.getText() === that.getText() &&
      this.type === that.type &&
      (!this.isFluffy() || this.isFluffy() && that.isFluffy());
};

Failure.prototype.toString = function() {
  return this.type === 'string' ?
    JSON.stringify(this.getText()) :
    this.getText();
};

Failure.prototype.clone = function() {
  var failure = new Failure(this.pexpr, this.text, this.type);
  if (this.isFluffy()) {
    failure.makeFluffy();
  }
  return failure;
};

Failure.prototype.toKey = function() {
  return this.toString() + '#' + this.type;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Failure;

},{}],29:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var MatchResult = require('./MatchResult');
var Semantics = require('./Semantics');
var State = require('./State');
var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Grammar(
    name,
    superGrammar,
    rules,
    optDefaultStartRule) {
  this.name = name;
  this.superGrammar = superGrammar;
  this.rules = rules;
  if (optDefaultStartRule) {
    if (!(optDefaultStartRule in rules)) {
      throw new Error("Invalid start rule: '" + optDefaultStartRule +
                      "' is not a rule in grammar '" + name + "'");
    }
    this.defaultStartRule = optDefaultStartRule;
  }
}

var ohmGrammar;
var buildGrammar;

// This method is called from main.js once Ohm has loaded.
Grammar.initApplicationParser = function(grammar, builderFn) {
  ohmGrammar = grammar;
  buildGrammar = builderFn;
};

Grammar.prototype = {
  // Return true if the grammar is a built-in grammar, otherwise false.
  // NOTE: This might give an unexpected result if called before BuiltInRules is defined!
  isBuiltIn: function() {
    return this === Grammar.ProtoBuiltInRules || this === Grammar.BuiltInRules;
  },

  _match: function(input, opts) {
    var state = new State(this, input, opts);
    state.evalFromStart();
    return state;
  },

  match: function(input, optStartApplication) {
    var state = this._match(input, {startApplication: optStartApplication});
    return MatchResult.newFor(state);
  },

  trace: function(input, optStartApplication) {
    var state = this._match(input, {startApplication: optStartApplication, trace: true});

    // The trace node for the start rule is always the last entry. If it is a syntactic rule,
    // the first entry is for an application of 'spaces'.
    // TODO(pdubroy): Clean this up by introducing a special `Match<startAppl>` rule, which will
    // ensure that there is always a single root trace node.
    var rootTrace = state.trace[state.trace.length - 1];
    rootTrace.state = state;
    rootTrace.result = MatchResult.newFor(state);
    return rootTrace;
  },

  semantics: function() {
    // TODO: Remove this eventually! Deprecated in v0.12.
    throw new Error('semantics() is deprecated -- use createSemantics() instead.');
  },

  createSemantics: function() {
    return Semantics.createSemantics(this);
  },

  extendSemantics: function(superSemantics) {
    return Semantics.createSemantics(this, superSemantics._getSemantics());
  },

  // Check that every key in `actionDict` corresponds to a semantic action, and that it maps to
  // a function of the correct arity. If not, throw an exception.
  _checkTopDownActionDict: function(what, name, actionDict) {
    function isSpecialAction(a) {
      return a === '_iter' || a === '_terminal' || a === '_nonterminal' || a === '_default';
    }

    var problems = [];
    for (var k in actionDict) {
      var v = actionDict[k];
      if (!isSpecialAction(k) && !(k in this.rules)) {
        problems.push("'" + k + "' is not a valid semantic action for '" + this.name + "'");
      } else if (typeof v !== 'function') {
        problems.push(
            "'" + k + "' must be a function in an action dictionary for '" + this.name + "'");
      } else {
        var actual = v.length;
        var expected = this._topDownActionArity(k);
        if (actual !== expected) {
          problems.push(
              "Semantic action '" + k + "' has the wrong arity: " +
              'expected ' + expected + ', got ' + actual);
        }
      }
    }
    if (problems.length > 0) {
      var prettyProblems = problems.map(function(problem) { return '- ' + problem; });
      var error = new Error(
          "Found errors in the action dictionary of the '" + name + "' " + what + ':\n' +
          prettyProblems.join('\n'));
      error.problems = problems;
      throw error;
    }
  },

  // Return the expected arity for a semantic action named `actionName`, which
  // is either a rule name or a special action name like '_nonterminal'.
  _topDownActionArity: function(actionName) {
    if (actionName === '_iter' || actionName === '_nonterminal' || actionName === '_default') {
      return 1;
    } else if (actionName === '_terminal') {
      return 0;
    }
    return this.rules[actionName].body.getArity();
  },

  _inheritsFrom: function(grammar) {
    var g = this.superGrammar;
    while (g) {
      if (g === grammar) {
        return true;
      }
      g = g.superGrammar;
    }
    return false;
  },

  toRecipe: function(optVarName) {
    var metaInfo = {};
    // Include the grammar source if it is available.
    if (this.source) {
      metaInfo.source = this.source.contents;
    }

    var superGrammar = null;
    if (this.superGrammar && !this.superGrammar.isBuiltIn()) {
      superGrammar = JSON.parse(this.superGrammar.toRecipe());
    }

    var startRule = null;
    if (this.defaultStartRule) {
      startRule = this.defaultStartRule;
    }

    var rules = {};
    var self = this;
    Object.keys(this.rules).forEach(function(ruleName) {
      var ruleInfo = self.rules[ruleName];
      var body = ruleInfo.body;
      var isDefinition = !self.superGrammar || !self.superGrammar.rules[ruleName];

      var operation;
      if (isDefinition) {
        operation = 'define';
      } else {
        operation = body instanceof pexprs.Extend ? 'extend' : 'override';
      }

      var metaInfo = {};
      if (ruleInfo.source && self.source) {
        var adjusted = ruleInfo.source.relativeTo(self.source);
        metaInfo.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
      }

      var description = isDefinition ? ruleInfo.description : null;
      var bodyRecipe = body.outputRecipe(ruleInfo.formals, self.source);

      rules[ruleName] = [
        operation, // "define"/"extend"/"override"
        metaInfo,
        description,
        ruleInfo.formals,
        bodyRecipe
      ];
    });

    return JSON.stringify([
      'grammar',
      metaInfo,
      this.name,
      superGrammar,
      startRule,
      rules
    ]);
  },

  // TODO: Come up with better names for these methods.
  // TODO: Write the analog of these methods for inherited attributes.
  toOperationActionDictionaryTemplate: function() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  },
  toAttributeActionDictionaryTemplate: function() {
    return this._toOperationOrAttributeActionDictionaryTemplate();
  },

  _toOperationOrAttributeActionDictionaryTemplate: function() {
    // TODO: add the super-grammar's templates at the right place, e.g., a case for AddExpr_plus
    // should appear next to other cases of AddExpr.

    var sb = new common.StringBuffer();
    sb.append('{');

    var first = true;
    for (var ruleName in this.rules) {
      var body = this.rules[ruleName].body;
      if (first) {
        first = false;
      } else {
        sb.append(',');
      }
      sb.append('\n');
      sb.append('  ');
      this.addSemanticActionTemplate(ruleName, body, sb);
    }

    sb.append('\n}');
    return sb.contents();
  },

  addSemanticActionTemplate: function(ruleName, body, sb) {
    sb.append(ruleName);
    sb.append(': function(');
    var arity = this._topDownActionArity(ruleName);
    sb.append(common.repeat('_', arity).join(', '));
    sb.append(') {\n');
    sb.append('  }');
  },

  // Parse a string which expresses a rule application in this grammar, and return the
  // resulting Apply node.
  parseApplication: function(str) {
    var app;
    if (str.indexOf('<') === -1) {
      // simple application
      app = new pexprs.Apply(str);
    } else {
      // parameterized application
      var cst = ohmGrammar.match(str, 'Base_application');
      app = buildGrammar(cst, {});
    }

    // Ensure that the application is valid.
    if (!(app.ruleName in this.rules)) {
      throw errors.undeclaredRule(app.ruleName, this.name);
    }
    var formals = this.rules[app.ruleName].formals;
    if (formals.length !== app.args.length) {
      var source = this.rules[app.ruleName].source;
      throw errors.wrongNumberOfParameters(app.ruleName, formals.length, app.args.length, source);
    }
    return app;
  }
};

// The following grammar contains a few rules that couldn't be written  in "userland".
// At the bottom of src/main.js, we create a sub-grammar of this grammar that's called
// `BuiltInRules`. That grammar contains several convenience rules, e.g., `letter` and
// `digit`, and is implicitly the super-grammar of any grammar whose super-grammar
// isn't specified.
Grammar.ProtoBuiltInRules = new Grammar(
  'ProtoBuiltInRules',  // name
  undefined,  // supergrammar
  {
    // The following rules can't be written in userland because they reference
    // `any` and `end` directly.
    any: {body: pexprs.any, formals: [], description: 'any object'},
    end: {body: pexprs.end, formals: [], description: 'end of input'},

    // The following rule is invoked implicitly by syntactic rules to skip spaces.
    spaces: {
      body: new pexprs.Star(new pexprs.Apply('space')),
      formals: []
    },

    // The `space` rule must be defined here because it's referenced by `spaces`.
    space: {
      body: new pexprs.Range('\x00', ' '),
      formals: [],
      description: 'a space'
    },

    // These rules are implemented natively because they use UnicodeChar directly, which is
    // not part of the Ohm grammar.
    lower: {
      body: new pexprs.UnicodeChar('Ll'),
      formals: [],
      description: 'a lowercase letter'
    },
    upper: {
      body: new pexprs.UnicodeChar('Lu'),
      formals: [],
      description: 'an uppercase letter'
    },

    // The union of Lt (titlecase), Lm (modifier), and Lo (other), i.e. any letter not
    // in Ll or Lu.
    unicodeLtmo: {
      body: new pexprs.UnicodeChar('Ltmo'),
      formals: []
    }
  }
);

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Grammar;

},{"./MatchResult":33,"./Semantics":36,"./State":37,"./common":40,"./errors":41,"./pexprs":61}],30:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Grammar = require('./Grammar');
var InputStream = require('./InputStream');
var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private Stuff
// --------------------------------------------------------------------

// Constructors

function GrammarDecl(name) {
  this.name = name;
}

// Helpers

GrammarDecl.prototype.sourceInterval = function(startIdx, endIdx) {
  var inputStream = this.source.inputStream;
  return inputStream.interval(startIdx, endIdx);
};

GrammarDecl.prototype.ensureSuperGrammar = function() {
  if (!this.superGrammar) {
    this.withSuperGrammar(
        // TODO: The conditional expression below is an ugly hack. It's kind of ok because
        // I doubt anyone will ever try to declare a grammar called `BuiltInRules`. Still,
        // we should try to find a better way to do this.
        this.name === 'BuiltInRules' ?
            Grammar.ProtoBuiltInRules :
            Grammar.BuiltInRules);
  }
  return this.superGrammar;
};

GrammarDecl.prototype.installOverriddenOrExtendedRule = function(name, formals, body, source) {
  var duplicateParameterNames = common.getDuplicates(formals);
  if (duplicateParameterNames.length > 0) {
    throw errors.duplicateParameterNames(name, duplicateParameterNames, body, source);
  }
  var ruleInfo = this.ensureSuperGrammar().rules[name];
  var expectedFormals = ruleInfo.formals;
  var expectedNumFormals = expectedFormals ? expectedFormals.length : 0;
  if (formals.length !== expectedNumFormals) {
    throw errors.wrongNumberOfParameters(name, expectedNumFormals, formals.length, body, source);
  }
  return this.install(name, formals, body, ruleInfo.description, source);
};

GrammarDecl.prototype.install = function(name, formals, body, description, source) {
  this.rules[name] = {
    body: body.introduceParams(formals),
    formals: formals,
    description: description,
    source: source
  };
  return this;
};

// Stuff that you should only do once

GrammarDecl.prototype.withSuperGrammar = function(superGrammar) {
  if (this.superGrammar) {
    throw new Error('the super grammar of a GrammarDecl cannot be set more than once');
  }
  this.superGrammar = superGrammar;
  this.rules = Object.create(superGrammar.rules);

  // Grammars with an explicit supergrammar inherit a default start rule.
  if (!superGrammar.isBuiltIn()) {
    this.defaultStartRule = superGrammar.defaultStartRule;
  }
  return this;
};

GrammarDecl.prototype.withDefaultStartRule = function(ruleName) {
  this.defaultStartRule = ruleName;
  return this;
};

GrammarDecl.prototype.withSource = function(source) {
  this.source = new InputStream(source).interval(0, source.length);
  return this;
};

// Creates a Grammar instance, and if it passes the sanity checks, returns it.
GrammarDecl.prototype.build = function() {
  var grammar = new Grammar(
      this.name,
      this.ensureSuperGrammar(),
      this.rules,
      this.defaultStartRule);

  // TODO: change the pexpr.prototype.assert... methods to make them add
  // exceptions to an array that's provided as an arg. Then we'll be able to
  // show more than one error of the same type at a time.
  // TODO: include the offending pexpr in the errors, that way we can show
  // the part of the source that caused it.
  var grammarErrors = [];
  var grammarHasInvalidApplications = false;
  Object.keys(grammar.rules).forEach(function(ruleName) {
    var body = grammar.rules[ruleName].body;
    try {
      body.assertChoicesHaveUniformArity(ruleName);
    } catch (e) {
      grammarErrors.push(e);
    }
    try {
      body.assertAllApplicationsAreValid(ruleName, grammar);
    } catch (e) {
      grammarErrors.push(e);
      grammarHasInvalidApplications = true;
    }
  });
  if (!grammarHasInvalidApplications) {
    // The following check can only be done if the grammar has no invalid applications.
    Object.keys(grammar.rules).forEach(function(ruleName) {
      var body = grammar.rules[ruleName].body;
      try {
        body.assertIteratedExprsAreNotNullable(grammar, ruleName);
      } catch (e) {
        grammarErrors.push(e);
      }
    });
  }
  if (grammarErrors.length > 0) {
    errors.throwErrors(grammarErrors);
  }
  if (this.source) {
    grammar.source = this.source;
  }

  return grammar;
};

// Rule declarations

GrammarDecl.prototype.define = function(name, formals, body, description, source) {
  this.ensureSuperGrammar();
  if (this.superGrammar.rules[name]) {
    throw errors.duplicateRuleDeclaration(name, this.name, this.superGrammar.name, body, source);
  } else if (this.rules[name]) {
    throw errors.duplicateRuleDeclaration(name, this.name, this.name, body, source);
  }
  var duplicateParameterNames = common.getDuplicates(formals);
  if (duplicateParameterNames.length > 0) {
    throw errors.duplicateParameterNames(name, duplicateParameterNames, body, source);
  }
  return this.install(name, formals, body, description, source);
};

GrammarDecl.prototype.override = function(name, formals, body, descIgnored, source) {
  var ruleInfo = this.ensureSuperGrammar().rules[name];
  if (!ruleInfo) {
    throw errors.cannotOverrideUndeclaredRule(name, this.superGrammar.name, body, source);
  }
  this.installOverriddenOrExtendedRule(name, formals, body, source);
  return this;
};

GrammarDecl.prototype.extend = function(name, formals, fragment, descIgnored, source) {
  var ruleInfo = this.ensureSuperGrammar().rules[name];
  if (!ruleInfo) {
    throw errors.cannotExtendUndeclaredRule(name, this.superGrammar.name, fragment, source);
  }
  var body = new pexprs.Extend(this.superGrammar, name, fragment);
  body.source = fragment.source;
  this.installOverriddenOrExtendedRule(name, formals, body, source);
  return this;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = GrammarDecl;

},{"./Grammar":29,"./InputStream":31,"./common":40,"./errors":41,"./pexprs":61}],31:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Interval = require('./Interval');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function InputStream(source) {
  this.source = source;
  this.pos = 0;
  this.posInfos = [];
}

InputStream.prototype = {
  atEnd: function() {
    return this.pos === this.source.length;
  },

  next: function() {
    return this.source[this.pos++];
  },

  matchString: function(s) {
    for (var idx = 0; idx < s.length; idx++) {
      if (this.next() !== s[idx]) {
        return false;
      }
    }
    return true;
  },

  sourceSlice: function(startIdx, endIdx) {
    return this.source.slice(startIdx, endIdx);
  },

  interval: function(startIdx, optEndIdx) {
    return new Interval(this, startIdx, optEndIdx ? optEndIdx : this.pos);
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = InputStream;

},{"./Interval":32}],32:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var assert = require('./common').assert;
var errors = require('./errors');
var util = require('./util');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Interval(inputStream, startIdx, endIdx) {
  this.inputStream = inputStream;
  this.startIdx = startIdx;
  this.endIdx = endIdx;
}

Interval.coverage = function(/* interval1, interval2, ... */) {
  var inputStream = arguments[0].inputStream;
  var startIdx = arguments[0].startIdx;
  var endIdx = arguments[0].endIdx;
  for (var idx = 1; idx < arguments.length; idx++) {
    var interval = arguments[idx];
    if (interval.inputStream !== inputStream) {
      throw errors.intervalSourcesDontMatch();
    } else {
      startIdx = Math.min(startIdx, arguments[idx].startIdx);
      endIdx = Math.max(endIdx, arguments[idx].endIdx);
    }
  }
  return new Interval(inputStream, startIdx, endIdx);
};

Interval.prototype = {
  coverageWith: function(/* interval1, interval2, ... */) {
    var intervals = Array.prototype.slice.call(arguments);
    intervals.push(this);
    return Interval.coverage.apply(undefined, intervals);
  },

  collapsedLeft: function() {
    return new Interval(this.inputStream, this.startIdx, this.startIdx);
  },

  collapsedRight: function() {
    return new Interval(this.inputStream, this.endIdx, this.endIdx);
  },

  getLineAndColumnMessage: function() {
    var range = [this.startIdx, this.endIdx];
    return util.getLineAndColumnMessage(this.inputStream.source, this.startIdx, range);
  },

  // Returns an array of 0, 1, or 2 intervals that represents the result of the
  // interval difference operation.
  minus: function(that) {
    if (this.inputStream !== that.inputStream) {
      throw errors.intervalSourcesDontMatch();
    } else if (this.startIdx === that.startIdx && this.endIdx === that.endIdx) {
      // `this` and `that` are the same interval!
      return [
      ];
    } else if (this.startIdx < that.startIdx && that.endIdx < this.endIdx) {
      // `that` splits `this` into two intervals
      return [
        new Interval(this.inputStream, this.startIdx, that.startIdx),
        new Interval(this.inputStream, that.endIdx, this.endIdx)
      ];
    } else if (this.startIdx < that.endIdx && that.endIdx < this.endIdx) {
      // `that` contains a prefix of `this`
      return [
        new Interval(this.inputStream, that.endIdx, this.endIdx)
      ];
    } else if (this.startIdx < that.startIdx && that.startIdx < this.endIdx) {
      // `that` contains a suffix of `this`
      return [
        new Interval(this.inputStream, this.startIdx, that.startIdx)
      ];
    } else {
      // `that` and `this` do not overlap
      return [
        this
      ];
    }
  },

  // Returns a new Interval that has the same extent as this one, but which is relative
  // to `that`, an Interval that fully covers this one.
  relativeTo: function(that, newInputStream) {
    if (this.inputStream !== that.inputStream) {
      throw errors.intervalSourcesDontMatch();
    }
    assert(this.startIdx >= that.startIdx && this.endIdx <= that.endIdx,
           'other interval does not cover this one');
    return new Interval(newInputStream,
                        this.startIdx - that.startIdx,
                        this.endIdx - that.startIdx);
  },

  // Returns a new Interval which contains the same contents as this one,
  // but with whitespace trimmed from both ends. (This only makes sense when
  // the input stream is a string.)
  trimmed: function() {
    var contents = this.contents;
    var startIdx = this.startIdx + contents.match(/^\s*/)[0].length;
    var endIdx = this.endIdx - contents.match(/\s*$/)[0].length;
    return new Interval(this.inputStream, startIdx, endIdx);
  }
};

Object.defineProperties(Interval.prototype, {
  contents: {
    get: function() {
      if (this._contents === undefined) {
        this._contents = this.inputStream.sourceSlice(this.startIdx, this.endIdx);
      }
      return this._contents;
    },
    enumerable: true
  },
  length: {
    get: function() { return this.endIdx - this.startIdx; },
    enumerable: true
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Interval;


},{"./common":40,"./errors":41,"./util":62}],33:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var inherits = require('inherits');

var common = require('./common');
var nodes = require('./nodes');
var util = require('./util');
var Interval = require('./Interval');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Create a short error message for an error that occurred during matching.
function getShortMatchErrorMessage(pos, source, detail) {
  var errorInfo = util.getLineAndColumn(source, pos);
  return 'Line ' + errorInfo.lineNum + ', col ' + errorInfo.colNum + ': ' + detail;
}

// ----------------- MatchFailure -----------------

function MatchResult(state) {
  this.state = state;
  this._cst = state.bindings[0];
}

MatchResult.newFor = function(state) {
  var succeeded = state.bindings.length > 0;
  return succeeded ? new MatchResult(state) : new MatchFailure(state);
};

MatchResult.prototype.failed = function() {
  return false;
};

MatchResult.prototype.succeeded = function() {
  return !this.failed();
};

// Returns a `MatchResult` that can be fed into operations or attributes that care
// about the whitespace that was implicitly skipped over by syntactic rules. This
// is useful for doing things with comments, e.g., syntax highlighting.
MatchResult.prototype.getDiscardedSpaces = function() {
  if (this.failed()) {
    return [];
  }

  var state = this.state;
  var grammar = state.grammar;
  var inputStream = state.inputStream;

  var intervals = [new Interval(inputStream, 0, inputStream.source.length)];

  // Subtract the interval of each terminal from the set of intervals above.
  var s = grammar.createSemantics().addOperation('subtractTerminals', {
    _nonterminal: function(children) {
      children.forEach(function(child) {
        child.subtractTerminals();
      });
    },
    _terminal: function() {
      var t = this;
      intervals = intervals
          .map(function(interval) { return interval.minus(t.interval); })
          .reduce(function(xs, ys) { return xs.concat(ys); }, []);
    }
  });
  s(this).subtractTerminals();

  // Now `intervals` holds the intervals of the input stream that were skipped over by syntactic
  // rules, because they contained spaces.

  // Next, we want to match the contents of each of those intervals with the grammar's `spaces`
  // rule, to reconstruct the CST nodes that were discarded by syntactic rules. But if we simply
  // pass each interval's `contents` to the grammar's `match` method, the resulting nodes and
  // their children will have intervals that are associated with a different input, i.e., a
  // substring of the original input. The following operation will fix this problem for us.
  s.addOperation('fixIntervals(idxOffset)', {
    _default: function(children) {
      var idxOffset = this.args.idxOffset;
      this.interval.inputStream = inputStream;
      this.interval.startIdx += idxOffset;
      this.interval.endIdx += idxOffset;
      if (!this.isTerminal()) {
        children.forEach(function(child) {
          child.fixIntervals(idxOffset);
        });
      }
    }
  });

  // Now we're finally ready to reconstruct the discarded CST nodes.
  var discardedNodes = intervals.map(function(interval) {
    var r = grammar.match(interval.contents, 'spaces');
    s(r).fixIntervals(interval.startIdx);
    return r._cst;
  });

  // Rather than return a bunch of CST nodes and make the caller of this method loop over them,
  // we can construct a single CST node that is the parent of all of the discarded nodes. An
  // `IterationNode` is the obvious choice for this.
  discardedNodes = new nodes.IterationNode(
      grammar,
      discardedNodes,
      discardedNodes.length === 0 ?
          new Interval(inputStream, 0, 0) :
          new Interval(
              inputStream,
              discardedNodes[0].interval.startIdx,
              discardedNodes[discardedNodes.length - 1].interval.endIdx));

  // But remember that a CST node can't be used directly by clients. What we really need to return
  // from this method is a successful `MatchResult` that can be used with the clients' semantics.
  // We already have one -- `this` -- but it's got a different CST node inside. So we create a new
  // object that delegates to `this`, and override its `_cst` property.
  var r = Object.create(this);
  r._cst = discardedNodes;

  // We also override its `getDiscardedSpaces` method, in case someone decides to call it.
  r.getDiscardedSpaces = function() { return r; };

  return r;
};

// ----------------- MatchFailure -----------------

function MatchFailure(state) {
  this.state = state;
  common.defineLazyProperty(this, '_failures', function() {
    return this.state.getFailures();
  });
  common.defineLazyProperty(this, 'message', function() {
    var source = this.state.inputStream.source;
    if (typeof source !== 'string') {
      return 'match failed at position ' + this.getRightmostFailurePosition();
    }

    var detail = 'Expected ' + this.getExpectedText();
    return util.getLineAndColumnMessage(source, this.getRightmostFailurePosition()) + detail;
  });
  common.defineLazyProperty(this, 'shortMessage', function() {
    if (typeof this.state.inputStream.source !== 'string') {
      return 'match failed at position ' + this.getRightmostFailurePosition();
    }
    var detail = 'expected ' + this.getExpectedText();
    return getShortMatchErrorMessage(
        this.getRightmostFailurePosition(),
        this.state.inputStream.source,
        detail);
  });
}
inherits(MatchFailure, MatchResult);

MatchFailure.prototype.toString = function() {
  return '[MatchFailure at position ' + this.getRightmostFailurePosition() + ']';
};

MatchFailure.prototype.failed = function() {
  return true;
};

MatchFailure.prototype.getRightmostFailurePosition = function() {
  return this.state.getRightmostFailurePosition();
};

MatchFailure.prototype.getRightmostFailures = function() {
  return this._failures;
};

// Return a string summarizing the expected contents of the input stream when
// the match failure occurred.
MatchFailure.prototype.getExpectedText = function() {
  var sb = new common.StringBuffer();
  var failures = this.getRightmostFailures();

  // Filter out the fluffy failures to make the default error messages more useful
  failures = failures.filter(function(failure) {
    return !failure.isFluffy();
  });

  for (var idx = 0; idx < failures.length; idx++) {
    if (idx > 0) {
      if (idx === failures.length - 1) {
        sb.append((failures.length > 2 ? ', or ' : ' or '));
      } else {
        sb.append(', ');
      }
    }
    sb.append(failures[idx].toString());
  }
  return sb.contents();
};

MatchFailure.prototype.getInterval = function() {
  var pos = this.state.getRightmostFailurePosition();
  return new Interval(this.state.inputStream, pos, pos);
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = MatchResult;

},{"./Interval":32,"./common":40,"./nodes":43,"./util":62,"inherits":24}],34:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var extend = require('util-extend');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Namespace() {
}
Namespace.prototype = Object.create(null);

Namespace.asNamespace = function(objOrNamespace) {
  if (objOrNamespace instanceof Namespace) {
    return objOrNamespace;
  }
  return Namespace.createNamespace(objOrNamespace);
};

// Create a new namespace. If `optProps` is specified, all of its properties
// will be copied to the new namespace.
Namespace.createNamespace = function(optProps) {
  return Namespace.extend(Namespace.prototype, optProps);
};

// Create a new namespace which extends another namespace. If `optProps` is
// specified, all of its properties will be copied to the new namespace.
Namespace.extend = function(namespace, optProps) {
  if (namespace !== Namespace.prototype && !(namespace instanceof Namespace)) {
    throw new TypeError('not a Namespace object: ' + namespace);
  }
  var ns = Object.create(namespace, {
    constructor: {
      value: Namespace,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  return extend(ns, optProps);
};

// TODO: Should this be a regular method?
Namespace.toString = function(ns) {
  return Object.prototype.toString.call(ns);
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Namespace;

},{"util-extend":26}],35:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function PosInfo(state) {
  this.state = state;
  this.applicationMemoKeyStack = [];  // a stack of "memo keys" of the active applications
  this.memo = {};
  this.currentLeftRecursion = undefined;
}

PosInfo.prototype = {
  isActive: function(application) {
    return this.applicationMemoKeyStack.indexOf(application.toMemoKey()) >= 0;
  },

  enter: function(application) {
    this.state.enter(application);
    this.applicationMemoKeyStack.push(application.toMemoKey());
  },

  exit: function() {
    this.state.exit();
    this.applicationMemoKeyStack.pop();
  },

  startLeftRecursion: function(headApplication, memoRec) {
    memoRec.isLeftRecursion = true;
    memoRec.headApplication = headApplication;
    memoRec.nextLeftRecursion = this.currentLeftRecursion;
    this.currentLeftRecursion = memoRec;

    var applicationMemoKeyStack = this.applicationMemoKeyStack;
    var indexOfFirstInvolvedRule = applicationMemoKeyStack.indexOf(headApplication.toMemoKey()) + 1;
    var involvedApplicationMemoKeys = applicationMemoKeyStack.slice(indexOfFirstInvolvedRule);

    memoRec.isInvolved = function(applicationMemoKey) {
      return involvedApplicationMemoKeys.indexOf(applicationMemoKey) >= 0;
    };

    memoRec.updateInvolvedApplicationMemoKeys = function() {
      for (var idx = indexOfFirstInvolvedRule; idx < applicationMemoKeyStack.length; idx++) {
        var applicationMemoKey = applicationMemoKeyStack[idx];
        if (!this.isInvolved(applicationMemoKey)) {
          involvedApplicationMemoKeys.push(applicationMemoKey);
        }
      }
    };
  },

  endLeftRecursion: function() {
    this.currentLeftRecursion = this.currentLeftRecursion.nextLeftRecursion;
  },

  // Note: this method doesn't get called for the "head" of a left recursion -- for LR heads,
  // the memoized result (which starts out being a failure) is always used.
  shouldUseMemoizedResult: function(memoRec) {
    if (!memoRec.isLeftRecursion) {
      return true;
    }
    var applicationMemoKeyStack = this.applicationMemoKeyStack;
    for (var idx = 0; idx < applicationMemoKeyStack.length; idx++) {
      var applicationMemoKey = applicationMemoKeyStack[idx];
      if (memoRec.isInvolved(applicationMemoKey)) {
        return false;
      }
    }
    return true;
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = PosInfo;

},{}],36:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Symbol = require('es6-symbol');  // eslint-disable-line no-undef
var inherits = require('inherits');

var MatchResult = require('./MatchResult');
var IterationNode = require('./nodes').IterationNode;
var common = require('./common');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// ----------------- Wrappers -----------------

// Wrappers decorate CST nodes with all of the functionality (i.e., operations and attributes)
// provided by a Semantics (see below). `Wrapper` is the abstract superclass of all wrappers. A
// `Wrapper` must have `_node` and `_semantics` instance variables, which refer to the CST node and
// Semantics (resp.) for which it was created, and a `_childWrappers` instance variable which is
// used to cache the wrapper instances that are created for its child nodes. Setting these instance
// variables is the responsibility of the constructor of each Semantics-specific subclass of
// `Wrapper`.
function Wrapper() {}

Wrapper.prototype.toString = function() {
  return '[semantics wrapper for ' + this._node.grammar.name + ']';
};

Wrapper.prototype._forgetMemoizedResultFor = function(attributeName) {
  // Remove the memoized attribute from the cstNode and all its children.
  delete this._node[this._semantics.attributeKeys[attributeName]];
  this.children.forEach(function(child) {
    child._forgetMemoizedResultFor(attributeName);
  });
};

// Returns the wrapper of the specified child node. Child wrappers are created lazily and cached in
// the parent wrapper's `_childWrappers` instance variable.
Wrapper.prototype.child = function(idx) {
  if (!(0 <= idx && idx < this._node.numChildren())) {
    // TODO: Consider throwing an exception here.
    return undefined;
  }
  var childWrapper = this._childWrappers[idx];
  if (!childWrapper) {
    childWrapper = this._childWrappers[idx] = this._semantics.wrap(this._node.childAt(idx));
  }
  return childWrapper;
};

// Returns an array containing the wrappers of all of the children of the node associated with this
// wrapper.
Wrapper.prototype._children = function() {
  // Force the creation of all child wrappers
  for (var idx = 0; idx < this._node.numChildren(); idx++) {
    this.child(idx);
  }
  return this._childWrappers;
};

// Returns `true` if the CST node associated with this wrapper corresponds to an iteration
// expression, i.e., a Kleene-*, Kleene-+, or an optional. Returns `false` otherwise.
Wrapper.prototype.isIteration = function() {
  return this._node.isIteration();
};

// Returns `true` if the CST node associated with this wrapper is a terminal node, `false`
// otherwise.
Wrapper.prototype.isTerminal = function() {
  return this._node.isTerminal();
};

// Returns `true` if the CST node associated with this wrapper is a nonterminal node, `false`
// otherwise.
Wrapper.prototype.isNonterminal = function() {
  return this._node.isNonterminal();
};

// Returns `true` if the CST node associated with this wrapper is a nonterminal node
// corresponding to a syntactic rule, `false` otherwise.
Wrapper.prototype.isSyntactic = function() {
  return this.isNonterminal() && this._node.isSyntactic();
};

// Returns `true` if the CST node associated with this wrapper is a nonterminal node
// corresponding to a lexical rule, `false` otherwise.
Wrapper.prototype.isLexical = function() {
  return this.isNonterminal() && this._node.isLexical();
};

// Returns `true` if the CST node associated with this wrapper is an iterator node
// having either one or no child (? operator), `false` otherwise.
// Otherwise, throws an exception.
Wrapper.prototype.isOptional = function() {
  return this._node.isOptional();
};

// Create a new IterationNode in the same semantics as this wrapper.
Wrapper.prototype.iteration = function(optElements) {
  var iter = new IterationNode(this._node.grammar, optElements || [], this.source, false);
  return this._semantics.wrap(iter);
};

Object.defineProperties(Wrapper.prototype, {
  // Returns an array containing the children of this CST node.
  children: {get: function() { return this._children(); }},

  // Returns the name of grammar rule that created this CST node.
  ctorName: {get: function() { return this._node.ctorName; }},

  // TODO: Remove this eventually (deprecated in v0.12).
  interval: {get: function() {
    throw new Error('The `interval` property is deprecated -- use `source` instead');
  }},

  // Returns the interval consumed by the CST node associated with this wrapper.
  source: {get: function() { return this._node.source; }},

  // Returns the number of children of this CST node.
  numChildren: {get: function() { return this._node.numChildren(); }},

  // Returns the primitive value of this CST node, if it's a terminal node. Otherwise,
  // throws an exception.
  primitiveValue: {
    get: function() {
      if (this.isTerminal()) {
        return this._node.primitiveValue;
      }
      throw new TypeError(
          "tried to access the 'primitiveValue' attribute of a non-terminal CST node");
    }
  },

  // Returns the contents of the input stream consumed by this CST node.
  sourceString: {get: function() { return this.source.contents; }}
});

// ----------------- Semantics -----------------

// A Semantics is a container for a family of Operations and Attributes for a given grammar.
// Semantics enable modularity (different clients of a grammar can create their set of operations
// and attributes in isolation) and extensibility even when operations and attributes are mutually-
// recursive. This constructor should not be called directly except from
// `Semantics.createSemantics`. The normal ways to create a Semantics, given a grammar 'g', are
// `g.createSemantics()` and `g.extendSemantics(parentSemantics)`.
function Semantics(grammar, superSemantics) {
  var self = this;
  this.grammar = grammar;
  this.checkedActionDicts = false;

  // Constructor for wrapper instances, which are passed as the arguments to the semantic actions
  // of an operation or attribute. Operations and attributes require double dispatch: the semantic
  // action is chosen based on both the node's type and the semantics. Wrappers ensure that
  // the `execute` method is called with the correct (most specific) semantics object as an
  // argument.
  this.Wrapper = function(node) {
    self.checkActionDictsIfHaventAlready();
    this._semantics = self;
    this._node = node;
    this._childWrappers = [];
  };

  this.super = superSemantics;
  if (superSemantics) {
    if (grammar !== this.super.grammar && !grammar._inheritsFrom(this.super.grammar)) {
      throw new Error(
          "Cannot extend a semantics for grammar '" + this.super.grammar.name +
          "' for use with grammar '" + grammar.name + "' (not a sub-grammar)");
    }
    inherits(this.Wrapper, this.super.Wrapper);
    this.operations = Object.create(this.super.operations);
    this.attributes = Object.create(this.super.attributes);
    this.attributeKeys = Object.create(null);

    // Assign unique symbols for each of the attributes inherited from the super-semantics so that
    // they are memoized independently.
    for (var attributeName in this.attributes) {
      this.attributeKeys[attributeName] = Symbol();
    }
  } else {
    inherits(this.Wrapper, Wrapper);
    this.operations = Object.create(null);
    this.attributes = Object.create(null);
    this.attributeKeys = Object.create(null);
  }
}

Semantics.prototype.toString = function() {
  return '[semantics for ' + this.grammar.name + ']';
};

Semantics.prototype.checkActionDictsIfHaventAlready = function() {
  if (!this.checkedActionDicts) {
    this.checkActionDicts();
    this.checkedActionDicts = true;
  }
};

// Checks that the action dictionaries for all operations and attributes in this semantics,
// including the ones that were inherited from the super-semantics, agree with the grammar.
// Throws an exception if one or more of them doesn't.
Semantics.prototype.checkActionDicts = function() {
  var name;
  for (name in this.operations) {
    this.operations[name].checkActionDict(this.grammar);
  }
  for (name in this.attributes) {
    this.attributes[name].checkActionDict(this.grammar);
  }
};

Semantics.prototype.toRecipe = function(semanticsOnly) {
  function hasSuperSemantics(s) {
    return s.super !== Semantics.BuiltInSemantics._getSemantics();
  }

  var str = '(function(g) {\n';
  if (hasSuperSemantics(this)) {
    str += '  var semantics = ' + this.super.toRecipe(true) + '(g';

    var superSemanticsGrammar = this.super.grammar;
    var relatedGrammar = this.grammar;
    while (relatedGrammar !== superSemanticsGrammar) {
      str += '.superGrammar';
      relatedGrammar = relatedGrammar.superGrammar;
    }

    str += ');\n';
    str += '  return g.extendSemantics(semantics)';
  } else {
    str += '  return g.createSemantics()';
  }
  ['Operation', 'Attribute'].forEach(function(type) {
    var semanticOperations = this[type.toLowerCase() + 's'];
    Object.keys(semanticOperations).forEach(function(name) {
      var signature = name;
      if (semanticOperations[name].formals.length > 0) {
        signature += '(' + semanticOperations[name].formals.join(', ') + ')';
      }

      var method;
      if (hasSuperSemantics(this) && this.super[type.toLowerCase() + 's'][name]) {
        method = 'extend' + type;
      } else {
        method = 'add' + type;
      }
      str += '\n    .' + method + '(' + JSON.stringify(signature) + ', {';

      var actions = semanticOperations[name].actionDict;
      var srcArray = [];
      Object.keys(actions).forEach(function(actionName) {
        if (semanticOperations[name].builtInDefault !== actions[actionName]) {
          srcArray.push('\n      ' + JSON.stringify(actionName) + ': ' +
            actions[actionName].toString());
        }
      });
      str += srcArray.join(',');

      str += '\n    })';
    }, this);
  }, this);
  str += ';\n  })';

  if (!semanticsOnly) {
    str =
      '(function() {\n' +
      '  var grammar = this.fromRecipe(' + this.grammar.toRecipe() + ');\n' +
      '  var semantics = ' + str + '(grammar);\n' +
      '  return semantics;\n' +
      '});\n';
  }

  return str;
};

var prototypeGrammar;
var prototypeGrammarSemantics;

// This method is called from main.js once Ohm has loaded.
Semantics.initPrototypeParser = function(grammar) {
  prototypeGrammarSemantics = grammar.createSemantics().addOperation('parse', {
    AttributeSignature: function(name) {
      return {
        name: name.parse(),
        formals: []
      };
    },
    OperationSignature: function(name, optFormals) {
      return {
        name: name.parse(),
        formals: optFormals.parse()[0] || []
      };
    },
    Formals: function(oparen, fs, cparen) {
      return fs.asIteration().parse();
    },
    name: function(first, rest) {
      return this.sourceString;
    }
  });
  prototypeGrammar = grammar;
};

function parseSignature(signature, type) {
  if (!prototypeGrammar) {
    // The Operations and Attributes grammar won't be available while Ohm is loading,
    // but we can get away the following simplification b/c none of the operations
    // that are used while loading take arguments.
    common.assert(signature.indexOf('(') === -1);
    return {
      name: signature,
      formals: []
    };
  }

  var r = prototypeGrammar.match(
      signature,
      type === 'operation' ? 'OperationSignature' : 'AttributeSignature');
  if (r.failed()) {
    throw new Error(r.message);
  }

  return prototypeGrammarSemantics(r).parse();
}

function newDefaultAction(type, name, doIt) {
  return function(children) {
    var self = this;
    var thisThing = this._semantics.operations[name] || this._semantics.attributes[name];
    var args = thisThing.formals.map(function(formal) {
      return self.args[formal];
    });

    if (this.isIteration()) {
      // This CST node corresponds to an iteration expression in the grammar (*, +, or ?). The
      // default behavior is to map this operation or attribute over all of its child nodes.
      return children.map(function(child) { return doIt.apply(child, args); });
    }

    // This CST node corresponds to a non-terminal in the grammar (e.g., AddExpr). The fact that
    // we got here means that this action dictionary doesn't have an action for this particular
    // non-terminal or a generic `_nonterminal` action.
    if (children.length === 1) {
      // As a convenience, if this node only has one child, we just return the result of
      // applying this operation / attribute to the child node.
      return doIt.apply(children[0], args);
    } else {
      // Otherwise, we throw an exception to let the programmer know that we don't know what
      // to do with this node.
      throw new Error(
          'Missing semantic action for ' + this.ctorName + ' in ' + name + ' ' + type);
    }
  };
}

Semantics.prototype.addOperationOrAttribute = function(type, signature, actionDict) {
  var typePlural = type + 's';

  var parsedNameAndFormalArgs = parseSignature(signature, type);
  var name = parsedNameAndFormalArgs.name;
  var formals = parsedNameAndFormalArgs.formals;

  // TODO: check that there are no duplicate formal arguments

  this.assertNewName(name, type);

  // Create the action dictionary for this operation / attribute that contains a `_default` action
  // which defines the default behavior of iteration, terminal, and non-terminal nodes...
  var builtInDefault = newDefaultAction(type, name, doIt);
  var realActionDict = {_default: builtInDefault};
  // ... and add in the actions supplied by the programmer, which may override some or all of the
  // default ones.
  Object.keys(actionDict).forEach(function(name) {
    realActionDict[name] = actionDict[name];
  });

  var entry = type === 'operation' ?
      new Operation(name, formals, realActionDict, builtInDefault) :
      new Attribute(name, realActionDict, builtInDefault);

  // The following check is not strictly necessary (it will happen later anyway) but it's better to
  // catch errors early.
  entry.checkActionDict(this.grammar);

  this[typePlural][name] = entry;

  function doIt() {
    // Dispatch to most specific version of this operation / attribute -- it may have been
    // overridden by a sub-semantics.
    var thisThing = this._semantics[typePlural][name];

    // Check that the caller passed the correct number of arguments.
    if (arguments.length !== thisThing.formals.length) {
      throw new Error(
          'Invalid number of arguments passed to ' + name + ' ' + type + ' (expected ' +
          thisThing.formals.length + ', got ' + arguments.length + ')');
    }

    // Create an "arguments object" from the arguments that were passed to this
    // operation / attribute.
    var args = Object.create(null);
    for (var idx = 0; idx < arguments.length; idx++) {
      var formal = thisThing.formals[idx];
      args[formal] = arguments[idx];
    }

    var oldArgs = this.args;
    this.args = args;
    var ans = thisThing.execute(this._semantics, this);
    this.args = oldArgs;
    return ans;
  }

  if (type === 'operation') {
    this.Wrapper.prototype[name] = doIt;
    this.Wrapper.prototype[name].toString = function() {
      return '[' + name + ' operation]';
    };
  } else {
    Object.defineProperty(this.Wrapper.prototype, name, {
      get: doIt,
      configurable: true  // So the property can be deleted.
    });
    this.attributeKeys[name] = Symbol();
  }
};

Semantics.prototype.extendOperationOrAttribute = function(type, name, actionDict) {
  var typePlural = type + 's';

  // Make sure that `name` really is just a name, i.e., that it doesn't also contain formals.
  parseSignature(name, 'attribute');

  if (!(this.super && name in this.super[typePlural])) {
    throw new Error('Cannot extend ' + type + " '" + name +
        "': did not inherit an " + type + ' with that name');
  }
  if (Object.prototype.hasOwnProperty.call(this[typePlural], name)) {
    throw new Error('Cannot extend ' + type + " '" + name + "' again");
  }

  // Create a new operation / attribute whose actionDict delegates to the super operation /
  // attribute's actionDict, and which has all the keys from `inheritedActionDict`.
  var inheritedFormals = this[typePlural][name].formals;
  var inheritedActionDict = this[typePlural][name].actionDict;
  var newActionDict = Object.create(inheritedActionDict);
  Object.keys(actionDict).forEach(function(name) {
    newActionDict[name] = actionDict[name];
  });

  this[typePlural][name] = type === 'operation' ?
      new Operation(name, inheritedFormals, newActionDict) :
      new Attribute(name, newActionDict);

  // The following check is not strictly necessary (it will happen later anyway) but it's better to
  // catch errors early.
  this[typePlural][name].checkActionDict(this.grammar);
};

Semantics.prototype.assertNewName = function(name, type) {
  if (Wrapper.prototype.hasOwnProperty(name)) {
    throw new Error(
        'Cannot add ' + type + " '" + name + "': that's a reserved name");
  }
  if (name in this.operations) {
    throw new Error(
        'Cannot add ' + type + " '" + name + "': an operation with that name already exists");
  }
  if (name in this.attributes) {
    throw new Error(
        'Cannot add ' + type + " '" + name + "': an attribute with that name already exists");
  }
};

// Returns a wrapper for the given CST `node` in this semantics.
// If `node` is already a wrapper, returns `node` itself.  // TODO: why is this needed?
Semantics.prototype.wrap = function(node) {
  return node instanceof this.Wrapper ? node : new this.Wrapper(node);
};

// Creates a new Semantics instance for `grammar`, inheriting operations and attributes from
// `optSuperSemantics`, if it is specified. Returns a function that acts as a proxy for the new
// Semantics instance. When that function is invoked with a CST node as an argument, it returns
// a wrapper for that node which gives access to the operations and attributes provided by this
// semantics.
Semantics.createSemantics = function(grammar, optSuperSemantics) {
  var s = new Semantics(
      grammar,
      optSuperSemantics !== undefined ?
          optSuperSemantics :
          Semantics.BuiltInSemantics._getSemantics());

  // To enable clients to invoke a semantics like a function, return a function that acts as a proxy
  // for `s`, which is the real `Semantics` instance.
  var proxy = function ASemantics(matchResult) {
    if (!(matchResult instanceof MatchResult)) {
      throw new TypeError(
          'Semantics expected a MatchResult, but got ' + common.unexpectedObjToString(matchResult));
    }
    if (!matchResult.succeeded()) {
      throw new TypeError(
          'cannot apply Semantics to ' + matchResult.toString());
    }

    var cst = matchResult._cst;
    if (cst.grammar !== grammar) {
      throw new Error(
          "Cannot use a MatchResult from grammar '" + cst.grammar.name +
          "' with a semantics for '" + grammar.name + "'");
    }
    return s.wrap(cst);
  };

  // Forward public methods from the proxy to the semantics instance.
  proxy.addOperation = function(signature, actionDict) {
    s.addOperationOrAttribute('operation', signature, actionDict);
    return proxy;
  };
  proxy.extendOperation = function(name, actionDict) {
    s.extendOperationOrAttribute('operation', name, actionDict);
    return proxy;
  };
  proxy.addAttribute = function(name, actionDict) {
    s.addOperationOrAttribute('attribute', name, actionDict);
    return proxy;
  };
  proxy.extendAttribute = function(name, actionDict) {
    s.extendOperationOrAttribute('attribute', name, actionDict);
    return proxy;
  };
  proxy._getActionDict = function(operationOrAttributeName) {
    var action = s.operations[operationOrAttributeName] || s.attributes[operationOrAttributeName];
    if (!action) {
      throw new Error('"' + operationOrAttributeName + '" is not a valid operation or attribute ' +
        'name in this semantics for "' + grammar.name + '"');
    }
    return action.actionDict;
  };
  proxy._remove = function(operationOrAttributeName) {
    var semantic;
    if (operationOrAttributeName in s.operations) {
      semantic = s.operations[operationOrAttributeName];
      delete s.operations[operationOrAttributeName];
    } else if (operationOrAttributeName in s.attributes) {
      semantic = s.attributes[operationOrAttributeName];
      delete s.attributes[operationOrAttributeName];
    }
    delete s.Wrapper.prototype[operationOrAttributeName];
    return semantic;
  };
  proxy.getOperationNames = function() {
    return Object.keys(s.operations);
  };
  proxy.getAttributeNames = function() {
    return Object.keys(s.attributes);
  };
  proxy.getGrammar = function() {
    return s.grammar;
  };
  proxy.toRecipe = function(semanticsOnly) {
    return s.toRecipe(semanticsOnly);
  };

  // Make the proxy's toString() work.
  proxy.toString = s.toString.bind(s);

  // Returns the semantics for the proxy.
  proxy._getSemantics = function() {
    return s;
  };

  return proxy;
};

Semantics.initBuiltInSemantics = function(builtInRules) {
  var actions = {
    empty: function() {
      return this.iteration();
    },
    nonEmpty: function(first, _, rest) {
      return this.iteration([first].concat(rest.children));
    }
  };

  Semantics.BuiltInSemantics = Semantics
      .createSemantics(builtInRules, null)
      .addOperation('asIteration', {
        emptyListOf: actions.empty,
        nonemptyListOf: actions.nonEmpty,
        EmptyListOf: actions.empty,
        NonemptyListOf: actions.nonEmpty
      });
};

// ----------------- Operation -----------------

// An Operation represents a function to be applied to a concrete syntax tree (CST) -- it's very
// similar to a Visitor (http://en.wikipedia.org/wiki/Visitor_pattern). An operation is executed by
// recursively walking the CST, and at each node, invoking the matching semantic action from
// `actionDict`. See `Operation.prototype.execute` for details of how a CST node's matching semantic
// action is found.
function Operation(name, formals, actionDict, builtInDefault) {
  this.name = name;
  this.formals = formals;
  this.actionDict = actionDict;
  this.builtInDefault = builtInDefault;
}

Operation.prototype.typeName = 'operation';

Operation.prototype.checkActionDict = function(grammar) {
  grammar._checkTopDownActionDict(this.typeName, this.name, this.actionDict);
};

// Execute this operation on the CST node associated with `nodeWrapper` in the context of the given
// Semantics instance.
Operation.prototype.execute = function(semantics, nodeWrapper) {
  // Look for a semantic action whose name matches the node's constructor name, which is either the
  // name of a rule in the grammar, or '_terminal' (for a terminal node), or '_iter' (for an
  // iteration node). In the latter case, the action function receives a single argument, which is
  // an array containing all of the children of the CST node.
  var actionFn = this.actionDict[nodeWrapper._node.ctorName];
  if (actionFn) {
    return this.doAction(semantics, nodeWrapper, actionFn, nodeWrapper.isIteration());
  }

  // The action dictionary does not contain a semantic action for this specific type of node.
  // If this is a nonterminal node and the programmer has provided a `_nonterminal` semantic
  // action, we invoke it:
  if (nodeWrapper.isNonterminal()) {
    actionFn = this.actionDict._nonterminal;
    if (actionFn) {
      return this.doAction(semantics, nodeWrapper, actionFn, true);
    }
  }

  // Otherwise, we invoke the '_default' semantic action.
  return this.doAction(semantics, nodeWrapper, this.actionDict._default, true);
};

// Invoke `actionFn` on the CST node that corresponds to `nodeWrapper`, in the context of
// `semantics`. If `optPassChildrenAsArray` is truthy, `actionFn` will be called with a single
// argument, which is an array of wrappers. Otherwise, the number of arguments to `actionFn` will
// be equal to the number of children in the CST node.
Operation.prototype.doAction = function(semantics, nodeWrapper, actionFn, optPassChildrenAsArray) {
  return optPassChildrenAsArray ?
      actionFn.call(nodeWrapper, nodeWrapper._children()) :
      actionFn.apply(nodeWrapper, nodeWrapper._children());
};

// ----------------- Attribute -----------------

// Attributes are Operations whose results are memoized. This means that, for any given semantics,
// the semantic action for a CST node will be invoked no more than once.
function Attribute(name, actionDict, builtInDefault) {
  this.name = name;
  this.formals = [];
  this.actionDict = actionDict;
  this.builtInDefault = builtInDefault;
}
inherits(Attribute, Operation);

Attribute.prototype.typeName = 'attribute';

Attribute.prototype.execute = function(semantics, nodeWrapper) {
  var node = nodeWrapper._node;
  var key = semantics.attributeKeys[this.name];
  if (!node.hasOwnProperty(key)) {
    // The following is a super-send -- isn't JS beautiful? :/
    node[key] = Operation.prototype.execute.call(this, semantics, nodeWrapper);
  }
  return node[key];
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Semantics;

},{"./MatchResult":33,"./common":40,"./nodes":43,"es6-symbol":19,"inherits":24}],37:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var InputStream = require('./InputStream');
var PosInfo = require('./PosInfo');
var Trace = require('./Trace');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

var RM_RIGHTMOST_FAILURE_POSITION = 0;
var RM_RIGHTMOST_FAILURES = 1;

var applySpaces = new pexprs.Apply('spaces');

function State(grammar, input, opts) {
  this.grammar = grammar;
  this.startExpr = this._getStartExpr(grammar, opts.startApplication);
  this.inputStream = new InputStream(input);
  this.tracingEnabled = opts.trace || false;
  this.init(RM_RIGHTMOST_FAILURE_POSITION);
}

State.prototype = {
  init: function(recordingMode) {
    this.posInfos = [];
    this.bindings = [];
    this.applicationStack = [];
    this.inLexifiedContextStack = [false];

    this.recordingMode = recordingMode;
    if (recordingMode === RM_RIGHTMOST_FAILURE_POSITION) {
      this.rightmostFailurePosition = -1;
    } else if (recordingMode === RM_RIGHTMOST_FAILURES) {
      // We always run in *rightmost failure position* recording mode before running in
      // *rightmost failures* recording mode. And since the traces generated by each of
      // these passes would be identical, there's no need to record it now if we have
      // already recorded it in the first pass.
      this.tracingEnabled = false;
    } else {
      throw new Error('invalid recording mode: ' + recordingMode);
    }

    if (this.isTracing()) {
      this.trace = [];
    }
  },

  enter: function(app) {
    this.applicationStack.push(app);
    this.inLexifiedContextStack.push(false);
  },

  exit: function() {
    this.applicationStack.pop();
    this.inLexifiedContextStack.pop();
  },

  enterLexifiedContext: function() {
    this.inLexifiedContextStack.push(true);
  },

  exitLexifiedContext: function() {
    this.inLexifiedContextStack.pop();
  },

  currentApplication: function() {
    return this.applicationStack[this.applicationStack.length - 1];
  },

  inSyntacticContext: function() {
    if (typeof this.inputStream.source !== 'string') {
      return false;
    }
    var currentApplication = this.currentApplication();
    if (currentApplication) {
      return currentApplication.isSyntactic() && !this.inLexifiedContext();
    } else {
      // The top-level context is syntactic if the start application is.
      return this.startExpr.factors[0].isSyntactic();
    }
  },

  inLexifiedContext: function() {
    return this.inLexifiedContextStack[this.inLexifiedContextStack.length - 1];
  },

  skipSpaces: function() {
    var origFailuresInfo = this.getFailuresInfo();
    this.eval(applySpaces);
    this.bindings.pop();
    this.restoreFailuresInfo(origFailuresInfo);
    return this.inputStream.pos;
  },

  skipSpacesIfInSyntacticContext: function() {
    return this.inSyntacticContext() ?
        this.skipSpaces() :
        this.inputStream.pos;
  },

  maybeSkipSpacesBefore: function(expr) {
    if (expr instanceof pexprs.Apply && expr.isSyntactic()) {
      return this.skipSpaces();
    } else if (expr.allowsSkippingPrecedingSpace() && expr !== applySpaces) {
      return this.skipSpacesIfInSyntacticContext();
    } else {
      return this.inputStream.pos;
    }
  },

  truncateBindings: function(newLength) {
    // Yes, this is this really faster than setting the `length` property (tested with
    // bin/es5bench on Node v6.1.0).
    while (this.bindings.length > newLength) {
      this.bindings.pop();
    }
  },

  getCurrentPosInfo: function() {
    return this.getPosInfo(this.inputStream.pos);
  },

  getPosInfo: function(pos) {
    var posInfo = this.posInfos[pos];
    if (!posInfo) {
      posInfo = this.posInfos[pos] = new PosInfo(this);
    }
    return posInfo;
  },

  processFailure: function(pos, expr) {
    if (this.recordingMode === RM_RIGHTMOST_FAILURE_POSITION) {
      if (pos > this.rightmostFailurePosition) {
        this.rightmostFailurePosition = pos;
      }
    } else /* if (this.recordingMode === RM_RIGHTMOST_FAILURES) */
        if (pos === this.rightmostFailurePosition) {
          // We're only interested in failures at the rightmost failure position that haven't
          // already been recorded.

          var app = this.currentApplication();
          if (app) {
            // Substitute parameters with the actual pexprs that were passed to
            // the current rule.
            expr = expr.substituteParams(app.args);
          } else {
            // This branch is only reached for the "end-check" that is
            // performed after the top-level application. In that case,
            // expr === pexprs.end so there is no need to substitute
            // parameters.
          }

          this.addRightmostFailure(expr.toFailure(this.grammar), false);
        }
  },

  ensureRightmostFailures: function() {
    if (!this.rightmostFailures) {
      this.rightmostFailures = Object.create(null);
    }
  },

  addRightmostFailure: function(failure, shouldCloneIfNew) {
    this.ensureRightmostFailures();
    var key = failure.toKey();
    if (!this.rightmostFailures[key]) {
      this.rightmostFailures[key] = shouldCloneIfNew ? failure.clone() : failure;
    } else if (this.rightmostFailures[key].isFluffy() && !failure.isFluffy()) {
      this.rightmostFailures[key].clearFluffy();
    }
  },

  addRightmostFailures: function(failures, shouldCloneIfNew) {
    var self = this;
    Object.keys(failures).forEach(function(key) {
      self.addRightmostFailure(failures[key], shouldCloneIfNew);
    });
  },

  cloneRightmostFailures: function() {
    if (!this.rightmostFailures) {
      return undefined;
    }

    var ans = Object.create(null);
    var self = this;
    Object.keys(this.rightmostFailures).forEach(function(key) {
      ans[key] = self.rightmostFailures[key].clone();
    });
    return ans;
  },

  getRightmostFailurePosition: function() {
    return this.rightmostFailurePosition;
  },

  getFailures: function() {
    if (this.recordingMode === RM_RIGHTMOST_FAILURE_POSITION) {
      // Rewind, then try to match the input again, recording failures.
      this.init(RM_RIGHTMOST_FAILURES);
      this.evalFromStart();
    }

    this.ensureRightmostFailures();
    var self = this;
    return Object.keys(this.rightmostFailures).map(function(key) {
      return self.rightmostFailures[key];
    });
  },

  // Returns the memoized trace entry for `expr` at `pos`, if one exists, `null` otherwise.
  getMemoizedTraceEntry: function(pos, expr) {
    var posInfo = this.posInfos[pos];
    if (posInfo && expr.ruleName) {
      var memoRec = posInfo.memo[expr.toMemoKey()];
      if (memoRec && memoRec.traceEntry) {
        var entry = memoRec.traceEntry.cloneWithExpr(expr);
        entry.isMemoized = true;
        return entry;
      }
    }
    return null;
  },

  // Returns a new trace entry, with the currently active trace array as its children.
  getTraceEntry: function(pos, expr, succeeded, bindings) {
    return this.getMemoizedTraceEntry(pos, expr) ||
           new Trace(this.inputStream, pos, expr, succeeded, bindings, this.trace);
  },

  isTracing: function() {
    return this.tracingEnabled;
  },

  useMemoizedResult: function(memoRec) {
    if (this.isTracing()) {
      this.trace.push(memoRec.traceEntry);
    }

    if (this.recordingMode === RM_RIGHTMOST_FAILURES && memoRec.failuresAtRightmostPosition) {
      this.addRightmostFailures(memoRec.failuresAtRightmostPosition, true);
    }

    if (memoRec.value) {
      this.inputStream.pos = memoRec.pos;
      this.bindings.push(memoRec.value);
      return true;
    }
    return false;
  },

  // Evaluate `expr` and return `true` if it succeeded, `false` otherwise. On success, `bindings`
  // will have `expr.getArity()` more elements than before, and the input stream's position may
  // have increased. On failure, `bindings` and position will be unchanged.
  eval: function(expr) {
    var inputStream = this.inputStream;
    var origNumBindings = this.bindings.length;

    var origFailures;
    if (this.recordingMode === RM_RIGHTMOST_FAILURES) {
      origFailures = this.rightmostFailures;
      this.rightmostFailures = undefined;
    }

    var origPos = inputStream.pos;
    var memoPos = this.maybeSkipSpacesBefore(expr);

    var origTrace;
    if (this.isTracing()) {
      origTrace = this.trace;
      this.trace = [];
    }

    // Do the actual evaluation.
    var ans = expr.eval(this);

    if (this.isTracing()) {
      var bindings = this.bindings.slice(origNumBindings);
      var traceEntry = this.getTraceEntry(memoPos, expr, ans, bindings);
      traceEntry.isImplicitSpaces = expr === applySpaces;
      traceEntry.isRootNode = expr === this.startExpr;
      origTrace.push(traceEntry);
      this.trace = origTrace;
    }

    if (ans) {
      if (this.rightmostFailures &&
        (inputStream.pos === this.rightmostFailurePosition ||
         this.skipSpacesIfInSyntacticContext() === this.rightmostFailurePosition)) {
        var self = this;
        Object.keys(this.rightmostFailures).forEach(function(key) {
          self.rightmostFailures[key].makeFluffy();
        });
      }
    } else {
      // Reset the position and the bindings.
      inputStream.pos = origPos;
      this.truncateBindings(origNumBindings);
    }

    if (this.recordingMode === RM_RIGHTMOST_FAILURES && origFailures) {
      this.addRightmostFailures(origFailures, false);
    }

    return ans;
  },

  // Return the starting expression for this grammar. If `optStartApplication` is specified, it
  // is a string expressing a rule application in the grammar. If not specified, the grammar's
  // default start rule will be used.
  _getStartExpr: function(grammar, optStartApplication) {
    var applicationStr = optStartApplication || grammar.defaultStartRule;
    if (!applicationStr) {
      throw new Error('Missing start rule argument -- the grammar has no default start rule.');
    }

    var startApp = grammar.parseApplication(applicationStr);
    return new pexprs.Seq([startApp, pexprs.end]);
  },

  evalFromStart: function() {
    this.eval(this.startExpr);
  },

  getFailuresInfo: function() {
    if (this.recordingMode === RM_RIGHTMOST_FAILURE_POSITION) {
      return this.rightmostFailurePosition;
    } else /* if (this.recordingMode === RM_RIGHTMOST_FAILURES) */ {
      return this.rightmostFailures;
    }
  },

  restoreFailuresInfo: function(failuresInfo) {
    if (this.recordingMode === RM_RIGHTMOST_FAILURE_POSITION) {
      this.rightmostFailurePosition = failuresInfo;
    } else /* if (this.recordingMode === RM_RIGHTMOST_FAILURES) */ {
      this.rightmostFailures = failuresInfo;
    }
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = State;

},{"./InputStream":31,"./PosInfo":35,"./Trace":38,"./pexprs":61}],38:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Interval = require('./Interval');
var common = require('./common');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Unicode characters that are used in the `toString` output.
var BALLOT_X = '\u2717';
var CHECK_MARK = '\u2713';
var DOT_OPERATOR = '\u22C5';
var RIGHTWARDS_DOUBLE_ARROW = '\u21D2';
var SYMBOL_FOR_HORIZONTAL_TABULATION = '\u2409';
var SYMBOL_FOR_LINE_FEED = '\u240A';
var SYMBOL_FOR_CARRIAGE_RETURN = '\u240D';

function spaces(n) {
  return common.repeat(' ', n).join('');
}

// Return a string representation of a portion of `inputStream` at offset `pos`.
// The result will contain exactly `len` characters.
function getInputExcerpt(inputStream, pos, len) {
  var excerpt = asEscapedString(inputStream.sourceSlice(pos, pos + len));

  // Pad the output if necessary.
  if (excerpt.length < len) {
    return excerpt + common.repeat(' ', len - excerpt.length).join('');
  }
  return excerpt;
}

function asEscapedString(obj) {
  if (typeof obj === 'string') {
    // Replace non-printable characters with visible symbols.
    return obj
        .replace(/ /g, DOT_OPERATOR)
        .replace(/\t/g, SYMBOL_FOR_HORIZONTAL_TABULATION)
        .replace(/\n/g, SYMBOL_FOR_LINE_FEED)
        .replace(/\r/g, SYMBOL_FOR_CARRIAGE_RETURN);
  }
  return String(obj);
}

// ----------------- Trace -----------------

function Trace(inputStream, pos, expr, succeeded, bindings, optChildren) {
  this.inputStream = inputStream;
  this.pos = pos;
  this.source = new Interval(inputStream, pos, inputStream.pos);
  this.expr = expr;
  this.succeeded = succeeded;
  this.bindings = bindings;
  this.children = optChildren || [];

  this.isHeadOfLeftRecursion = false;  // Is this the outermost LR application?
  this.isImplicitSpaces = false;
  this.isMemoized = false;
  this.isRootNode = false;
  this.terminatesLR = false;
  this.terminatingLREntry = null;
}

// A value that can be returned from visitor functions to indicate that a
// node should not be recursed into.
Trace.prototype.SKIP = {};

Object.defineProperty(Trace.prototype, 'displayString', {
  get: function() { return this.expr.toDisplayString(); }
});

Trace.prototype.clone = function() {
  return this.cloneWithExpr(this.expr);
};

Trace.prototype.cloneWithExpr = function(expr) {
  var ans = new Trace(
      this.inputStream, this.pos, expr, this.succeeded, this.bindings, this.children);

  ans.isHeadOfLeftRecursion = this.isHeadOfLeftRecursion;
  ans.isImplicitSpaces = this.isImplicitSpaces;
  ans.isMemoized = this.isMemoized;
  ans.isRootNode = this.isRootNode;
  ans.terminatesLR = this.terminatesLR;
  ans.terminatingLREntry = this.terminatingLREntry;
  return ans;
};

// Record the trace information for the terminating condition of the LR loop.
Trace.prototype.recordLRTermination = function(ruleBodyTrace, value) {
  this.terminatingLREntry =
      new Trace(this.inputStream, this.pos, this.expr, false, [value], [ruleBodyTrace]);
  this.terminatingLREntry.terminatesLR = true;
};

// Recursively traverse this trace node and all its descendents, calling a visitor function
// for each node that is visited. If `vistorObjOrFn` is an object, then its 'enter' property
// is a function to call before visiting the children of a node, and its 'exit' property is
// a function to call afterwards. If `visitorObjOrFn` is a function, it represents the 'enter'
// function.
//
// The functions are called with three arguments: the Trace node, its parent Trace, and a number
// representing the depth of the node in the tree. (The root node has depth 0.) `optThisArg`, if
// specified, is the value to use for `this` when executing the visitor functions.
Trace.prototype.walk = function(visitorObjOrFn, optThisArg) {
  var visitor = visitorObjOrFn;
  if (typeof visitor === 'function') {
    visitor = {enter: visitor};
  }

  function _walk(node, parent, depth) {
    var recurse = true;
    if (visitor.enter) {
      if (visitor.enter.call(optThisArg, node, parent, depth) === Trace.prototype.SKIP) {
        recurse = false;
      }
    }
    if (recurse) {
      node.children.forEach(function(child) {
        _walk(child, node, depth + 1);
      });
      if (visitor.exit) {
        visitor.exit.call(optThisArg, node, parent, depth);
      }
    }
  }
  if (this.isRootNode) {
    // Don't visit the root node itself, only its children.
    this.children.forEach(function(c) { _walk(c, null, 0); });
  } else {
    _walk(this, null, 0);
  }
};

// Return a string representation of the trace.
// Sample:
//     12⋅+⋅2⋅*⋅3 ✓ exp ⇒  "12"
//     12⋅+⋅2⋅*⋅3   ✓ addExp (LR) ⇒  "12"
//     12⋅+⋅2⋅*⋅3       ✗ addExp_plus
Trace.prototype.toString = function() {
  var sb = new common.StringBuffer();
  this.walk(function(node, parent, depth) {
    if (!node) {
      return this.SKIP;
    }
    var ctorName = node.expr.constructor.name;
    // Don't print anything for Alt nodes.
    if (ctorName === 'Alt') {
      return;  // eslint-disable-line consistent-return
    }
    sb.append(getInputExcerpt(node.inputStream, node.pos, 10) + spaces(depth * 2 + 1));
    sb.append((node.succeeded ? CHECK_MARK : BALLOT_X) + ' ' + node.displayString);
    if (node.isHeadOfLeftRecursion) {
      sb.append(' (LR)');
    }
    if (node.succeeded) {
      var contents = asEscapedString(node.source.contents);
      sb.append(' ' + RIGHTWARDS_DOUBLE_ARROW + '  ');
      sb.append(typeof contents === 'string' ? '"' + contents + '"' : contents);
    }
    sb.append('\n');
  }.bind(this));
  return sb.contents();
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Trace;

},{"./Interval":32,"./common":40}],39:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var assert = require('./common').assert;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Helpers

function getProp(name, thing, fn) {
  return fn(thing[name]);
}

function mapProp(name, thing, fn) {
  return thing[name].map(fn);
}

// Returns a function that will walk a single property of a node.
// `descriptor` is a string indicating the property name, optionally ending
// with '[]' (e.g., 'children[]').
function getPropWalkFn(descriptor) {
  var parts = descriptor.split(/ ?\[\]/);
  if (parts.length === 2) {
    return mapProp.bind(null, parts[0]);
  }
  return getProp.bind(null, descriptor);
}

function getProps(walkFns, thing, fn) {
  return walkFns.map(function(walkFn) {
    return walkFn(thing, fn);
  });
}

function getWalkFn(shape) {
  if (typeof shape === 'string') {
    return getProps.bind(null, [getPropWalkFn(shape)]);
  } else if (Array.isArray(shape)) {
    return getProps.bind(null, shape.map(getPropWalkFn));
  } else {
    assert(typeof shape === 'function', 'Expected a string, Array, or function');
    assert(shape.length === 2, 'Expected a function of arity 2, got ' + shape.length);
    return shape;
  }
}

function isRestrictedIdentifier(str) {
  return /^[a-zA-Z_][0-9a-zA-Z_]*$/.test(str);
}

function trim(s) {
  return s.trim();
}

function parseSignature(sig) {
  var idPattern = /[a-zA-Z][a-zA-Z0-9_]+/;
  var parts = sig.split(/[()]/).map(trim);
  if (parts.length === 3 && parts[2] === '') {
    var name = parts[0];
    var params = [];
    if (parts[1].length > 0) {
      params = parts[1].split(',').map(trim);
    }
    if (isRestrictedIdentifier(name) && params.every(isRestrictedIdentifier)) {
      return {name: name, formals: params};
    }
  }
  throw new Error('Invalid operation signature: ' + sig);
}

/*
  A VisitorFamily contains a set of recursive operations that are defined over some kind of
  tree structure. The `config` parameter specifies how to walk the tree:
  - 'getTag' is function which, given a node in the tree, returns the node's 'tag' (type)
  - 'shapes' an object that maps from a tag to a value that describes how to recursively
    evaluate the operation for nodes of that type. The value can be:
    * a string indicating the property name that holds that node's only child
    * an Array of property names (or an empty array indicating a leaf type), or
    * a function taking two arguments (node, fn), and returning an Array which is the result
      of apply `fn` to each of the node's children.
 */
function VisitorFamily(config) {
  this._shapes = config.shapes;
  this._getTag = config.getTag;

  this.Adapter = function(thing, family) {
    this._adaptee = thing;
    this._family = family;
  };
  this.Adapter.prototype.valueOf = function() {
    throw new Error('heeey!');
  };
  this.operations = {};

  this._arities = Object.create(null);
  this._getChildren = Object.create(null);

  var self = this;
  Object.keys(this._shapes).forEach(function(k) {
    var shape = self._shapes[k];
    self._getChildren[k] = getWalkFn(shape);

    // A function means the arity isn't fixed, so don't put an entry in the arity map.
    if (typeof shape !== 'function') {
      self._arities[k] = Array.isArray(shape) ? shape.length : 1;
    }
  });
  this._wrap = function(thing) { return new self.Adapter(thing, self); };
}

VisitorFamily.prototype.wrap = function(thing) {
  return this._wrap(thing);
};

VisitorFamily.prototype._checkActionDict = function(dict) {
  var self = this;
  Object.keys(dict).forEach(function(k) {
    assert(k in self._getChildren, "Unrecognized action name '" + k + "'");
    var action = dict[k];
    assert(typeof action === 'function', "Key '" + k + "': expected function, got " + action);
    if (k in self._arities) {
      var expected = self._arities[k];
      var actual = dict[k].length;
      assert(actual === expected,
             "Action '" + k + "' has the wrong arity: expected " + expected + ', got ' + actual);
    }
  });
};

VisitorFamily.prototype.addOperation = function(signature, actions) {
  var sig = parseSignature(signature);
  var name = sig.name;
  this._checkActionDict(actions);
  this.operations[name] = {
    name: name,
    formals: sig.formals,
    actions: actions
  };

  var family = this;
  this.Adapter.prototype[name] = function() {
    var tag = family._getTag(this._adaptee);
    assert(tag in family._getChildren, "getTag returned unrecognized tag '" + tag + "'");
    assert(tag in actions, "No action for '" + tag + "' in operation '" + name + "'");

    // Create an "arguments object" from the arguments that were passed to this
    // operation / attribute.
    var args = Object.create(null);
    for (var i = 0; i < arguments.length; i++) {
      args[sig.formals[i]] = arguments[i];
    }

    var oldArgs = this.args;
    this.args = args;
    var ans = actions[tag].apply(this, family._getChildren[tag](this._adaptee, family._wrap));
    this.args = oldArgs;
    return ans;
  };
  return this;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = VisitorFamily;

},{"./common":40}],40:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var extend = require('util-extend');

// --------------------------------------------------------------------
// Private Stuff
// --------------------------------------------------------------------

// Helpers

var escapeStringFor = {};
for (var c = 0; c < 128; c++) {
  escapeStringFor[c] = String.fromCharCode(c);
}
escapeStringFor["'".charCodeAt(0)] = "\\'";
escapeStringFor['"'.charCodeAt(0)] = '\\"';
escapeStringFor['\\'.charCodeAt(0)] = '\\\\';
escapeStringFor['\b'.charCodeAt(0)] = '\\b';
escapeStringFor['\f'.charCodeAt(0)] = '\\f';
escapeStringFor['\n'.charCodeAt(0)] = '\\n';
escapeStringFor['\r'.charCodeAt(0)] = '\\r';
escapeStringFor['\t'.charCodeAt(0)] = '\\t';
escapeStringFor['\u000b'.charCodeAt(0)] = '\\v';

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.abstract = function(optMethodName) {
  var methodName = optMethodName || '';
  return function() {
    throw new Error(
      'this method ' + methodName + ' is abstract! ' +
      '(it has no implementation in class ' + this.constructor.name + ')');
  };
};

exports.assert = function(cond, message) {
  if (!cond) {
    throw new Error(message);
  }
};

// Define a lazily-computed, non-enumerable property named `propName`
// on the object `obj`. `getterFn` will be called to compute the value the
// first time the property is accessed.
exports.defineLazyProperty = function(obj, propName, getterFn) {
  var memo;
  Object.defineProperty(obj, propName, {
    get: function() {
      if (!memo) {
        memo = getterFn.call(this);
      }
      return memo;
    }
  });
};

exports.clone = function(obj) {
  if (obj) {
    return extend({}, obj);
  }
  return obj;
};

exports.extend = extend;

exports.repeatFn = function(fn, n) {
  var arr = [];
  while (n-- > 0) {
    arr.push(fn());
  }
  return arr;
};

exports.repeatStr = function(str, n) {
  return new Array(n + 1).join(str);
};

exports.repeat = function(x, n) {
  return exports.repeatFn(function() { return x; }, n);
};

exports.getDuplicates = function(array) {
  var duplicates = [];
  for (var idx = 0; idx < array.length; idx++) {
    var x = array[idx];
    if (array.lastIndexOf(x) !== idx && duplicates.indexOf(x) < 0) {
      duplicates.push(x);
    }
  }
  return duplicates;
};

exports.copyWithoutDuplicates = function(array) {
  var noDuplicates = [];
  array.forEach(function(entry) {
    if (noDuplicates.indexOf(entry) < 0) {
      noDuplicates.push(entry);
    }
  });
  return noDuplicates;
};

exports.isSyntactic = function(ruleName) {
  var firstChar = ruleName[0];
  return firstChar === firstChar.toUpperCase();
};

exports.isLexical = function(ruleName) {
  return !exports.isSyntactic(ruleName);
};

exports.padLeft = function(str, len, optChar) {
  var ch = optChar || ' ';
  if (str.length < len) {
    return exports.repeatStr(ch, len - str.length) + str;
  }
  return str;
};

// StringBuffer

exports.StringBuffer = function() {
  this.strings = [];
};

exports.StringBuffer.prototype.append = function(str) {
  this.strings.push(str);
};

exports.StringBuffer.prototype.contents = function() {
  return this.strings.join('');
};

// Character escaping and unescaping

exports.escapeChar = function(c, optDelim) {
  var charCode = c.charCodeAt(0);
  if ((c === '"' || c === "'") && optDelim && c !== optDelim) {
    return c;
  } else if (charCode < 128) {
    return escapeStringFor[charCode];
  } else if (128 <= charCode && charCode < 256) {
    return '\\x' + exports.padLeft(charCode.toString(16), 2, '0');
  } else {
    return '\\u' + exports.padLeft(charCode.toString(16), 4, '0');
  }
};

exports.unescapeChar = function(s) {
  if (s.charAt(0) === '\\') {
    switch (s.charAt(1)) {
      case 'b': return '\b';
      case 'f': return '\f';
      case 'n': return '\n';
      case 'r': return '\r';
      case 't': return '\t';
      case 'v': return '\v';
      case 'x': return String.fromCharCode(parseInt(s.substring(2, 4), 16));
      case 'u': return String.fromCharCode(parseInt(s.substring(2, 6), 16));
      default: return s.charAt(1);
    }
  } else {
    return s;
  }
};

// Helper for producing a description of an unknown object in a safe way.
// Especially useful for error messages where an unexpected type of object was encountered.
exports.unexpectedObjToString = function(obj) {
  if (obj == null) {
    return String(obj);
  }
  var baseToString = Object.prototype.toString.call(obj);
  try {
    var typeName;
    if (obj.constructor && obj.constructor.name) {
      typeName = obj.constructor.name;
    } else if (baseToString.indexOf('[object ') === 0) {
      typeName = baseToString.slice(8, -1);  // Extract e.g. "Array" from "[object Array]".
    } else {
      typeName = typeof obj;
    }
    return typeName + ': ' + JSON.stringify(String(obj));
  } catch (e) {
    return baseToString;
  }
};

},{"util-extend":26}],41:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Namespace = require('./Namespace');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function createError(message, optInterval) {
  var e;
  if (optInterval) {
    e = new Error(optInterval.getLineAndColumnMessage() + message);
    e.shortMessage = message;
    e.interval = optInterval;
  } else {
    e = new Error(message);
  }
  return e;
}

// ----------------- errors about intervals -----------------

function intervalSourcesDontMatch() {
  return createError("Interval sources don't match");
}

// ----------------- errors about grammars -----------------

// Grammar syntax error

function grammarSyntaxError(matchFailure) {
  var e = new Error();
  Object.defineProperty(e, 'message', {get: function() { return matchFailure.message; }});
  Object.defineProperty(e, 'shortMessage', {get: function() {
    return 'Expected ' + matchFailure.getExpectedText();
  }});
  e.interval = matchFailure.getInterval();
  return e;
}

// Undeclared grammar

function undeclaredGrammar(grammarName, namespace, interval) {
  var message = namespace ?
      'Grammar ' + grammarName + ' is not declared in namespace ' + Namespace.toString(namespace) :
      'Undeclared grammar ' + grammarName;
  return createError(message, interval);
}

// Duplicate grammar declaration

function duplicateGrammarDeclaration(grammar, namespace) {
  return createError('Grammar ' + grammar.name + ' is already declared in this namespace');
}

// ----------------- rules -----------------

// Undeclared rule

function undeclaredRule(ruleName, grammarName, optInterval) {
  return createError(
      'Rule ' + ruleName + ' is not declared in grammar ' + grammarName,
      optInterval);
}

// Cannot override undeclared rule

function cannotOverrideUndeclaredRule(ruleName, grammarName, optSource) {
  return createError(
      'Cannot override rule ' + ruleName + ' because it is not declared in ' + grammarName,
      optSource);
}

// Cannot extend undeclared rule

function cannotExtendUndeclaredRule(ruleName, grammarName, optSource) {
  return createError(
      'Cannot extend rule ' + ruleName + ' because it is not declared in ' + grammarName,
      optSource);
}

// Duplicate rule declaration

function duplicateRuleDeclaration(ruleName, grammarName, declGrammarName, body, optSource) {
  var message = "Duplicate declaration for rule '" + ruleName +
      "' in grammar '" + grammarName + "'";
  if (grammarName !== declGrammarName) {
    message += " (originally declared in '" + declGrammarName + "')";
  }
  return createError(message, optSource);
}

// Wrong number of parameters

function wrongNumberOfParameters(ruleName, expected, actual, body, source) {
  return createError(
      'Wrong number of parameters for rule ' + ruleName +
          ' (expected ' + expected + ', got ' + actual + ')',
      source);
}

// Wrong number of arguments

function wrongNumberOfArguments(ruleName, expected, actual, expr) {
  return createError(
      'Wrong number of arguments for rule ' + ruleName +
          ' (expected ' + expected + ', got ' + actual + ')',
      expr.source);
}

// Duplicate parameter names

function duplicateParameterNames(ruleName, duplicates, body, source) {
  return createError(
      'Duplicate parameter names in rule ' + ruleName + ': ' + duplicates.join(','),
      source);
}

// Invalid parameter expression

function invalidParameter(ruleName, expr) {
  return createError(
      'Invalid parameter to rule ' + ruleName + ': ' + expr + ' has arity ' + expr.getArity() +
         ', but parameter expressions must have arity 1',
      expr.source);
}

// Application of syntactic rule from lexical rule

function applicationOfSyntacticRuleFromLexicalContext(ruleName, applyExpr) {
  return createError(
      'Cannot apply syntactic rule ' + ruleName + ' from here (inside a lexical context)',
      applyExpr.source);
}

// ----------------- Kleene operators -----------------

function kleeneExprHasNullableOperand(kleeneExpr) {
  return createError(
      'Nullable expression ' + kleeneExpr.expr.source.contents + " is not allowed inside '" +
          kleeneExpr.operator + "' (possible infinite loop)",
      kleeneExpr.expr.source);
}

// ----------------- arity -----------------

function inconsistentArity(ruleName, expected, actual, expr) {
  return createError(
      'Rule ' + ruleName + ' involves an alternation which has inconsistent arity ' +
          '(expected ' + expected + ', got ' + actual + ')',
      expr.source);
}

// ----------------- properties -----------------

function duplicatePropertyNames(duplicates) {
  return createError('Object pattern has duplicate property names: ' + duplicates.join(', '));
}

// ----------------- constructors -----------------

function invalidConstructorCall(grammar, ctorName, children) {
  return createError(
      'Attempt to invoke constructor ' + ctorName + ' with invalid or unexpected arguments');
}

// ----------------- convenience -----------------

function multipleErrors(errors) {
  var messages = errors.map(function(e) { return e.message; });
  return createError(
      ['Errors:'].concat(messages).join('\n- '),
      errors[0].interval);
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = {
  applicationOfSyntacticRuleFromLexicalContext: applicationOfSyntacticRuleFromLexicalContext,
  cannotExtendUndeclaredRule: cannotExtendUndeclaredRule,
  cannotOverrideUndeclaredRule: cannotOverrideUndeclaredRule,
  duplicateGrammarDeclaration: duplicateGrammarDeclaration,
  duplicateParameterNames: duplicateParameterNames,
  duplicatePropertyNames: duplicatePropertyNames,
  duplicateRuleDeclaration: duplicateRuleDeclaration,
  inconsistentArity: inconsistentArity,
  intervalSourcesDontMatch: intervalSourcesDontMatch,
  invalidConstructorCall: invalidConstructorCall,
  invalidParameter: invalidParameter,
  grammarSyntaxError: grammarSyntaxError,
  kleeneExprHasNullableOperand: kleeneExprHasNullableOperand,
  undeclaredGrammar: undeclaredGrammar,
  undeclaredRule: undeclaredRule,
  wrongNumberOfArguments: wrongNumberOfArguments,
  wrongNumberOfParameters: wrongNumberOfParameters,

  throwErrors: function(errors) {
    if (errors.length === 1) {
      throw errors[0];
    }
    if (errors.length > 1) {
      throw multipleErrors(errors);
    }
  }
};

},{"./Namespace":34}],42:[function(require,module,exports){
/* global document, XMLHttpRequest */

'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Builder = require('./Builder');
var Grammar = require('./Grammar');
var Namespace = require('./Namespace');
var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');
var util = require('./util');

var isBuffer = require('is-buffer');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// The metagrammar, i.e. the grammar for Ohm grammars. Initialized at the
// bottom of this file because loading the grammar requires Ohm itself.
var ohmGrammar;

// An object which makes it possible to stub out the document API for testing.
var documentInterface = {
  querySelector: function(sel) { return document.querySelector(sel); },
  querySelectorAll: function(sel) { return document.querySelectorAll(sel); }
};

// Check if `obj` is a DOM element.
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}

function isUndefined(obj) {
  return obj === void 0;  // eslint-disable-line no-void
}

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

function isArrayLike(obj) {
  if (obj == null) {
    return false;
  }
  var length = obj.length;
  return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
}

// TODO: just use the jQuery thing
function load(url) {
  var req = new XMLHttpRequest();
  req.open('GET', url, false);
  try {
    req.send();
    if (req.status === 0 || req.status === 200) {
      return req.responseText;
    }
  } catch (e) {}
  throw new Error('unable to load url ' + url);
}

// Returns a Grammar instance (i.e., an object with a `match` method) for
// `tree`, which is the concrete syntax tree of a user-written grammar.
// The grammar will be assigned into `namespace` under the name of the grammar
// as specified in the source.
function buildGrammar(match, namespace, optOhmGrammarForTesting) {
  var builder = new Builder();
  var decl;
  var currentRuleName;
  var currentRuleFormals;
  var overriding = false;
  var metaGrammar = optOhmGrammarForTesting || ohmGrammar;

  // A visitor that produces a Grammar instance from the CST.
  var helpers = metaGrammar.createSemantics().addOperation('visit', {
    Grammar: function(n, s, open, rs, close) {
      var grammarName = n.visit();
      decl = builder.newGrammar(grammarName, namespace);
      s.visit();
      rs.visit();
      var g = decl.build();
      g.source = this.source.trimmed();
      if (grammarName in namespace) {
        throw errors.duplicateGrammarDeclaration(g, namespace);
      }
      namespace[grammarName] = g;
      return g;
    },

    SuperGrammar: function(_, n) {
      var superGrammarName = n.visit();
      if (superGrammarName === 'null') {
        decl.withSuperGrammar(null);
      } else {
        if (!namespace || !(superGrammarName in namespace)) {
          throw errors.undeclaredGrammar(superGrammarName, namespace, n.source);
        }
        decl.withSuperGrammar(namespace[superGrammarName]);
      }
    },

    Rule_define: function(n, fs, d, _, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.visit()[0] || [];
      // If there is no default start rule yet, set it now. This must be done before visiting
      // the body, because it might contain an inline rule definition.
      if (!decl.defaultStartRule && decl.ensureSuperGrammar() !== Grammar.ProtoBuiltInRules) {
        decl.withDefaultStartRule(currentRuleName);
      }
      var body = b.visit();
      var description = d.visit()[0];
      var source = this.source.trimmed();
      return decl.define(currentRuleName, currentRuleFormals, body, description, source);
    },
    Rule_override: function(n, fs, _, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.visit()[0] || [];
      overriding = true;
      var body = b.visit();
      var source = this.source.trimmed();
      var ans = decl.override(currentRuleName, currentRuleFormals, body, null, source);
      overriding = false;
      return ans;
    },
    Rule_extend: function(n, fs, _, b) {
      currentRuleName = n.visit();
      currentRuleFormals = fs.visit()[0] || [];
      var body = b.visit();
      var source = this.source.trimmed();
      var ans = decl.extend(currentRuleName, currentRuleFormals, body, null, source);
      return ans;
    },
    RuleBody: function(_, terms) {
      var args = terms.visit();
      return builder.alt.apply(builder, args).withSource(this.source);
    },

    Formals: function(opointy, fs, cpointy) {
      return fs.visit();
    },

    Params: function(opointy, ps, cpointy) {
      return ps.visit();
    },

    Alt: function(seqs) {
      var args = seqs.visit();
      return builder.alt.apply(builder, args).withSource(this.source);
    },

    TopLevelTerm_inline: function(b, n) {
      var inlineRuleName = currentRuleName + '_' + n.visit();
      var body = b.visit();
      var source = this.source.trimmed();
      var isNewRuleDeclaration =
          !(decl.superGrammar && decl.superGrammar.rules[inlineRuleName]);
      if (overriding && !isNewRuleDeclaration) {
        decl.override(inlineRuleName, currentRuleFormals, body, null, source);
      } else {
        decl.define(inlineRuleName, currentRuleFormals, body, null, source);
      }
      var params = currentRuleFormals.map(function(formal) { return builder.app(formal); });
      return builder.app(inlineRuleName, params).withSource(body.source);
    },

    Seq: function(expr) {
      return builder.seq.apply(builder, expr.visit()).withSource(this.source);
    },

    Iter_star: function(x, _) {
      return builder.star(x.visit()).withSource(this.source);
    },
    Iter_plus: function(x, _) {
      return builder.plus(x.visit()).withSource(this.source);
    },
    Iter_opt: function(x, _) {
      return builder.opt(x.visit()).withSource(this.source);
    },

    Pred_not: function(_, x) {
      return builder.not(x.visit()).withSource(this.source);
    },
    Pred_lookahead: function(_, x) {
      return builder.lookahead(x.visit()).withSource(this.source);
    },

    Lex_lex: function(_, x) {
      return builder.lex(x.visit()).withSource(this.source);
    },

    Base_application: function(rule, ps) {
      return builder.app(rule.visit(), ps.visit()[0] || []).withSource(this.source);
    },
    Base_range: function(from, _, to) {
      return builder.range(from.visit(), to.visit()).withSource(this.source);
    },
    Base_terminal: function(expr) {
      return builder.terminal(expr.visit()).withSource(this.source);
    },
    Base_paren: function(open, x, close) {
      return x.visit();
    },

    ruleDescr: function(open, t, close) {
      return t.visit();
    },
    ruleDescrText: function(_) {
      return this.sourceString.trim();
    },

    caseName: function(_, space1, n, space2, end) {
      return n.visit();
    },

    name: function(first, rest) {
      return this.sourceString;
    },
    nameFirst: function(expr) {},
    nameRest: function(expr) {},

    terminal: function(open, cs, close) {
      return cs.visit().map(function(c) { return common.unescapeChar(c); }).join('');
    },

    terminalChar: function(_) {
      return this.sourceString;
    },

    escapeChar: function(_) {
      return this.sourceString;
    },

    NonemptyListOf: function(x, _, xs) {
      return [x.visit()].concat(xs.visit());
    },
    EmptyListOf: function() {
      return [];
    },

    _terminal: function() {
      return this.primitiveValue;
    }
  });
  return helpers(match).visit();
}

function compileAndLoad(source, namespace) {
  var m = ohmGrammar.match(source, 'Grammars');
  if (m.failed()) {
    throw errors.grammarSyntaxError(m);
  }
  return buildGrammar(m, namespace);
}

// Return the contents of a script element, fetching it via XHR if necessary.
function getScriptElementContents(el) {
  if (!isElement(el)) {
    throw new TypeError('Expected a DOM Node, got ' + common.unexpectedObjToString(el));
  }
  if (el.type !== 'text/ohm-js') {
    throw new Error('Expected a script tag with type="text/ohm-js", got ' + el);
  }
  return el.getAttribute('src') ? load(el.getAttribute('src')) : el.innerHTML;
}

function grammar(source, optNamespace) {
  var ns = grammars(source, optNamespace);

  // Ensure that the source contained no more than one grammar definition.
  var grammarNames = Object.keys(ns);
  if (grammarNames.length === 0) {
    throw new Error('Missing grammar definition');
  } else if (grammarNames.length > 1) {
    var secondGrammar = ns[grammarNames[1]];
    var interval = secondGrammar.source;
    throw new Error(
        util.getLineAndColumnMessage(interval.inputStream.source, interval.startIdx) +
        'Found more than one grammar definition -- use ohm.grammars() instead.');
  }
  return ns[grammarNames[0]];  // Return the one and only grammar.
}

function grammars(source, optNamespace) {
  var ns = Namespace.extend(Namespace.asNamespace(optNamespace));
  if (typeof source !== 'string') {
    // For convenience, detect Node.js Buffer objects and automatically call toString().
    if (isBuffer(source)) {
      source = source.toString();
    } else {
      throw new TypeError(
          'Expected string as first argument, got ' + common.unexpectedObjToString(source));
    }
  }
  compileAndLoad(source, ns);
  return ns;
}

function grammarFromScriptElement(optNode) {
  var node = optNode;
  if (isUndefined(node)) {
    var nodeList = documentInterface.querySelectorAll('script[type="text/ohm-js"]');
    if (nodeList.length !== 1) {
      throw new Error(
          'Expected exactly one script tag with type="text/ohm-js", found ' + nodeList.length);
    }
    node = nodeList[0];
  }
  return grammar(getScriptElementContents(node));
}

function grammarsFromScriptElements(optNodeOrNodeList) {
  // Simple case: the argument is a DOM node.
  if (isElement(optNodeOrNodeList)) {
    return grammars(optNodeOrNodeList);
  }
  // Otherwise, it must be either undefined or a NodeList.
  var nodeList = optNodeOrNodeList;
  if (isUndefined(nodeList)) {
    // Find all script elements with type="text/ohm-js".
    nodeList = documentInterface.querySelectorAll('script[type="text/ohm-js"]');
  } else if (typeof nodeList === 'string' || (!isElement(nodeList) && !isArrayLike(nodeList))) {
    throw new TypeError('Expected a Node, NodeList, or Array, but got ' + nodeList);
  }
  var ns = Namespace.createNamespace();
  for (var i = 0; i < nodeList.length; ++i) {
    // Copy the new grammars into `ns` to keep the namespace flat.
    common.extend(ns, grammars(getScriptElementContents(nodeList[i]), ns));
  }
  return ns;
}

function makeRecipe(recipe) {
  if (typeof recipe === 'function') {
    return recipe.call(new Builder());
  } else {
    if (typeof recipe === 'string') {
      // stringified JSON recipe
      recipe = JSON.parse(recipe);
    }
    return (new Builder()).fromRecipe(recipe);
  }
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

// Stuff that users should know about
module.exports = {
  createNamespace: Namespace.createNamespace,
  grammar: grammar,
  grammars: grammars,
  grammarFromScriptElement: grammarFromScriptElement,
  grammarsFromScriptElements: grammarsFromScriptElements,
  makeRecipe: makeRecipe,
  ohmGrammar: null,  // Initialized below, after Grammar.BuiltInRules.
  pexprs: pexprs,
  util: util,
  extras: require('../extras')
};

// Stuff for testing, etc.
module.exports._buildGrammar = buildGrammar;
module.exports._setDocumentInterfaceForTesting = function(doc) { documentInterface = doc; };

// Late initialization for stuff that is bootstrapped.

Grammar.BuiltInRules = require('../dist/built-in-rules');

var Semantics = require('./Semantics');
var operationsAndAttributesGrammar = require('../dist/operations-and-attributes');
Semantics.initBuiltInSemantics(Grammar.BuiltInRules);
Semantics.initPrototypeParser(operationsAndAttributesGrammar);  // requires BuiltInSemantics

module.exports.ohmGrammar = ohmGrammar = require('../dist/ohm-grammar');
Grammar.initApplicationParser(ohmGrammar, buildGrammar);

},{"../dist/built-in-rules":1,"../dist/ohm-grammar":2,"../dist/operations-and-attributes":3,"../extras":4,"./Builder":27,"./Grammar":29,"./Namespace":34,"./Semantics":36,"./common":40,"./errors":41,"./pexprs":61,"./util":62,"is-buffer":25}],43:[function(require,module,exports){
'use strict';

var inherits = require('inherits');

var common = require('./common');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Node(grammar, ctorName, children, source) {
  this.grammar = grammar;
  this.ctorName = ctorName;
  this.children = children;
  this.source = source;
}

Node.prototype.numChildren = function() {
  return this.children.length;
};

Node.prototype.childAt = function(idx) {
  return this.children[idx];
};

Node.prototype.indexOfChild = function(arg) {
  return this.children.indexOf(arg);
};

Node.prototype.hasChildren = function() {
  return this.children.length > 0;
};

Node.prototype.hasNoChildren = function() {
  return !this.hasChildren();
};

Node.prototype.onlyChild = function() {
  if (this.children.length !== 1) {
    throw new Error(
        'cannot get only child of a node of type ' + this.ctorName +
        ' (it has ' + this.numChildren() + ' children)');
  } else {
    return this.firstChild();
  }
};

Node.prototype.firstChild = function() {
  if (this.hasNoChildren()) {
    throw new Error(
        'cannot get first child of a ' + this.ctorName + ' node, which has no children');
  } else {
    return this.childAt(0);
  }
};

Node.prototype.lastChild = function() {
  if (this.hasNoChildren()) {
    throw new Error(
        'cannot get last child of a ' + this.ctorName + ' node, which has no children');
  } else {
    return this.childAt(this.numChildren() - 1);
  }
};

Node.prototype.childBefore = function(child) {
  var childIdx = this.indexOfChild(child);
  if (childIdx < 0) {
    throw new Error('Node.childBefore() called w/ an argument that is not a child');
  } else if (childIdx === 0) {
    throw new Error('cannot get child before first child');
  } else {
    return this.childAt(childIdx - 1);
  }
};

Node.prototype.childAfter = function(child) {
  var childIdx = this.indexOfChild(child);
  if (childIdx < 0) {
    throw new Error('Node.childAfter() called w/ an argument that is not a child');
  } else if (childIdx === this.numChildren() - 1) {
    throw new Error('cannot get child after last child');
  } else {
    return this.childAt(childIdx + 1);
  }
};

Node.prototype.isTerminal = function() {
  return false;
};

Node.prototype.isNonterminal = function() {
  return false;
};

Node.prototype.isIteration = function() {
  return false;
};

Node.prototype.isOptional = function() {
  return false;
};

Node.prototype.toJSON = function() {
  var r = {};
  r[this.ctorName] = this.children;
  return r;
};

// Terminals

function TerminalNode(grammar, value, source) {
  Node.call(this, grammar, '_terminal', [], source);
  this.primitiveValue = value;
}
inherits(TerminalNode, Node);

TerminalNode.prototype.isTerminal = function() {
  return true;
};

// Nonterminals

function NonterminalNode(grammar, ruleName, children, source) {
  Node.call(this, grammar, ruleName, children, source);
}
inherits(NonterminalNode, Node);

NonterminalNode.prototype.isNonterminal = function() {
  return true;
};

NonterminalNode.prototype.isLexical = function() {
  return common.isLexical(this.ctorName);
};

NonterminalNode.prototype.isSyntactic = function() {
  return common.isSyntactic(this.ctorName);
};

// Iterations

function IterationNode(grammar, children, source, optional) {
  Node.call(this, grammar, '_iter', children, source);
  this.optional = optional;
}
inherits(IterationNode, Node);

IterationNode.prototype.isIteration = function() {
  return true;
};

IterationNode.prototype.isOptional = function() {
  return this.optional;
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = {
  Node: Node,
  TerminalNode: TerminalNode,
  NonterminalNode: NonterminalNode,
  IterationNode: IterationNode
};

},{"./common":40,"inherits":24}],44:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var pexprs = require('./pexprs');
var VisitorFamily = require('./VisitorFamily');

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

/*
  Defines the recursive shape of every type of PExpr by describing how to
  visit every child expression.

  Keys correspond to a value return from `getTag`, and the value must be:
  - a string, which is the property name that holds an expression's only child
  - an array of property names (or the empty array, indicating a leaf type), or
  - a function, which must apply its `fn` argument to every one of the expression's children.
 */
var shapes = {
  any: [],
  end: [],
  Alt: 'terms[]',
  Apply: 'args[]',
  Iter: 'expr',
  Extend: 'terms[]',
  Lex: 'expr',
  Lookahead: 'expr',
  Not: 'expr',
  Opt: 'expr',
  Param: [],
  Plus: 'expr',
  Range: [],
  Seq: 'factors[]',
  Star: 'expr',
  Terminal: [],
  UnicodeChar: []
};

// Retuns the key that will be used to look up the operation implementation function.
function getTag(obj) {
  switch (obj) {
    case pexprs.any:
      return 'any';
    case pexprs.end:
      return 'end';
    default:
      return obj.constructor.name;
  }
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = new VisitorFamily({shapes: shapes, getTag: getTag});

},{"./VisitorFamily":39,"./pexprs":61}],45:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Return true if we should skip spaces preceding this expression in a syntactic context.
*/
pexprs.PExpr.prototype.allowsSkippingPrecedingSpace = common.abstract(
  'allowsSkippingPrecedingSpace'
);

/*
  Generally, these are all first-order expressions and (with the exception of Apply)
  directly read from the input stream.
*/
pexprs.any.allowsSkippingPrecedingSpace =
pexprs.end.allowsSkippingPrecedingSpace =
pexprs.Apply.prototype.allowsSkippingPrecedingSpace =
pexprs.Terminal.prototype.allowsSkippingPrecedingSpace =
pexprs.Range.prototype.allowsSkippingPrecedingSpace =
pexprs.UnicodeChar.prototype.allowsSkippingPrecedingSpace = function() {
  return true;
};

/*
  Higher-order expressions that don't directly consume input.
*/
pexprs.Alt.prototype.allowsSkippingPrecedingSpace =
pexprs.Iter.prototype.allowsSkippingPrecedingSpace =
pexprs.Lex.prototype.allowsSkippingPrecedingSpace =
pexprs.Lookahead.prototype.allowsSkippingPrecedingSpace =
pexprs.Not.prototype.allowsSkippingPrecedingSpace =
pexprs.Param.prototype.allowsSkippingPrecedingSpace =
pexprs.Seq.prototype.allowsSkippingPrecedingSpace = function() {
  return false;
};

},{"./common":40,"./pexprs":61}],46:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

var lexifyCount;

pexprs.PExpr.prototype.assertAllApplicationsAreValid = function(ruleName, grammar) {
  lexifyCount = 0;
  this._assertAllApplicationsAreValid(ruleName, grammar);
};

pexprs.PExpr.prototype._assertAllApplicationsAreValid = common.abstract(
  '_assertAllApplicationsAreValid'
);

pexprs.any._assertAllApplicationsAreValid =
pexprs.end._assertAllApplicationsAreValid =
pexprs.Terminal.prototype._assertAllApplicationsAreValid =
pexprs.Range.prototype._assertAllApplicationsAreValid =
pexprs.Param.prototype._assertAllApplicationsAreValid =
pexprs.UnicodeChar.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  // no-op
};

pexprs.Lex.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  lexifyCount++;
  this.expr._assertAllApplicationsAreValid(ruleName, grammar);
  lexifyCount--;
};

pexprs.Alt.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    this.terms[idx]._assertAllApplicationsAreValid(ruleName, grammar);
  }
};

pexprs.Seq.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx]._assertAllApplicationsAreValid(ruleName, grammar);
  }
};

pexprs.Iter.prototype._assertAllApplicationsAreValid =
pexprs.Not.prototype._assertAllApplicationsAreValid =
pexprs.Lookahead.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  this.expr._assertAllApplicationsAreValid(ruleName, grammar);
};

pexprs.Apply.prototype._assertAllApplicationsAreValid = function(ruleName, grammar) {
  var ruleInfo = grammar.rules[this.ruleName];

  // Make sure that the rule exists...
  if (!ruleInfo) {
    throw errors.undeclaredRule(this.ruleName, grammar.name, this.source);
  }

  // ...and that this application is allowed
  if (common.isSyntactic(this.ruleName) && (!common.isSyntactic(ruleName) || lexifyCount > 0)) {
    throw errors.applicationOfSyntacticRuleFromLexicalContext(this.ruleName, this);
  }

  // ...and that this application has the correct number of arguments
  var actual = this.args.length;
  var expected = ruleInfo.formals.length;
  if (actual !== expected) {
    throw errors.wrongNumberOfArguments(this.ruleName, expected, actual, this);
  }

  // ...and that all of the argument expressions only have valid applications and have arity 1.
  var self = this;
  this.args.forEach(function(arg) {
    arg._assertAllApplicationsAreValid(ruleName, grammar);
    if (arg.getArity() !== 1) {
      throw errors.invalidParameter(self.ruleName, arg);
    }
  });
};

},{"./common":40,"./errors":41,"./pexprs":61}],47:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertChoicesHaveUniformArity = common.abstract(
  'assertChoicesHaveUniformArity'
);

pexprs.any.assertChoicesHaveUniformArity =
pexprs.end.assertChoicesHaveUniformArity =
pexprs.Terminal.prototype.assertChoicesHaveUniformArity =
pexprs.Range.prototype.assertChoicesHaveUniformArity =
pexprs.Param.prototype.assertChoicesHaveUniformArity =
pexprs.Lex.prototype.assertChoicesHaveUniformArity =
pexprs.UnicodeChar.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // no-op
};

pexprs.Alt.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  if (this.terms.length === 0) {
    return;
  }
  var arity = this.terms[0].getArity();
  for (var idx = 0; idx < this.terms.length; idx++) {
    var term = this.terms[idx];
    term.assertChoicesHaveUniformArity();
    var otherArity = term.getArity();
    if (arity !== otherArity) {
      throw errors.inconsistentArity(ruleName, arity, otherArity, term);
    }
  }
};

pexprs.Extend.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // Extend is a special case of Alt that's guaranteed to have exactly two
  // cases: [extensions, origBody].
  var actualArity = this.terms[0].getArity();
  var expectedArity = this.terms[1].getArity();
  if (actualArity !== expectedArity) {
    throw errors.inconsistentArity(ruleName, expectedArity, actualArity, this.terms[0]);
  }
};

pexprs.Seq.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertChoicesHaveUniformArity(ruleName);
  }
};

pexprs.Iter.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};

pexprs.Not.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // no-op (not required b/c the nested expr doesn't show up in the CST)
};

pexprs.Lookahead.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  this.expr.assertChoicesHaveUniformArity(ruleName);
};

pexprs.Apply.prototype.assertChoicesHaveUniformArity = function(ruleName) {
  // The arities of the parameter expressions is required to be 1 by
  // `assertAllApplicationsAreValid()`.
};

},{"./common":40,"./errors":41,"./pexprs":61}],48:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var errors = require('./errors');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertIteratedExprsAreNotNullable = common.abstract(
  'assertIteratedExprsAreNotNullable'
);

pexprs.any.assertIteratedExprsAreNotNullable =
pexprs.end.assertIteratedExprsAreNotNullable =
pexprs.Terminal.prototype.assertIteratedExprsAreNotNullable =
pexprs.Range.prototype.assertIteratedExprsAreNotNullable =
pexprs.Param.prototype.assertIteratedExprsAreNotNullable =
pexprs.UnicodeChar.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  // no-op
};

pexprs.Alt.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    this.terms[idx].assertIteratedExprsAreNotNullable(grammar, ruleName);
  }
};

pexprs.Seq.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertIteratedExprsAreNotNullable(grammar, ruleName);
  }
};

pexprs.Iter.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  // Note: this is the implementation of this method for `Star` and `Plus` expressions.
  // It is overridden for `Opt` below.
  this.expr.assertIteratedExprsAreNotNullable(grammar, ruleName);
  if (this.expr.isNullable(grammar)) {
    throw errors.kleeneExprHasNullableOperand(this, ruleName);
  }
};

pexprs.Opt.prototype.assertIteratedExprsAreNotNullable =
pexprs.Not.prototype.assertIteratedExprsAreNotNullable =
pexprs.Lookahead.prototype.assertIteratedExprsAreNotNullable =
pexprs.Lex.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  this.expr.assertIteratedExprsAreNotNullable(grammar, ruleName);
};

pexprs.Apply.prototype.assertIteratedExprsAreNotNullable = function(grammar, ruleName) {
  this.args.forEach(function(arg) {
    arg.assertIteratedExprsAreNotNullable(grammar, ruleName);
  });
};

},{"./common":40,"./errors":41,"./pexprs":61}],49:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var nodes = require('./nodes');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.check = common.abstract('check');

pexprs.any.check = function(grammar, vals) {
  return vals.length >= 1;
};

pexprs.end.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         vals[0].primitiveValue === undefined;
};

pexprs.Terminal.prototype.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         vals[0].primitiveValue === this.obj;
};

pexprs.Range.prototype.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         typeof vals[0].primitiveValue === typeof this.from;
};

pexprs.Param.prototype.check = function(grammar, vals) {
  return vals.length >= 1;
};

pexprs.Alt.prototype.check = function(grammar, vals) {
  for (var i = 0; i < this.terms.length; i++) {
    var term = this.terms[i];
    if (term.check(grammar, vals)) {
      return true;
    }
  }
  return false;
};

pexprs.Seq.prototype.check = function(grammar, vals) {
  var pos = 0;
  for (var i = 0; i < this.factors.length; i++) {
    var factor = this.factors[i];
    if (factor.check(grammar, vals.slice(pos))) {
      pos += factor.getArity();
    } else {
      return false;
    }
  }
  return true;
};

pexprs.Iter.prototype.check = function(grammar, vals) {
  var arity = this.getArity();
  var columns = vals.slice(0, arity);
  if (columns.length !== arity) {
    return false;
  }
  var rowCount = columns[0].length;
  var i;
  for (i = 1; i < arity; i++) {
    if (columns[i].length !== rowCount) {
      return false;
    }
  }

  for (i = 0; i < rowCount; i++) {
    var row = [];
    for (var j = 0; j < arity; j++) {
      row.push(columns[j][i]);
    }
    if (!this.expr.check(grammar, row)) {
      return false;
    }
  }

  return true;
};

pexprs.Not.prototype.check = function(grammar, vals) {
  return true;
};

pexprs.Lookahead.prototype.check =
pexprs.Lex.prototype.check = function(grammar, vals) {
  return this.expr.check(grammar, vals);
};

pexprs.Apply.prototype.check = function(grammar, vals) {
  if (!(vals[0] instanceof nodes.Node &&
        vals[0].grammar === grammar &&
        vals[0].ctorName === this.ruleName)) {
    return false;
  }

  // TODO: think about *not* doing the following checks, i.e., trusting that the rule
  // was correctly constructed.
  var ruleNode = vals[0];
  var body = grammar.rules[this.ruleName].body;
  return body.check(grammar, ruleNode.children) && ruleNode.numChildren() === body.getArity();
};

pexprs.UnicodeChar.prototype.check = function(grammar, vals) {
  return vals[0] instanceof nodes.Node &&
         vals[0].isTerminal() &&
         typeof vals[0].primitiveValue === 'string';
};

},{"./common":40,"./nodes":43,"./pexprs":61}],50:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Trace = require('./Trace');
var common = require('./common');
var nodes = require('./nodes');
var pexprs = require('./pexprs');

var TerminalNode = nodes.TerminalNode;
var NonterminalNode = nodes.NonterminalNode;
var IterationNode = nodes.IterationNode;

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Evaluate the expression and return `true` if it succeeds, `false` otherwise. This method should
  only be called directly by `State.prototype.eval(expr)`, which also updates the data structures
  that are used for tracing. (Making those updates in a method of `State` enables the trace-specific
  data structures to be "secrets" of that class, which is good for modularity.)

  The contract of this method is as follows:
  * When the return value is `true`,
    - the state object will have `expr.getArity()` more bindings than it did before the call.
  * When the return value is `false`,
    - the state object may have more bindings than it did before the call, and
    - its input stream's position may be anywhere.

  Note that `State.prototype.eval(expr)`, unlike this method, guarantees that neither the state
  object's bindings nor its input stream's position will change if the expression fails to match.
*/
pexprs.PExpr.prototype.eval = common.abstract('eval');  // function(state) { ... }

pexprs.any.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var ch = inputStream.next();
  if (ch) {
    var source = inputStream.interval(origPos);
    state.bindings.push(new TerminalNode(state.grammar, ch, source));
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

pexprs.end.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (inputStream.atEnd()) {
    var source = inputStream.interval(inputStream.pos);
    state.bindings.push(new TerminalNode(state.grammar, undefined, source));
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

pexprs.Terminal.prototype.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (!inputStream.matchString(this.obj)) {
    state.processFailure(origPos, this);
    return false;
  } else {
    var source = inputStream.interval(origPos);
    var primitiveValue = this.obj;
    state.bindings.push(new TerminalNode(state.grammar, primitiveValue, source));
    return true;
  }
};

pexprs.Range.prototype.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var ch = inputStream.next();
  if (ch && this.from <= ch && ch <= this.to) {
    var source = inputStream.interval(origPos);
    state.bindings.push(new TerminalNode(state.grammar, ch, source));
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

pexprs.Param.prototype.eval = function(state) {
  return state.eval(state.currentApplication().args[this.index]);
};

pexprs.Lex.prototype.eval = function(state) {
  state.enterLexifiedContext();
  var ans = state.eval(this.expr);
  state.exitLexifiedContext();
  return ans;
};

pexprs.Alt.prototype.eval = function(state) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    if (state.eval(this.terms[idx])) {
      return true;
    }
  }
  return false;
};

pexprs.Seq.prototype.eval = function(state) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    var factor = this.factors[idx];
    if (!state.eval(factor)) {
      return false;
    }
  }
  return true;
};

pexprs.Iter.prototype.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var arity = this.getArity();
  var cols = [];
  while (cols.length < arity) {
    cols.push([]);
  }
  var numMatches = 0;
  var idx;
  while (numMatches < this.maxNumMatches && state.eval(this.expr)) {
    numMatches++;
    var row = state.bindings.splice(state.bindings.length - arity, arity);
    for (idx = 0; idx < row.length; idx++) {
      cols[idx].push(row[idx]);
    }
  }
  if (numMatches < this.minNumMatches) {
    return false;
  }
  var source;
  if (numMatches === 0) {
    source = inputStream.interval(origPos, origPos);
  } else {
    var firstCol = cols[0];
    var lastCol = cols[cols.length - 1];
    source = inputStream.interval(
        firstCol[0].source.startIdx,
        lastCol[lastCol.length - 1].source.endIdx);
  }
  for (idx = 0; idx < cols.length; idx++) {
    state.bindings.push(new IterationNode(state.grammar, cols[idx], source,
      this instanceof pexprs.Opt));
  }
  return true;
};

pexprs.Not.prototype.eval = function(state) {
  /*
    TODO:
    - Right now we're just throwing away all of the failures that happen inside a `not`, and
      recording `this` as a failed expression.
    - Double negation should be equivalent to lookahead, but that's not the case right now wrt
      failures. E.g., ~~'foo' produces a failure for ~~'foo', but maybe it should produce
      a failure for 'foo' instead.
  */

  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var failuresInfo = state.getFailuresInfo();

  var ans = state.eval(this.expr);

  state.restoreFailuresInfo(failuresInfo);
  if (ans) {
    state.processFailure(origPos, this);
    return false;
  }

  inputStream.pos = origPos;
  return true;
};

pexprs.Lookahead.prototype.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  if (state.eval(this.expr)) {
    inputStream.pos = origPos;
    return true;
  } else {
    return false;
  }
};

pexprs.Apply.prototype.eval = function(state) {
  var caller = state.currentApplication();
  var actuals = caller ? caller.args : [];
  var app = this.substituteParams(actuals);

  var posInfo = state.getCurrentPosInfo();
  if (posInfo.isActive(app)) {
    // This rule is already active at this position, i.e., it is left-recursive.
    return app.handleCycle(state);
  }

  var memoKey = app.toMemoKey();
  var memoRec = posInfo.memo[memoKey];
  return memoRec && posInfo.shouldUseMemoizedResult(memoRec) ?
      state.useMemoizedResult(memoRec) :
      app.reallyEval(state);
};

pexprs.Apply.prototype.handleCycle = function(state) {
  var posInfo = state.getCurrentPosInfo();
  var currentLeftRecursion = posInfo.currentLeftRecursion;
  var memoKey = this.toMemoKey();
  var memoRec = posInfo.memo[memoKey];

  if (currentLeftRecursion && currentLeftRecursion.headApplication.toMemoKey() === memoKey) {
    // We already know about this left recursion, but it's possible there are "involved
    // applications" that we don't already know about, so...
    memoRec.updateInvolvedApplicationMemoKeys();
  } else if (!memoRec) {
    // New left recursion detected! Memoize a failure to try to get a seed parse.
    memoRec = posInfo.memo[memoKey] = {pos: -1, value: false};
    posInfo.startLeftRecursion(this, memoRec);
  }
  return state.useMemoizedResult(memoRec);
};

pexprs.Apply.prototype.reallyEval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var origPosInfo = state.getCurrentPosInfo();
  var ruleInfo = state.grammar.rules[this.ruleName];
  var body = ruleInfo.body;
  var description = ruleInfo.description;

  origPosInfo.enter(this);

  var origFailuresInfo;
  if (description) {
    origFailuresInfo = state.getFailuresInfo();
  }

  var value = this.evalOnce(body, state);
  var currentLR = origPosInfo.currentLeftRecursion;
  var memoKey = this.toMemoKey();
  var isHeadOfLeftRecursion = !!currentLR && currentLR.headApplication.toMemoKey() === memoKey;
  var memoized = true;

  if (isHeadOfLeftRecursion) {
    value = this.growSeedResult(body, state, origPos, currentLR, value);
    origPosInfo.endLeftRecursion();
  } else if (currentLR && currentLR.isInvolved(memoKey)) {
    // Don't memoize the result
    memoized = false;
  } else {
    origPosInfo.memo[memoKey] = {
      pos: inputStream.pos,
      value: value,
      failuresAtRightmostPosition: state.cloneRightmostFailures()
    };
  }

  if (description) {
    state.restoreFailuresInfo(origFailuresInfo);
    if (!value) {
      state.processFailure(origPos, this);
    }

    if (memoized) {
      origPosInfo.memo[memoKey].failuresAtRightmostPosition = state.cloneRightmostFailures();
    }
  }

  // Record trace information in the memo table, so that it is available if the memoized result
  // is used later.
  if (state.isTracing() && origPosInfo.memo[memoKey]) {
    var succeeded = !!value;
    var entry = state.getTraceEntry(origPos, this, succeeded, succeeded ? [value] : []);
    if (isHeadOfLeftRecursion) {
      common.assert(entry.terminatingLREntry != null || !succeeded);
      entry.isHeadOfLeftRecursion = true;
    }
    origPosInfo.memo[memoKey].traceEntry = entry;
  }

  origPosInfo.exit();

  if (value) {
    state.bindings.push(value);
    return true;
  } else {
    return false;
  }
};

pexprs.Apply.prototype.evalOnce = function(expr, state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;

  if (state.eval(expr)) {
    var arity = expr.getArity();
    var bindings = state.bindings.splice(state.bindings.length - arity, arity);
    var ans =
        new NonterminalNode(state.grammar, this.ruleName, bindings, inputStream.interval(origPos));
    return ans;
  } else {
    return false;
  }
};

pexprs.Apply.prototype.growSeedResult = function(body, state, origPos, lrMemoRec, newValue) {
  if (!newValue) {
    return false;
  }

  var inputStream = state.inputStream;

  while (true) {
    lrMemoRec.pos = inputStream.pos;
    lrMemoRec.value = newValue;
    lrMemoRec.failuresAtRightmostPosition = state.cloneRightmostFailures();

    if (state.isTracing()) {
      // Before evaluating the body again, add a trace node for this application to the memo entry.
      // Its only child is a copy of the trace node from `newValue`, which will always be the last
      // element in `state.trace`.
      var seedTrace = state.trace[state.trace.length - 1];
      lrMemoRec.traceEntry = new Trace(
          state.inputStream, origPos, this, true, [newValue], [seedTrace.clone()]);
    }
    inputStream.pos = origPos;
    newValue = this.evalOnce(body, state);
    if (inputStream.pos <= lrMemoRec.pos) {
      break;
    }
    if (state.isTracing()) {
      state.trace.splice(-2, 1);  // Drop the trace for the old seed.
    }
  }
  if (state.isTracing()) {
    // The last entry is for an unused result -- pop it and save it in the "real" entry.
    lrMemoRec.traceEntry.recordLRTermination(state.trace.pop(), newValue);
  }
  inputStream.pos = lrMemoRec.pos;
  return lrMemoRec.value;
};

pexprs.UnicodeChar.prototype.eval = function(state) {
  var inputStream = state.inputStream;
  var origPos = inputStream.pos;
  var ch = inputStream.next();
  if (ch && this.pattern.test(ch)) {
    var source = inputStream.interval(origPos);
    state.bindings.push(new TerminalNode(state.grammar, ch, source));
    return true;
  } else {
    state.processFailure(origPos, this);
    return false;
  }
};

},{"./Trace":38,"./common":40,"./nodes":43,"./pexprs":61}],51:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------

function flatten(listOfLists) {
  return Array.prototype.concat.apply([], listOfLists);
}

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.generateExample = common.abstract('generateExample');

pexprs.any.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  return {value: String.fromCharCode(Math.floor(Math.random() * 255))};
};

function categorizeExamples(examples) {
  // A list of rules that the system needs examples of, in order to generate an example
  //   for the current rule
  var examplesNeeded = examples.filter(function(example) {
    return example.hasOwnProperty('examplesNeeded');
  })
  .map(function(example) { return example.examplesNeeded; });

  examplesNeeded = flatten(examplesNeeded);

  var uniqueExamplesNeeded = {};
  for (var i = 0; i < examplesNeeded.length; i++) {
    var currentExampleNeeded = examplesNeeded[i];
    uniqueExamplesNeeded[currentExampleNeeded] = true;
  }
  examplesNeeded = Object.keys(uniqueExamplesNeeded);

  // A list of successfully generated examples
  var successfulExamples = examples.filter(function(example) {
    return example.hasOwnProperty('value');
  })
  .map(function(item) { return item.value; });

  // This flag returns true if the system cannot generate the rule it is currently
  //   attempting to generate, regardless of whether or not it has the examples it needs.
  //   Currently, this is only used in overriding generators to prevent the system from
  //   generating examples for certain rules (e.g. 'ident').
  var needHelp = examples.some(function(item) { return item.needHelp; });

  return {
    examplesNeeded: examplesNeeded,
    successfulExamples: successfulExamples,
    needHelp: needHelp
  };
}

pexprs.Alt.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  // items -> termExamples
  var termExamples = this.terms.map(function(term) {
    return term.generateExample(grammar, examples, inSyntacticContext, actuals);
  });

  var categorizedExamples = categorizeExamples(termExamples);

  var examplesNeeded = categorizedExamples.examplesNeeded;
  var successfulExamples = categorizedExamples.successfulExamples;
  var needHelp = categorizedExamples.needHelp;

  var ans = {};

  // Alt can contain both an example and a request for examples
  if (successfulExamples.length > 0) {
    var i = Math.floor(Math.random() * successfulExamples.length);
    ans.value = successfulExamples[i];
  }
  if (examplesNeeded.length > 0) {
    ans.examplesNeeded = examplesNeeded;
  }
  ans.needHelp = needHelp;

  return ans;
};

pexprs.Seq.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  var factorExamples = this.factors.map(function(factor) {
    return factor.generateExample(grammar, examples, inSyntacticContext, actuals);
  });
  var categorizedExamples = categorizeExamples(factorExamples);

  var examplesNeeded = categorizedExamples.examplesNeeded;
  var successfulExamples = categorizedExamples.successfulExamples;
  var needHelp = categorizedExamples.needHelp;

  var ans = {};

  // In a Seq, all pieces must succeed in order to have a successful example.
  if (examplesNeeded.length > 0 || needHelp) {
    ans.examplesNeeded = examplesNeeded;
    ans.needHelp = needHelp;
  } else {
    ans.value = successfulExamples.join(inSyntacticContext ? ' ' : '');
  }

  return ans;
};

pexprs.Apply.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  var ans = {};

  var ruleName = this.substituteParams(actuals).toString();

  if (!examples.hasOwnProperty(ruleName)) {
    ans.examplesNeeded = [ruleName];
  } else {
    var relevantExamples = examples[ruleName];
    var i = Math.floor(Math.random() * relevantExamples.length);
    ans.value = relevantExamples[i];
  }

  return ans;
};

// Assumes that terminal's object is always a string
pexprs.Terminal.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
  return {value: this.obj};
};

pexprs.Range.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
  var rangeSize = this.to.charCodeAt(0) - this.from.charCodeAt(0);
  return {value: String.fromCharCode(
    this.from.charCodeAt(0) + Math.floor(rangeSize * Math.random())
  )};
};

// TODO: make 'Not' and 'Lookahead' behaviour smarter
// Right now, 'Not' and 'Lookahead' generate nothing and assume that whatever follows will
//   work according to the encoded constraints.
pexprs.Not.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
  return {value: ''};
};

pexprs.Lookahead.prototype.generateExample = function(grammar, examples, inSyntacticContext) {
  return {value: ''};
};

pexprs.Param.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  return actuals[this.index].generateExample(grammar, examples, inSyntacticContext, actuals);
};

function generateNExamples(pexpr, grammar, examples, inSyntacticContext, actuals, numTimes) {
  var items = [];

  for (var i = 0; i < numTimes; i++) {
    items.push(pexpr.expr.generateExample(grammar, examples, inSyntacticContext, actuals));
  }

  var categorizedExamples = categorizeExamples(items);

  var examplesNeeded = categorizedExamples.examplesNeeded;
  var successfulExamples = categorizedExamples.successfulExamples;

  var ans = {};

  // It's always either one or the other.
  // TODO: instead of ' ', call 'spaces.generateExample()'
  ans.value = successfulExamples.join(inSyntacticContext ? ' ' : '');
  if (examplesNeeded.length > 0) {
    ans.examplesNeeded = examplesNeeded;
  }

  return ans;
}

pexprs.Star.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  return generateNExamples(this, grammar, examples, inSyntacticContext, actuals,
                           Math.floor(Math.random() * 4));
};

pexprs.Plus.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  return generateNExamples(this, grammar, examples, inSyntacticContext, actuals,
                           Math.floor(Math.random() * 3 + 1));
};

pexprs.Opt.prototype.generateExample = function(grammar, examples, inSyntacticContext, actuals) {
  return generateNExamples(this, grammar, examples, inSyntacticContext, actuals,
                           Math.floor(Math.random() * 2));
};

pexprs.UnicodeChar.prototype.generateExample = function(
    grammar, examples, inSyntacticContext, actuals) {
  var char;
  switch (this.category) {
    case 'Lu': char = 'Á'; break;
    case 'Ll': char = 'ŏ'; break;
    case 'Lt': char = 'ǅ'; break;
    case 'Lm': char = 'ˮ'; break;
    case 'Lo': char = 'ƻ'; break;

    case 'Nl': char = 'ↂ'; break;
    case 'Nd': char = '½'; break;

    case 'Mn': char = '\u0487'; break;
    case 'Mc': char = 'ि'; break;

    case 'Pc': char = '⁀'; break;

    case 'Zs': char = '\u2001'; break;

    case 'L': char = 'Á'; break;
    case 'Ltmo': char = 'ǅ'; break;
  }
  return {value: char}; // 💩
};

},{"./common":40,"./pexprs":61}],52:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var PExpr = require('./pexprs').PExpr;
var pexprVisitors = require('./pexpr-visitors');

// --------------------------------------------------------------------
// Private Stuff
// --------------------------------------------------------------------

var actions = {
  Alt: function(terms) {
    // This is ok b/c all terms must have the same arity -- this property is
    // checked by the Grammar constructor.
    return terms.length === 0 ? 0 : terms[0].getArity();
  },
  Apply: function(args) {
    return 1;
  },
  Iter: function(expr) {
    return expr.getArity();
  },
  Not: function(expr) {
    return 0;
  },
  Seq: function(factors) {
    var arity = 0;
    for (var idx = 0; idx < factors.length; idx++) {
      arity += factors[idx].getArity();
    }
    return arity;
  }
};

actions.Extend = actions.Alt;

actions.Lookahead =
actions.Lex =
actions.Opt =
actions.Plus =
actions.Star = function(expr) {
  return expr.getArity();
};

actions.any =
actions.end =
actions.Terminal =
actions.Range =
actions.Param =
actions.UnicodeChar = function() {
  return 1;
};

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprVisitors.addOperation('getArity()', actions);

// For now, install getArity as a regular method on PExpr, so that other code
// does not need to be aware of pexprVisitors.
PExpr.prototype.getArity = function() {
  return pexprVisitors.wrap(this).getArity();
};

},{"./pexpr-visitors":44,"./pexprs":61}],53:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Called at grammar creation time to rewrite a rule body, replacing each reference to a formal
  parameter with a `Param` node. Returns a PExpr -- either a new one, or the original one if
  it was modified in place.
*/
pexprs.PExpr.prototype.introduceParams = common.abstract('introduceParams');

pexprs.any.introduceParams =
pexprs.end.introduceParams =
pexprs.Terminal.prototype.introduceParams =
pexprs.Range.prototype.introduceParams =
pexprs.Param.prototype.introduceParams =
pexprs.UnicodeChar.prototype.introduceParams = function(formals) {
  return this;
};

pexprs.Alt.prototype.introduceParams = function(formals) {
  this.terms.forEach(function(term, idx, terms) {
    terms[idx] = term.introduceParams(formals);
  });
  return this;
};

pexprs.Seq.prototype.introduceParams = function(formals) {
  this.factors.forEach(function(factor, idx, factors) {
    factors[idx] = factor.introduceParams(formals);
  });
  return this;
};

pexprs.Iter.prototype.introduceParams =
pexprs.Not.prototype.introduceParams =
pexprs.Lookahead.prototype.introduceParams =
pexprs.Lex.prototype.introduceParams = function(formals) {
  this.expr = this.expr.introduceParams(formals);
  return this;
};

pexprs.Apply.prototype.introduceParams = function(formals) {
  var index = formals.indexOf(this.ruleName);
  if (index >= 0) {
    if (this.args.length > 0) {
      // TODO: Should this be supported? See issue #64.
      throw new Error('Parameterized rules cannot be passed as arguments to another rule.');
    }
    return new pexprs.Param(index);
  } else {
    this.args.forEach(function(arg, idx, args) {
      args[idx] = arg.introduceParams(formals);
    });
    return this;
  }
};

},{"./common":40,"./pexprs":61}],54:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

// Returns `true` if this parsing expression may accept without consuming any input.
pexprs.PExpr.prototype.isNullable = function(grammar) {
  return this._isNullable(grammar, Object.create(null));
};

pexprs.PExpr.prototype._isNullable = common.abstract('_isNullable');

pexprs.any._isNullable =
pexprs.Range.prototype._isNullable =
pexprs.Param.prototype._isNullable =
pexprs.Plus.prototype._isNullable =
pexprs.UnicodeChar.prototype._isNullable = function(grammar, memo) {
  return false;
};

pexprs.end._isNullable = function(grammar, memo) {
  return true;
};

pexprs.Terminal.prototype._isNullable = function(grammar, memo) {
  if (typeof this.obj === 'string') {
    // This is an over-simplification: it's only correct if the input is a string. If it's an array
    // or an object, then the empty string parsing expression is not nullable.
    return this.obj === '';
  } else {
    return false;
  }
};

pexprs.Alt.prototype._isNullable = function(grammar, memo) {
  return this.terms.length === 0 ||
      this.terms.some(function(term) { return term._isNullable(grammar, memo); });
};

pexprs.Seq.prototype._isNullable = function(grammar, memo) {
  return this.factors.every(function(factor) { return factor._isNullable(grammar, memo); });
};

pexprs.Star.prototype._isNullable =
pexprs.Opt.prototype._isNullable =
pexprs.Not.prototype._isNullable =
pexprs.Lookahead.prototype._isNullable = function(grammar, memo) {
  return true;
};

pexprs.Lex.prototype._isNullable = function(grammar, memo) {
  return this.expr._isNullable(grammar, memo);
};

pexprs.Apply.prototype._isNullable = function(grammar, memo) {
  var key = this.toMemoKey();
  if (!Object.prototype.hasOwnProperty.call(memo, key)) {
    var body = grammar.rules[this.ruleName].body;
    var inlined = body.substituteParams(this.args);
    memo[key] = false;  // Prevent infinite recursion for recursive rules.
    memo[key] = inlined._isNullable(grammar, memo);
  }
  return memo[key];
};

},{"./common":40,"./pexprs":61}],55:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function getMetaInfo(expr, grammarInterval) {
  var metaInfo = {};
  if (expr.source && grammarInterval) {
    var adjusted = expr.source.relativeTo(grammarInterval);
    metaInfo.sourceInterval = [adjusted.startIdx, adjusted.endIdx];
  }
  return metaInfo;
}

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.outputRecipe = common.abstract('outputRecipe');

pexprs.any.outputRecipe = function(formals, grammarInterval) {
  return ['any', getMetaInfo(this, grammarInterval)];
};

pexprs.end.outputRecipe = function(formals, grammarInterval) {
  return ['end', getMetaInfo(this, grammarInterval)];
};

pexprs.Terminal.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'terminal',
    getMetaInfo(this, grammarInterval),
    this.obj
  ];
};

pexprs.Range.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'range',
    getMetaInfo(this, grammarInterval),
    this.from,
    this.to
  ];
};

pexprs.Param.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'param',
    getMetaInfo(this, grammarInterval),
    this.index
  ];
};

pexprs.Alt.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'alt',
    getMetaInfo(this, grammarInterval)
  ].concat(this.terms.map(function(term) {
    return term.outputRecipe(formals, grammarInterval);
  }));
};

pexprs.Extend.prototype.outputRecipe = function(formals, grammarInterval) {
  var extension = this.terms[0]; // [extension, orginal]
  return extension.outputRecipe(formals, grammarInterval);
};

pexprs.Seq.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'seq',
    getMetaInfo(this, grammarInterval)
  ].concat(this.factors.map(function(factor) {
    return factor.outputRecipe(formals, grammarInterval);
  }));
};

pexprs.Star.prototype.outputRecipe =
pexprs.Plus.prototype.outputRecipe =
pexprs.Opt.prototype.outputRecipe =
pexprs.Not.prototype.outputRecipe =
pexprs.Lookahead.prototype.outputRecipe =
pexprs.Lex.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    this.constructor.name.toLowerCase(),
    getMetaInfo(this, grammarInterval),
    this.expr.outputRecipe(formals, grammarInterval)
  ];
};

pexprs.Apply.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'app',
    getMetaInfo(this, grammarInterval),
    this.ruleName,
    this.args.map(function(arg) {
      return arg.outputRecipe(formals, grammarInterval);
    })
  ];
};

pexprs.UnicodeChar.prototype.outputRecipe = function(formals, grammarInterval) {
  return [
    'unicodeChar',
    getMetaInfo(this, grammarInterval),
    this.category
  ];
};

},{"./common":40,"./pexprs":61}],56:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Returns a PExpr that results from recursively replacing every formal parameter (i.e., instance
  of `Param`) inside this PExpr with its actual value from `actuals` (an Array).

  The receiver must not be modified; a new PExpr must be returned if any replacement is necessary.
*/
// function(actuals) { ... }
pexprs.PExpr.prototype.substituteParams = common.abstract('substituteParams');

pexprs.any.substituteParams =
pexprs.end.substituteParams =
pexprs.Terminal.prototype.substituteParams =
pexprs.Range.prototype.substituteParams =
pexprs.Terminal.prototype.substituteParams =
pexprs.UnicodeChar.prototype.substituteParams = function(actuals) {
  return this;
};

pexprs.Param.prototype.substituteParams = function(actuals) {
  return actuals[this.index];
};

pexprs.Alt.prototype.substituteParams = function(actuals) {
  return new pexprs.Alt(
      this.terms.map(function(term) { return term.substituteParams(actuals); }));
};

pexprs.Seq.prototype.substituteParams = function(actuals) {
  return new pexprs.Seq(
      this.factors.map(function(factor) { return factor.substituteParams(actuals); }));
};

pexprs.Iter.prototype.substituteParams =
pexprs.Not.prototype.substituteParams =
pexprs.Lookahead.prototype.substituteParams =
pexprs.Lex.prototype.substituteParams = function(actuals) {
  return new this.constructor(this.expr.substituteParams(actuals));
};

pexprs.Apply.prototype.substituteParams = function(actuals) {
  if (this.args.length === 0) {
    // Avoid making a copy of this application, as an optimization
    return this;
  } else {
    var args = this.args.map(function(arg) { return arg.substituteParams(actuals); });
    return new pexprs.Apply(this.ruleName, args);
  }
};

},{"./common":40,"./pexprs":61}],57:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

var copyWithoutDuplicates = common.copyWithoutDuplicates;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function isRestrictedJSIdentifier(str) {
  return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(str);
}

function resolveDuplicatedNames(argumentNameList) {
  // `count` is used to record the number of times each argument name occurs in the list,
  // this is useful for checking duplicated argument name. It maps argument names to ints.
  var count = Object.create(null);
  argumentNameList.forEach(function(argName) {
    count[argName] = (count[argName] || 0) + 1;
  });

  // Append subscripts ('_1', '_2', ...) to duplicate argument names.
  Object.keys(count).forEach(function(dupArgName) {
    if (count[dupArgName] <= 1) {
      return;
    }

    // This name shows up more than once, so add subscripts.
    var subscript = 1;
    argumentNameList.forEach(function(argName, idx) {
      if (argName === dupArgName) {
        argumentNameList[idx] = argName + '_' + subscript++;
      }
    });
  });
}

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  Returns a list of strings that will be used as the default argument names for its receiver
  (a pexpr) in a semantic action. This is used exclusively by the Semantics Editor.

  `firstArgIndex` is the 1-based index of the first argument name that will be generated for this
  pexpr. It enables us to name arguments positionally, e.g., if the second argument is a
  non-alphanumeric terminal like "+", it will be named '$2'.

  `noDupCheck` is true if the caller of `toArgumentNameList` is not a top level caller. It enables
  us to avoid nested duplication subscripts appending, e.g., '_1_1', '_1_2', by only checking
  duplicates at the top level.

  Here is a more elaborate example that illustrates how this method works:
  `(a "+" b).toArgumentNameList(1)` evaluates to `['a', '$2', 'b']` with the following recursive
  calls:

    (a).toArgumentNameList(1) -> ['a'],
    ("+").toArgumentNameList(2) -> ['$2'],
    (b).toArgumentNameList(3) -> ['b']

  Notes:
  * This method must only be called on well-formed expressions, e.g., the receiver must
    not have any Alt sub-expressions with inconsistent arities.
  * e.getArity() === e.toArgumentNameList(1).length
*/
// function(firstArgIndex, noDupCheck) { ... }
pexprs.PExpr.prototype.toArgumentNameList = common.abstract('toArgumentNameList');

pexprs.any.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ['any'];
};

pexprs.end.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ['end'];
};

pexprs.Terminal.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  if (typeof this.obj === 'string' && /^[_a-zA-Z0-9]+$/.test(this.obj)) {
    // If this terminal is a valid suffix for a JS identifier, just prepend it with '_'
    return ['_' + this.obj];
  } else {
    // Otherwise, name it positionally.
    return ['$' + firstArgIndex];
  }
};

pexprs.Range.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  var argName = this.from + '_to_' + this.to;
  // If the `argName` is not valid then try to prepend a `_`.
  if (!isRestrictedJSIdentifier(argName)) {
    argName = '_' + argName;
  }
  // If the `argName` still not valid after prepending a `_`, then name it positionally.
  if (!isRestrictedJSIdentifier(argName)) {
    argName = '$' + firstArgIndex;
  }
  return [argName];
};

pexprs.Alt.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  // `termArgNameLists` is an array of arrays where each row is the
  // argument name list that corresponds to a term in this alternation.
  var termArgNameLists = this.terms.map(function(term) {
    return term.toArgumentNameList(firstArgIndex, true);
  });

  var argumentNameList = [];
  var numArgs = termArgNameLists[0].length;
  for (var colIdx = 0; colIdx < numArgs; colIdx++) {
    var col = [];
    for (var rowIdx = 0; rowIdx < this.terms.length; rowIdx++) {
      col.push(termArgNameLists[rowIdx][colIdx]);
    }
    var uniqueNames = copyWithoutDuplicates(col);
    argumentNameList.push(uniqueNames.join('_or_'));
  }

  if (!noDupCheck) {
    resolveDuplicatedNames(argumentNameList);
  }
  return argumentNameList;
};

pexprs.Seq.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  // Generate the argument name list, without worrying about duplicates.
  var argumentNameList = [];
  this.factors.forEach(function(factor) {
    var factorArgumentNameList = factor.toArgumentNameList(firstArgIndex, true);
    argumentNameList = argumentNameList.concat(factorArgumentNameList);

    // Shift the firstArgIndex to take this factor's argument names into account.
    firstArgIndex += factorArgumentNameList.length;
  });
  if (!noDupCheck) {
    resolveDuplicatedNames(argumentNameList);
  }
  return argumentNameList;
};

pexprs.Iter.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  var argumentNameList = this.expr.toArgumentNameList(firstArgIndex, noDupCheck)
    .map(function(exprArgumentString) {
      return exprArgumentString[exprArgumentString.length - 1] === 's' ?
          exprArgumentString + 'es' :
          exprArgumentString + 's';
    });
  if (!noDupCheck) {
    resolveDuplicatedNames(argumentNameList);
  }
  return argumentNameList;
};

pexprs.Opt.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return this.expr.toArgumentNameList(firstArgIndex, noDupCheck).map(function(argName) {
    return 'opt' + argName[0].toUpperCase() + argName.slice(1);
  });
};

pexprs.Not.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return [];
};

pexprs.Lookahead.prototype.toArgumentNameList =
pexprs.Lex.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return this.expr.toArgumentNameList(firstArgIndex, noDupCheck);
};

pexprs.Apply.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return [this.ruleName];
};

pexprs.UnicodeChar.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ['$' + firstArgIndex];
};

pexprs.Param.prototype.toArgumentNameList = function(firstArgIndex, noDupCheck) {
  return ['param' + this.index];
};

// "Value pexprs" (Value, Str, Arr, Obj) are going away soon, so we don't worry about them here.

},{"./common":40,"./pexprs":61}],58:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

// Returns a string representing the PExpr, for use as a UI label, etc.
pexprs.PExpr.prototype.toDisplayString = common.abstract('toDisplayString');

pexprs.Alt.prototype.toDisplayString =
pexprs.Seq.prototype.toDisplayString =
pexprs.Iter.prototype.toDisplayString =
pexprs.Not.prototype.toDisplayString =
pexprs.Lookahead.prototype.toDisplayString =
pexprs.Lex.prototype.toDisplayString = function() {
  if (this.source) {
    return this.source.trimmed().contents;
  }
  return '[' + this.constructor.name + ']';
};

pexprs.any.toDisplayString = function() {
  return 'any';
};

pexprs.end.toDisplayString = function() {
  return 'end';
};

pexprs.Terminal.prototype.toDisplayString = function() {
  return JSON.stringify(this.obj);
};

pexprs.Range.prototype.toDisplayString = function() {
  return JSON.stringify(this.from) + '..' + JSON.stringify(this.to);
};

pexprs.Param.prototype.toDisplayString = function() {
  return '#' + this.index;
};

pexprs.Apply.prototype.toDisplayString = function() {
  return this.toString();
};

pexprs.UnicodeChar.prototype.toDisplayString = function() {
  return 'Unicode {' + this.category + '} character';
};

},{"./common":40,"./pexprs":61}],59:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Failure = require('./Failure');
var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.toFailure = common.abstract('toFailure');

pexprs.any.toFailure = function(grammar) {
  return new Failure(this, 'any object', 'description');
};

pexprs.end.toFailure = function(grammar) {
  return new Failure(this, 'end of input', 'description');
};

pexprs.Terminal.prototype.toFailure = function(grammar) {
  return new Failure(this, this.obj, 'string');
};

pexprs.Range.prototype.toFailure = function(grammar) {
  // TODO: come up with something better
  return new Failure(this, JSON.stringify(this.from) + '..' + JSON.stringify(this.to), 'code');
};

pexprs.Not.prototype.toFailure = function(grammar) {
  var description = this.expr === pexprs.any ?
      'nothing' :
      'not ' + this.expr.toFailure(grammar);
  return new Failure(this, description, 'description');
};

pexprs.Lookahead.prototype.toFailure = function(grammar) {
  return this.expr.toFailure(grammar);
};

pexprs.Apply.prototype.toFailure = function(grammar) {
  var description = grammar.rules[this.ruleName].description;
  if (!description) {
    var article = (/^[aeiouAEIOU]/.test(this.ruleName) ? 'an' : 'a');
    description = article + ' ' + this.ruleName;
  }
  return new Failure(this, description, 'description');
};

pexprs.UnicodeChar.prototype.toFailure = function(grammar) {
  return new Failure(this, this.toDisplayString(), 'description');
};

pexprs.Alt.prototype.toFailure = function(grammar) {
  var fs = this.terms.map(function(t) { return t.toFailure(); });
  var description = '(' + fs.join(' or ') + ')';
  return new Failure(this, description, 'description');
};

pexprs.Seq.prototype.toFailure = function(grammar) {
  var fs = this.factors.map(function(f) { return f.toFailure(); });
  var description = '(' + fs.join(' ') + ')';
  return new Failure(this, description, 'description');
};

pexprs.Iter.prototype.toFailure = function(grammar) {
  var description = '(' + this.expr.toFailure() + this.operator + ')';
  return new Failure(this, description, 'description');
};

},{"./Failure":28,"./common":40,"./pexprs":61}],60:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');
var pexprs = require('./pexprs');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

/*
  e1.toString() === e2.toString() ==> e1 and e2 are semantically equivalent.
  Note that this is not an iff (<==>): e.g.,
  (~"b" "a").toString() !== ("a").toString(), even though
  ~"b" "a" and "a" are interchangeable in any grammar,
  both in terms of the languages they accept and their arities.
*/
pexprs.PExpr.prototype.toString = common.abstract('toString');

pexprs.any.toString = function() {
  return 'any';
};

pexprs.end.toString = function() {
  return 'end';
};

pexprs.Terminal.prototype.toString = function() {
  return JSON.stringify(this.obj);
};

pexprs.Range.prototype.toString = function() {
  return JSON.stringify(this.from) + '..' + JSON.stringify(this.to);
};

pexprs.Param.prototype.toString = function() {
  return '$' + this.index;
};

pexprs.Lex.prototype.toString = function() {
  return '#(' + this.expr.toString() + ')';
};

pexprs.Alt.prototype.toString = function() {
  return this.terms.length === 1 ?
    this.terms[0].toString() :
    '(' + this.terms.map(function(term) { return term.toString(); }).join(' | ') + ')';
};

pexprs.Seq.prototype.toString = function() {
  return this.factors.length === 1 ?
    this.factors[0].toString() :
    '(' + this.factors.map(function(factor) { return factor.toString(); }).join(' ') + ')';
};

pexprs.Iter.prototype.toString = function() {
  return this.expr + this.operator;
};

pexprs.Not.prototype.toString = function() {
  return '~' + this.expr;
};

pexprs.Lookahead.prototype.toString = function() {
  return '&' + this.expr;
};

pexprs.Apply.prototype.toString = function() {
  if (this.args.length > 0) {
    var ps = this.args.map(function(arg) { return arg.toString(); });
    return this.ruleName + '<' + ps.join(',') + '>';
  } else {
    return this.ruleName;
  }
};

pexprs.UnicodeChar.prototype.toString = function() {
  return '\\p{' + this.category + '}';
};

},{"./common":40,"./pexprs":61}],61:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var UnicodeCategories = require('../third_party/UnicodeCategories');
var common = require('./common');
var errors = require('./errors');
var inherits = require('inherits');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// General stuff

function PExpr() {
  throw new Error("PExpr cannot be instantiated -- it's abstract");
}

// Set the `source` property to the interval containing the source for this expression.
PExpr.prototype.withSource = function(interval) {
  if (interval) {
    this.source = interval.trimmed();
  }
  return this;
};

// Any

var any = Object.create(PExpr.prototype);

// End

var end = Object.create(PExpr.prototype);

// Terminals

function Terminal(obj) {
  this.obj = obj;
}
inherits(Terminal, PExpr);

// Ranges

function Range(from, to) {
  this.from = from;
  this.to = to;
}
inherits(Range, PExpr);

// Parameters

function Param(index) {
  this.index = index;
}
inherits(Param, PExpr);

// Alternation

function Alt(terms) {
  this.terms = terms;
}
inherits(Alt, PExpr);

// Extend is an implementation detail of rule extension

function Extend(superGrammar, name, body) {
  this.superGrammar = superGrammar;
  this.name = name;
  this.body = body;
  var origBody = superGrammar.rules[name].body;
  this.terms = [body, origBody];
}
inherits(Extend, Alt);

// Sequences

function Seq(factors) {
  this.factors = factors;
}
inherits(Seq, PExpr);

// Iterators and optionals

function Iter(expr) {
  this.expr = expr;
}
inherits(Iter, PExpr);

function Star(expr) {
  this.expr = expr;
}
inherits(Star, Iter);

function Plus(expr) {
  this.expr = expr;
}
inherits(Plus, Iter);

function Opt(expr) {
  this.expr = expr;
}
inherits(Opt, Iter);

Star.prototype.operator = '*';
Plus.prototype.operator = '+';
Opt.prototype.operator = '?';

Star.prototype.minNumMatches = 0;
Plus.prototype.minNumMatches = 1;
Opt.prototype.minNumMatches = 0;

Star.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
Plus.prototype.maxNumMatches = Number.POSITIVE_INFINITY;
Opt.prototype.maxNumMatches = 1;

// Predicates

function Not(expr) {
  this.expr = expr;
}
inherits(Not, PExpr);

function Lookahead(expr) {
  this.expr = expr;
}
inherits(Lookahead, PExpr);

// "Lexification"

function Lex(expr) {
  this.expr = expr;
}
inherits(Lex, PExpr);

// Array decomposition

function Arr(expr) {
  this.expr = expr;
}
inherits(Arr, PExpr);

// String decomposition

function Str(expr) {
  this.expr = expr;
}
inherits(Str, PExpr);

// Object decomposition

function Obj(properties, isLenient) {
  var names = properties.map(function(property) { return property.name; });
  var duplicates = common.getDuplicates(names);
  if (duplicates.length > 0) {
    throw errors.duplicatePropertyNames(duplicates);
  } else {
    this.properties = properties;
    this.isLenient = isLenient;
  }
}
inherits(Obj, PExpr);

// Rule application

function Apply(ruleName, optArgs) {
  this.ruleName = ruleName;
  this.args = optArgs || [];
}
inherits(Apply, PExpr);

Apply.prototype.isSyntactic = function() {
  return common.isSyntactic(this.ruleName);
};

// This method just caches the result of `this.toString()` in a non-enumerable property.
Apply.prototype.toMemoKey = function() {
  if (!this._memoKey) {
    Object.defineProperty(this, '_memoKey', {value: this.toString()});
  }
  return this._memoKey;
};

// Unicode character

function UnicodeChar(category) {
  this.category = category;
  this.pattern = UnicodeCategories[category];
}
inherits(UnicodeChar, PExpr);

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.PExpr = PExpr;
exports.any = any;
exports.end = end;
exports.Terminal = Terminal;
exports.Range = Range;
exports.Param = Param;
exports.Alt = Alt;
exports.Extend = Extend;
exports.Seq = Seq;
exports.Iter = Iter;
exports.Star = Star;
exports.Plus = Plus;
exports.Opt = Opt;
exports.Not = Not;
exports.Lookahead = Lookahead;
exports.Lex = Lex;
exports.Arr = Arr;
exports.Str = Str;
exports.Obj = Obj;
exports.Apply = Apply;
exports.UnicodeChar = UnicodeChar;

// --------------------------------------------------------------------
// Extensions
// --------------------------------------------------------------------

require('./pexprs-allowsSkippingPrecedingSpace');
require('./pexprs-assertAllApplicationsAreValid');
require('./pexprs-assertChoicesHaveUniformArity');
require('./pexprs-assertIteratedExprsAreNotNullable');
require('./pexprs-check');
require('./pexprs-eval');
require('./pexprs-getArity');
require('./pexprs-generateExample');
require('./pexprs-outputRecipe');
require('./pexprs-introduceParams');
require('./pexprs-isNullable');
require('./pexprs-substituteParams');
require('./pexprs-toDisplayString');
require('./pexprs-toArgumentNameList');
require('./pexprs-toFailure');
require('./pexprs-toString');

},{"../third_party/UnicodeCategories":63,"./common":40,"./errors":41,"./pexprs-allowsSkippingPrecedingSpace":45,"./pexprs-assertAllApplicationsAreValid":46,"./pexprs-assertChoicesHaveUniformArity":47,"./pexprs-assertIteratedExprsAreNotNullable":48,"./pexprs-check":49,"./pexprs-eval":50,"./pexprs-generateExample":51,"./pexprs-getArity":52,"./pexprs-introduceParams":53,"./pexprs-isNullable":54,"./pexprs-outputRecipe":55,"./pexprs-substituteParams":56,"./pexprs-toArgumentNameList":57,"./pexprs-toDisplayString":58,"./pexprs-toFailure":59,"./pexprs-toString":60,"inherits":24}],62:[function(require,module,exports){
'use strict';

// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = require('./common');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// Given an array of numbers `arr`, return an array of the numbers as strings,
// right-justified and padded to the same length.
function padNumbersToEqualLength(arr) {
  var maxLen = 0;
  var strings = arr.map(function(n) {
    var str = n.toString();
    maxLen = Math.max(maxLen, str.length);
    return str;
  });
  return strings.map(function(s) { return common.padLeft(s, maxLen); });
}

// Produce a new string that would be the result of copying the contents
// of the string `src` onto `dest` at offset `offest`.
function strcpy(dest, src, offset) {
  var origDestLen = dest.length;
  var start = dest.slice(0, offset);
  var end = dest.slice(offset + src.length);
  return (start + src + end).substr(0, origDestLen);
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

// Return an object with the line and column information for the given
// offset in `str`.
exports.getLineAndColumn = function(str, offset) {
  var lineNum = 1;
  var colNum = 1;

  var currOffset = 0;
  var lineStartOffset = 0;

  var nextLine = null;
  var prevLine = null;
  var prevLineStartOffset = -1;

  while (currOffset < offset) {
    var c = str.charAt(currOffset++);
    if (c === '\n') {
      lineNum++;
      colNum = 1;
      prevLineStartOffset = lineStartOffset;
      lineStartOffset = currOffset;
    } else if (c !== '\r') {
      colNum++;
    }
  }

  // Find the end of the target line.
  var lineEndOffset = str.indexOf('\n', lineStartOffset);
  if (lineEndOffset === -1) {
    lineEndOffset = str.length;
  } else {
    // Get the next line.
    var nextLineEndOffset = str.indexOf('\n', lineEndOffset + 1);
    nextLine = nextLineEndOffset === -1 ? str.slice(lineEndOffset)
                                        : str.slice(lineEndOffset, nextLineEndOffset);
    // Strip leading and trailing EOL char(s).
    nextLine = nextLine.replace(/^\r?\n/, '').replace(/\r$/, '');
  }

  // Get the previous line.
  if (prevLineStartOffset >= 0) {
    prevLine = str.slice(prevLineStartOffset, lineStartOffset)
                  .replace(/\r?\n$/, '');  // Strip trailing EOL char(s).
  }

  // Get the target line, stripping a trailing carriage return if necessary.
  var line = str.slice(lineStartOffset, lineEndOffset).replace(/\r$/, '');

  return {
    lineNum: lineNum,
    colNum: colNum,
    line: line,
    prevLine: prevLine,
    nextLine: nextLine
  };
};

// Return a nicely-formatted string describing the line and column for the
// given offset in `str`.
exports.getLineAndColumnMessage = function(str, offset /* ...ranges */) {
  var repeatStr = common.repeatStr;

  var lineAndCol = exports.getLineAndColumn(str, offset);
  var sb = new common.StringBuffer();
  sb.append('Line ' + lineAndCol.lineNum + ', col ' + lineAndCol.colNum + ':\n');

  // An array of the previous, current, and next line numbers as strings of equal length.
  var lineNumbers = padNumbersToEqualLength([
    lineAndCol.prevLine == null ? 0 : lineAndCol.lineNum - 1,
    lineAndCol.lineNum,
    lineAndCol.nextLine == null ? 0 : lineAndCol.lineNum + 1
  ]);

  // Helper for appending formatting input lines to the buffer.
  function appendLine(num, content, prefix) {
    sb.append(prefix + lineNumbers[num] + ' | ' + content + '\n');
  }

  // Include the previous line for context if possible.
  if (lineAndCol.prevLine != null) {
    appendLine(0, lineAndCol.prevLine, '  ');
  }
  // Line that the error occurred on.
  appendLine(1, lineAndCol.line, '> ');

  // Build up the line that points to the offset and possible indicates one or more ranges.
  // Start with a blank line, and indicate each range by overlaying a string of `~` chars.
  var lineLen = lineAndCol.line.length;
  var indicationLine = repeatStr(' ', lineLen + 1);
  var ranges = Array.prototype.slice.call(arguments, 2);
  for (var i = 0; i < ranges.length; ++i) {
    var startIdx = ranges[i][0];
    var endIdx = ranges[i][1];
    common.assert(startIdx >= 0 && startIdx <= endIdx, 'range start must be >= 0 and <= end');

    var lineStartOffset = offset - lineAndCol.colNum + 1;
    startIdx = Math.max(0, startIdx - lineStartOffset);
    endIdx = Math.min(endIdx - lineStartOffset, lineLen);

    indicationLine = strcpy(indicationLine, repeatStr('~', endIdx - startIdx), startIdx);
  }
  var gutterWidth = 2 + lineNumbers[1].length + 3;
  sb.append(repeatStr(' ', gutterWidth));
  indicationLine = strcpy(indicationLine, '^', lineAndCol.colNum - 1);
  sb.append(indicationLine.replace(/ +$/, '') + '\n');

  // Include the next line for context if possible.
  if (lineAndCol.nextLine != null) {
    appendLine(2, lineAndCol.nextLine, '  ');
  }
  return sb.contents();
};

},{"./common":40}],63:[function(require,module,exports){
// Based on https://github.com/tvcutsem/es-lab/blob/master/src/parser/unicode.js.
// These are just categories that are used in ES5.
// The full list of Unicode categories is here: http://www.fileformat.info/info/unicode/category/index.htm.
module.exports = {
  // Letters
  Lu: /[\u0041-\u005A]|[\u00C0-\u00D6]|[\u00D8-\u00DE]|[\u0100-\u0100]|[\u0102-\u0102]|[\u0104-\u0104]|[\u0106-\u0106]|[\u0108-\u0108]|[\u010A-\u010A]|[\u010C-\u010C]|[\u010E-\u010E]|[\u0110-\u0110]|[\u0112-\u0112]|[\u0114-\u0114]|[\u0116-\u0116]|[\u0118-\u0118]|[\u011A-\u011A]|[\u011C-\u011C]|[\u011E-\u011E]|[\u0120-\u0120]|[\u0122-\u0122]|[\u0124-\u0124]|[\u0126-\u0126]|[\u0128-\u0128]|[\u012A-\u012A]|[\u012C-\u012C]|[\u012E-\u012E]|[\u0130-\u0130]|[\u0132-\u0132]|[\u0134-\u0134]|[\u0136-\u0136]|[\u0139-\u0139]|[\u013B-\u013B]|[\u013D-\u013D]|[\u013F-\u013F]|[\u0141-\u0141]|[\u0143-\u0143]|[\u0145-\u0145]|[\u0147-\u0147]|[\u014A-\u014A]|[\u014C-\u014C]|[\u014E-\u014E]|[\u0150-\u0150]|[\u0152-\u0152]|[\u0154-\u0154]|[\u0156-\u0156]|[\u0158-\u0158]|[\u015A-\u015A]|[\u015C-\u015C]|[\u015E-\u015E]|[\u0160-\u0160]|[\u0162-\u0162]|[\u0164-\u0164]|[\u0166-\u0166]|[\u0168-\u0168]|[\u016A-\u016A]|[\u016C-\u016C]|[\u016E-\u016E]|[\u0170-\u0170]|[\u0172-\u0172]|[\u0174-\u0174]|[\u0176-\u0176]|[\u0178-\u0179]|[\u017B-\u017B]|[\u017D-\u017D]|[\u0181-\u0182]|[\u0184-\u0184]|[\u0186-\u0187]|[\u0189-\u018B]|[\u018E-\u0191]|[\u0193-\u0194]|[\u0196-\u0198]|[\u019C-\u019D]|[\u019F-\u01A0]|[\u01A2-\u01A2]|[\u01A4-\u01A4]|[\u01A6-\u01A7]|[\u01A9-\u01A9]|[\u01AC-\u01AC]|[\u01AE-\u01AF]|[\u01B1-\u01B3]|[\u01B5-\u01B5]|[\u01B7-\u01B8]|[\u01BC-\u01BC]|[\u01C4-\u01C4]|[\u01C7-\u01C7]|[\u01CA-\u01CA]|[\u01CD-\u01CD]|[\u01CF-\u01CF]|[\u01D1-\u01D1]|[\u01D3-\u01D3]|[\u01D5-\u01D5]|[\u01D7-\u01D7]|[\u01D9-\u01D9]|[\u01DB-\u01DB]|[\u01DE-\u01DE]|[\u01E0-\u01E0]|[\u01E2-\u01E2]|[\u01E4-\u01E4]|[\u01E6-\u01E6]|[\u01E8-\u01E8]|[\u01EA-\u01EA]|[\u01EC-\u01EC]|[\u01EE-\u01EE]|[\u01F1-\u01F1]|[\u01F4-\u01F4]|[\u01FA-\u01FA]|[\u01FC-\u01FC]|[\u01FE-\u01FE]|[\u0200-\u0200]|[\u0202-\u0202]|[\u0204-\u0204]|[\u0206-\u0206]|[\u0208-\u0208]|[\u020A-\u020A]|[\u020C-\u020C]|[\u020E-\u020E]|[\u0210-\u0210]|[\u0212-\u0212]|[\u0214-\u0214]|[\u0216-\u0216]|[\u0386-\u0386]|[\u0388-\u038A]|[\u038C-\u038C]|[\u038E-\u038F]|[\u0391-\u03A1]|[\u03A3-\u03AB]|[\u03D2-\u03D4]|[\u03DA-\u03DA]|[\u03DC-\u03DC]|[\u03DE-\u03DE]|[\u03E0-\u03E0]|[\u03E2-\u03E2]|[\u03E4-\u03E4]|[\u03E6-\u03E6]|[\u03E8-\u03E8]|[\u03EA-\u03EA]|[\u03EC-\u03EC]|[\u03EE-\u03EE]|[\u0401-\u040C]|[\u040E-\u042F]|[\u0460-\u0460]|[\u0462-\u0462]|[\u0464-\u0464]|[\u0466-\u0466]|[\u0468-\u0468]|[\u046A-\u046A]|[\u046C-\u046C]|[\u046E-\u046E]|[\u0470-\u0470]|[\u0472-\u0472]|[\u0474-\u0474]|[\u0476-\u0476]|[\u0478-\u0478]|[\u047A-\u047A]|[\u047C-\u047C]|[\u047E-\u047E]|[\u0480-\u0480]|[\u0490-\u0490]|[\u0492-\u0492]|[\u0494-\u0494]|[\u0496-\u0496]|[\u0498-\u0498]|[\u049A-\u049A]|[\u049C-\u049C]|[\u049E-\u049E]|[\u04A0-\u04A0]|[\u04A2-\u04A2]|[\u04A4-\u04A4]|[\u04A6-\u04A6]|[\u04A8-\u04A8]|[\u04AA-\u04AA]|[\u04AC-\u04AC]|[\u04AE-\u04AE]|[\u04B0-\u04B0]|[\u04B2-\u04B2]|[\u04B4-\u04B4]|[\u04B6-\u04B6]|[\u04B8-\u04B8]|[\u04BA-\u04BA]|[\u04BC-\u04BC]|[\u04BE-\u04BE]|[\u04C1-\u04C1]|[\u04C3-\u04C3]|[\u04C7-\u04C7]|[\u04CB-\u04CB]|[\u04D0-\u04D0]|[\u04D2-\u04D2]|[\u04D4-\u04D4]|[\u04D6-\u04D6]|[\u04D8-\u04D8]|[\u04DA-\u04DA]|[\u04DC-\u04DC]|[\u04DE-\u04DE]|[\u04E0-\u04E0]|[\u04E2-\u04E2]|[\u04E4-\u04E4]|[\u04E6-\u04E6]|[\u04E8-\u04E8]|[\u04EA-\u04EA]|[\u04EE-\u04EE]|[\u04F0-\u04F0]|[\u04F2-\u04F2]|[\u04F4-\u04F4]|[\u04F8-\u04F8]|[\u0531-\u0556]|[\u10A0-\u10C5]|[\u1E00-\u1E00]|[\u1E02-\u1E02]|[\u1E04-\u1E04]|[\u1E06-\u1E06]|[\u1E08-\u1E08]|[\u1E0A-\u1E0A]|[\u1E0C-\u1E0C]|[\u1E0E-\u1E0E]|[\u1E10-\u1E10]|[\u1E12-\u1E12]|[\u1E14-\u1E14]|[\u1E16-\u1E16]|[\u1E18-\u1E18]|[\u1E1A-\u1E1A]|[\u1E1C-\u1E1C]|[\u1E1E-\u1E1E]|[\u1E20-\u1E20]|[\u1E22-\u1E22]|[\u1E24-\u1E24]|[\u1E26-\u1E26]|[\u1E28-\u1E28]|[\u1E2A-\u1E2A]|[\u1E2C-\u1E2C]|[\u1E2E-\u1E2E]|[\u1E30-\u1E30]|[\u1E32-\u1E32]|[\u1E34-\u1E34]|[\u1E36-\u1E36]|[\u1E38-\u1E38]|[\u1E3A-\u1E3A]|[\u1E3C-\u1E3C]|[\u1E3E-\u1E3E]|[\u1E40-\u1E40]|[\u1E42-\u1E42]|[\u1E44-\u1E44]|[\u1E46-\u1E46]|[\u1E48-\u1E48]|[\u1E4A-\u1E4A]|[\u1E4C-\u1E4C]|[\u1E4E-\u1E4E]|[\u1E50-\u1E50]|[\u1E52-\u1E52]|[\u1E54-\u1E54]|[\u1E56-\u1E56]|[\u1E58-\u1E58]|[\u1E5A-\u1E5A]|[\u1E5C-\u1E5C]|[\u1E5E-\u1E5E]|[\u1E60-\u1E60]|[\u1E62-\u1E62]|[\u1E64-\u1E64]|[\u1E66-\u1E66]|[\u1E68-\u1E68]|[\u1E6A-\u1E6A]|[\u1E6C-\u1E6C]|[\u1E6E-\u1E6E]|[\u1E70-\u1E70]|[\u1E72-\u1E72]|[\u1E74-\u1E74]|[\u1E76-\u1E76]|[\u1E78-\u1E78]|[\u1E7A-\u1E7A]|[\u1E7C-\u1E7C]|[\u1E7E-\u1E7E]|[\u1E80-\u1E80]|[\u1E82-\u1E82]|[\u1E84-\u1E84]|[\u1E86-\u1E86]|[\u1E88-\u1E88]|[\u1E8A-\u1E8A]|[\u1E8C-\u1E8C]|[\u1E8E-\u1E8E]|[\u1E90-\u1E90]|[\u1E92-\u1E92]|[\u1E94-\u1E94]|[\u1EA0-\u1EA0]|[\u1EA2-\u1EA2]|[\u1EA4-\u1EA4]|[\u1EA6-\u1EA6]|[\u1EA8-\u1EA8]|[\u1EAA-\u1EAA]|[\u1EAC-\u1EAC]|[\u1EAE-\u1EAE]|[\u1EB0-\u1EB0]|[\u1EB2-\u1EB2]|[\u1EB4-\u1EB4]|[\u1EB6-\u1EB6]|[\u1EB8-\u1EB8]|[\u1EBA-\u1EBA]|[\u1EBC-\u1EBC]|[\u1EBE-\u1EBE]|[\u1EC0-\u1EC0]|[\u1EC2-\u1EC2]|[\u1EC4-\u1EC4]|[\u1EC6-\u1EC6]|[\u1EC8-\u1EC8]|[\u1ECA-\u1ECA]|[\u1ECC-\u1ECC]|[\u1ECE-\u1ECE]|[\u1ED0-\u1ED0]|[\u1ED2-\u1ED2]|[\u1ED4-\u1ED4]|[\u1ED6-\u1ED6]|[\u1ED8-\u1ED8]|[\u1EDA-\u1EDA]|[\u1EDC-\u1EDC]|[\u1EDE-\u1EDE]|[\u1EE0-\u1EE0]|[\u1EE2-\u1EE2]|[\u1EE4-\u1EE4]|[\u1EE6-\u1EE6]|[\u1EE8-\u1EE8]|[\u1EEA-\u1EEA]|[\u1EEC-\u1EEC]|[\u1EEE-\u1EEE]|[\u1EF0-\u1EF0]|[\u1EF2-\u1EF2]|[\u1EF4-\u1EF4]|[\u1EF6-\u1EF6]|[\u1EF8-\u1EF8]|[\u1F08-\u1F0F]|[\u1F18-\u1F1D]|[\u1F28-\u1F2F]|[\u1F38-\u1F3F]|[\u1F48-\u1F4D]|[\u1F59-\u1F59]|[\u1F5B-\u1F5B]|[\u1F5D-\u1F5D]|[\u1F5F-\u1F5F]|[\u1F68-\u1F6F]|[\u1F88-\u1F8F]|[\u1F98-\u1F9F]|[\u1FA8-\u1FAF]|[\u1FB8-\u1FBC]|[\u1FC8-\u1FCC]|[\u1FD8-\u1FDB]|[\u1FE8-\u1FEC]|[\u1FF8-\u1FFC]|[\u2102-\u2102]|[\u2107-\u2107]|[\u210B-\u210D]|[\u2110-\u2112]|[\u2115-\u2115]|[\u2119-\u211D]|[\u2124-\u2124]|[\u2126-\u2126]|[\u2128-\u2128]|[\u212A-\u212D]|[\u2130-\u2131]|[\u2133-\u2133]|[\uFF21-\uFF3A]/,
  Ll: /[\u0061-\u007A]|[\u00AA-\u00AA]|[\u00B5-\u00B5]|[\u00BA-\u00BA]|[\u00DF-\u00F6]|[\u00F8-\u00FF]|[\u0101-\u0101]|[\u0103-\u0103]|[\u0105-\u0105]|[\u0107-\u0107]|[\u0109-\u0109]|[\u010B-\u010B]|[\u010D-\u010D]|[\u010F-\u010F]|[\u0111-\u0111]|[\u0113-\u0113]|[\u0115-\u0115]|[\u0117-\u0117]|[\u0119-\u0119]|[\u011B-\u011B]|[\u011D-\u011D]|[\u011F-\u011F]|[\u0121-\u0121]|[\u0123-\u0123]|[\u0125-\u0125]|[\u0127-\u0127]|[\u0129-\u0129]|[\u012B-\u012B]|[\u012D-\u012D]|[\u012F-\u012F]|[\u0131-\u0131]|[\u0133-\u0133]|[\u0135-\u0135]|[\u0137-\u0138]|[\u013A-\u013A]|[\u013C-\u013C]|[\u013E-\u013E]|[\u0140-\u0140]|[\u0142-\u0142]|[\u0144-\u0144]|[\u0146-\u0146]|[\u0148-\u0149]|[\u014B-\u014B]|[\u014D-\u014D]|[\u014F-\u014F]|[\u0151-\u0151]|[\u0153-\u0153]|[\u0155-\u0155]|[\u0157-\u0157]|[\u0159-\u0159]|[\u015B-\u015B]|[\u015D-\u015D]|[\u015F-\u015F]|[\u0161-\u0161]|[\u0163-\u0163]|[\u0165-\u0165]|[\u0167-\u0167]|[\u0169-\u0169]|[\u016B-\u016B]|[\u016D-\u016D]|[\u016F-\u016F]|[\u0171-\u0171]|[\u0173-\u0173]|[\u0175-\u0175]|[\u0177-\u0177]|[\u017A-\u017A]|[\u017C-\u017C]|[\u017E-\u0180]|[\u0183-\u0183]|[\u0185-\u0185]|[\u0188-\u0188]|[\u018C-\u018D]|[\u0192-\u0192]|[\u0195-\u0195]|[\u0199-\u019B]|[\u019E-\u019E]|[\u01A1-\u01A1]|[\u01A3-\u01A3]|[\u01A5-\u01A5]|[\u01A8-\u01A8]|[\u01AB-\u01AB]|[\u01AD-\u01AD]|[\u01B0-\u01B0]|[\u01B4-\u01B4]|[\u01B6-\u01B6]|[\u01B9-\u01BA]|[\u01BD-\u01BD]|[\u01C6-\u01C6]|[\u01C9-\u01C9]|[\u01CC-\u01CC]|[\u01CE-\u01CE]|[\u01D0-\u01D0]|[\u01D2-\u01D2]|[\u01D4-\u01D4]|[\u01D6-\u01D6]|[\u01D8-\u01D8]|[\u01DA-\u01DA]|[\u01DC-\u01DD]|[\u01DF-\u01DF]|[\u01E1-\u01E1]|[\u01E3-\u01E3]|[\u01E5-\u01E5]|[\u01E7-\u01E7]|[\u01E9-\u01E9]|[\u01EB-\u01EB]|[\u01ED-\u01ED]|[\u01EF-\u01F0]|[\u01F3-\u01F3]|[\u01F5-\u01F5]|[\u01FB-\u01FB]|[\u01FD-\u01FD]|[\u01FF-\u01FF]|[\u0201-\u0201]|[\u0203-\u0203]|[\u0205-\u0205]|[\u0207-\u0207]|[\u0209-\u0209]|[\u020B-\u020B]|[\u020D-\u020D]|[\u020F-\u020F]|[\u0211-\u0211]|[\u0213-\u0213]|[\u0215-\u0215]|[\u0217-\u0217]|[\u0250-\u02A8]|[\u0390-\u0390]|[\u03AC-\u03CE]|[\u03D0-\u03D1]|[\u03D5-\u03D6]|[\u03E3-\u03E3]|[\u03E5-\u03E5]|[\u03E7-\u03E7]|[\u03E9-\u03E9]|[\u03EB-\u03EB]|[\u03ED-\u03ED]|[\u03EF-\u03F2]|[\u0430-\u044F]|[\u0451-\u045C]|[\u045E-\u045F]|[\u0461-\u0461]|[\u0463-\u0463]|[\u0465-\u0465]|[\u0467-\u0467]|[\u0469-\u0469]|[\u046B-\u046B]|[\u046D-\u046D]|[\u046F-\u046F]|[\u0471-\u0471]|[\u0473-\u0473]|[\u0475-\u0475]|[\u0477-\u0477]|[\u0479-\u0479]|[\u047B-\u047B]|[\u047D-\u047D]|[\u047F-\u047F]|[\u0481-\u0481]|[\u0491-\u0491]|[\u0493-\u0493]|[\u0495-\u0495]|[\u0497-\u0497]|[\u0499-\u0499]|[\u049B-\u049B]|[\u049D-\u049D]|[\u049F-\u049F]|[\u04A1-\u04A1]|[\u04A3-\u04A3]|[\u04A5-\u04A5]|[\u04A7-\u04A7]|[\u04A9-\u04A9]|[\u04AB-\u04AB]|[\u04AD-\u04AD]|[\u04AF-\u04AF]|[\u04B1-\u04B1]|[\u04B3-\u04B3]|[\u04B5-\u04B5]|[\u04B7-\u04B7]|[\u04B9-\u04B9]|[\u04BB-\u04BB]|[\u04BD-\u04BD]|[\u04BF-\u04BF]|[\u04C2-\u04C2]|[\u04C4-\u04C4]|[\u04C8-\u04C8]|[\u04CC-\u04CC]|[\u04D1-\u04D1]|[\u04D3-\u04D3]|[\u04D5-\u04D5]|[\u04D7-\u04D7]|[\u04D9-\u04D9]|[\u04DB-\u04DB]|[\u04DD-\u04DD]|[\u04DF-\u04DF]|[\u04E1-\u04E1]|[\u04E3-\u04E3]|[\u04E5-\u04E5]|[\u04E7-\u04E7]|[\u04E9-\u04E9]|[\u04EB-\u04EB]|[\u04EF-\u04EF]|[\u04F1-\u04F1]|[\u04F3-\u04F3]|[\u04F5-\u04F5]|[\u04F9-\u04F9]|[\u0561-\u0587]|[\u10D0-\u10F6]|[\u1E01-\u1E01]|[\u1E03-\u1E03]|[\u1E05-\u1E05]|[\u1E07-\u1E07]|[\u1E09-\u1E09]|[\u1E0B-\u1E0B]|[\u1E0D-\u1E0D]|[\u1E0F-\u1E0F]|[\u1E11-\u1E11]|[\u1E13-\u1E13]|[\u1E15-\u1E15]|[\u1E17-\u1E17]|[\u1E19-\u1E19]|[\u1E1B-\u1E1B]|[\u1E1D-\u1E1D]|[\u1E1F-\u1E1F]|[\u1E21-\u1E21]|[\u1E23-\u1E23]|[\u1E25-\u1E25]|[\u1E27-\u1E27]|[\u1E29-\u1E29]|[\u1E2B-\u1E2B]|[\u1E2D-\u1E2D]|[\u1E2F-\u1E2F]|[\u1E31-\u1E31]|[\u1E33-\u1E33]|[\u1E35-\u1E35]|[\u1E37-\u1E37]|[\u1E39-\u1E39]|[\u1E3B-\u1E3B]|[\u1E3D-\u1E3D]|[\u1E3F-\u1E3F]|[\u1E41-\u1E41]|[\u1E43-\u1E43]|[\u1E45-\u1E45]|[\u1E47-\u1E47]|[\u1E49-\u1E49]|[\u1E4B-\u1E4B]|[\u1E4D-\u1E4D]|[\u1E4F-\u1E4F]|[\u1E51-\u1E51]|[\u1E53-\u1E53]|[\u1E55-\u1E55]|[\u1E57-\u1E57]|[\u1E59-\u1E59]|[\u1E5B-\u1E5B]|[\u1E5D-\u1E5D]|[\u1E5F-\u1E5F]|[\u1E61-\u1E61]|[\u1E63-\u1E63]|[\u1E65-\u1E65]|[\u1E67-\u1E67]|[\u1E69-\u1E69]|[\u1E6B-\u1E6B]|[\u1E6D-\u1E6D]|[\u1E6F-\u1E6F]|[\u1E71-\u1E71]|[\u1E73-\u1E73]|[\u1E75-\u1E75]|[\u1E77-\u1E77]|[\u1E79-\u1E79]|[\u1E7B-\u1E7B]|[\u1E7D-\u1E7D]|[\u1E7F-\u1E7F]|[\u1E81-\u1E81]|[\u1E83-\u1E83]|[\u1E85-\u1E85]|[\u1E87-\u1E87]|[\u1E89-\u1E89]|[\u1E8B-\u1E8B]|[\u1E8D-\u1E8D]|[\u1E8F-\u1E8F]|[\u1E91-\u1E91]|[\u1E93-\u1E93]|[\u1E95-\u1E9B]|[\u1EA1-\u1EA1]|[\u1EA3-\u1EA3]|[\u1EA5-\u1EA5]|[\u1EA7-\u1EA7]|[\u1EA9-\u1EA9]|[\u1EAB-\u1EAB]|[\u1EAD-\u1EAD]|[\u1EAF-\u1EAF]|[\u1EB1-\u1EB1]|[\u1EB3-\u1EB3]|[\u1EB5-\u1EB5]|[\u1EB7-\u1EB7]|[\u1EB9-\u1EB9]|[\u1EBB-\u1EBB]|[\u1EBD-\u1EBD]|[\u1EBF-\u1EBF]|[\u1EC1-\u1EC1]|[\u1EC3-\u1EC3]|[\u1EC5-\u1EC5]|[\u1EC7-\u1EC7]|[\u1EC9-\u1EC9]|[\u1ECB-\u1ECB]|[\u1ECD-\u1ECD]|[\u1ECF-\u1ECF]|[\u1ED1-\u1ED1]|[\u1ED3-\u1ED3]|[\u1ED5-\u1ED5]|[\u1ED7-\u1ED7]|[\u1ED9-\u1ED9]|[\u1EDB-\u1EDB]|[\u1EDD-\u1EDD]|[\u1EDF-\u1EDF]|[\u1EE1-\u1EE1]|[\u1EE3-\u1EE3]|[\u1EE5-\u1EE5]|[\u1EE7-\u1EE7]|[\u1EE9-\u1EE9]|[\u1EEB-\u1EEB]|[\u1EED-\u1EED]|[\u1EEF-\u1EEF]|[\u1EF1-\u1EF1]|[\u1EF3-\u1EF3]|[\u1EF5-\u1EF5]|[\u1EF7-\u1EF7]|[\u1EF9-\u1EF9]|[\u1F00-\u1F07]|[\u1F10-\u1F15]|[\u1F20-\u1F27]|[\u1F30-\u1F37]|[\u1F40-\u1F45]|[\u1F50-\u1F57]|[\u1F60-\u1F67]|[\u1F70-\u1F7D]|[\u1F80-\u1F87]|[\u1F90-\u1F97]|[\u1FA0-\u1FA7]|[\u1FB0-\u1FB4]|[\u1FB6-\u1FB7]|[\u1FBE-\u1FBE]|[\u1FC2-\u1FC4]|[\u1FC6-\u1FC7]|[\u1FD0-\u1FD3]|[\u1FD6-\u1FD7]|[\u1FE0-\u1FE7]|[\u1FF2-\u1FF4]|[\u1FF6-\u1FF7]|[\u207F-\u207F]|[\u210A-\u210A]|[\u210E-\u210F]|[\u2113-\u2113]|[\u2118-\u2118]|[\u212E-\u212F]|[\u2134-\u2134]|[\uFB00-\uFB06]|[\uFB13-\uFB17]|[\uFF41-\uFF5A]/,
  Lt: /[\u01C5-\u01C5]|[\u01C8-\u01C8]|[\u01CB-\u01CB]|[\u01F2-\u01F2]/,
  Lm: /[\u02B0-\u02B8]|[\u02BB-\u02C1]|[\u02D0-\u02D1]|[\u02E0-\u02E4]|[\u037A-\u037A]|[\u0559-\u0559]|[\u0640-\u0640]|[\u06E5-\u06E6]|[\u0E46-\u0E46]|[\u0EC6-\u0EC6]|[\u3005-\u3005]|[\u3031-\u3035]|[\u309D-\u309E]|[\u30FC-\u30FE]|[\uFF70-\uFF70]|[\uFF9E-\uFF9F]/,
  Lo: /[\u01AA-\u01AA]|[\u01BB-\u01BB]|[\u01BE-\u01C3]|[\u03F3-\u03F3]|[\u04C0-\u04C0]|[\u05D0-\u05EA]|[\u05F0-\u05F2]|[\u0621-\u063A]|[\u0641-\u064A]|[\u0671-\u06B7]|[\u06BA-\u06BE]|[\u06C0-\u06CE]|[\u06D0-\u06D3]|[\u06D5-\u06D5]|[\u0905-\u0939]|[\u093D-\u093D]|[\u0950-\u0950]|[\u0958-\u0961]|[\u0985-\u098C]|[\u098F-\u0990]|[\u0993-\u09A8]|[\u09AA-\u09B0]|[\u09B2-\u09B2]|[\u09B6-\u09B9]|[\u09DC-\u09DD]|[\u09DF-\u09E1]|[\u09F0-\u09F1]|[\u0A05-\u0A0A]|[\u0A0F-\u0A10]|[\u0A13-\u0A28]|[\u0A2A-\u0A30]|[\u0A32-\u0A33]|[\u0A35-\u0A36]|[\u0A38-\u0A39]|[\u0A59-\u0A5C]|[\u0A5E-\u0A5E]|[\u0A72-\u0A74]|[\u0A85-\u0A8B]|[\u0A8D-\u0A8D]|[\u0A8F-\u0A91]|[\u0A93-\u0AA8]|[\u0AAA-\u0AB0]|[\u0AB2-\u0AB3]|[\u0AB5-\u0AB9]|[\u0ABD-\u0ABD]|[\u0AD0-\u0AD0]|[\u0AE0-\u0AE0]|[\u0B05-\u0B0C]|[\u0B0F-\u0B10]|[\u0B13-\u0B28]|[\u0B2A-\u0B30]|[\u0B32-\u0B33]|[\u0B36-\u0B39]|[\u0B3D-\u0B3D]|[\u0B5C-\u0B5D]|[\u0B5F-\u0B61]|[\u0B85-\u0B8A]|[\u0B8E-\u0B90]|[\u0B92-\u0B95]|[\u0B99-\u0B9A]|[\u0B9C-\u0B9C]|[\u0B9E-\u0B9F]|[\u0BA3-\u0BA4]|[\u0BA8-\u0BAA]|[\u0BAE-\u0BB5]|[\u0BB7-\u0BB9]|[\u0C05-\u0C0C]|[\u0C0E-\u0C10]|[\u0C12-\u0C28]|[\u0C2A-\u0C33]|[\u0C35-\u0C39]|[\u0C60-\u0C61]|[\u0C85-\u0C8C]|[\u0C8E-\u0C90]|[\u0C92-\u0CA8]|[\u0CAA-\u0CB3]|[\u0CB5-\u0CB9]|[\u0CDE-\u0CDE]|[\u0CE0-\u0CE1]|[\u0D05-\u0D0C]|[\u0D0E-\u0D10]|[\u0D12-\u0D28]|[\u0D2A-\u0D39]|[\u0D60-\u0D61]|[\u0E01-\u0E30]|[\u0E32-\u0E33]|[\u0E40-\u0E45]|[\u0E81-\u0E82]|[\u0E84-\u0E84]|[\u0E87-\u0E88]|[\u0E8A-\u0E8A]|[\u0E8D-\u0E8D]|[\u0E94-\u0E97]|[\u0E99-\u0E9F]|[\u0EA1-\u0EA3]|[\u0EA5-\u0EA5]|[\u0EA7-\u0EA7]|[\u0EAA-\u0EAB]|[\u0EAD-\u0EB0]|[\u0EB2-\u0EB3]|[\u0EBD-\u0EBD]|[\u0EC0-\u0EC4]|[\u0EDC-\u0EDD]|[\u0F00-\u0F00]|[\u0F40-\u0F47]|[\u0F49-\u0F69]|[\u0F88-\u0F8B]|[\u1100-\u1159]|[\u115F-\u11A2]|[\u11A8-\u11F9]|[\u2135-\u2138]|[\u3006-\u3006]|[\u3041-\u3094]|[\u30A1-\u30FA]|[\u3105-\u312C]|[\u3131-\u318E]|[\u4E00-\u9FA5]|[\uAC00-\uD7A3]|[\uF900-\uFA2D]|[\uFB1F-\uFB28]|[\uFB2A-\uFB36]|[\uFB38-\uFB3C]|[\uFB3E-\uFB3E]|[\uFB40-\uFB41]|[\uFB43-\uFB44]|[\uFB46-\uFBB1]|[\uFBD3-\uFD3D]|[\uFD50-\uFD8F]|[\uFD92-\uFDC7]|[\uFDF0-\uFDFB]|[\uFE70-\uFE72]|[\uFE74-\uFE74]|[\uFE76-\uFEFC]|[\uFF66-\uFF6F]|[\uFF71-\uFF9D]|[\uFFA0-\uFFBE]|[\uFFC2-\uFFC7]|[\uFFCA-\uFFCF]|[\uFFD2-\uFFD7]|[\uFFDA-\uFFDC]/,

  // Numbers
  Nl: /[\u2160-\u2182]|[\u3007-\u3007]|[\u3021-\u3029]/,
  Nd: /[\u0030-\u0039]|[\u0660-\u0669]|[\u06F0-\u06F9]|[\u0966-\u096F]|[\u09E6-\u09EF]|[\u0A66-\u0A6F]|[\u0AE6-\u0AEF]|[\u0B66-\u0B6F]|[\u0BE7-\u0BEF]|[\u0C66-\u0C6F]|[\u0CE6-\u0CEF]|[\u0D66-\u0D6F]|[\u0E50-\u0E59]|[\u0ED0-\u0ED9]|[\u0F20-\u0F29]|[\uFF10-\uFF19]/,

  // Marks
  Mn: /[\u0300-\u0345]|[\u0360-\u0361]|[\u0483-\u0486]|[\u0591-\u05A1]|[\u05A3-\u05B9]|[\u05BB-\u05BD]|[\u05BF-\u05BF]|[\u05C1-\u05C2]|[\u05C4-\u05C4]|[\u064B-\u0652]|[\u0670-\u0670]|[\u06D6-\u06DC]|[\u06DF-\u06E4]|[\u06E7-\u06E8]|[\u06EA-\u06ED]|[\u0901-\u0902]|[\u093C-\u093C]|[\u0941-\u0948]|[\u094D-\u094D]|[\u0951-\u0954]|[\u0962-\u0963]|[\u0981-\u0981]|[\u09BC-\u09BC]|[\u09C1-\u09C4]|[\u09CD-\u09CD]|[\u09E2-\u09E3]|[\u0A02-\u0A02]|[\u0A3C-\u0A3C]|[\u0A41-\u0A42]|[\u0A47-\u0A48]|[\u0A4B-\u0A4D]|[\u0A70-\u0A71]|[\u0A81-\u0A82]|[\u0ABC-\u0ABC]|[\u0AC1-\u0AC5]|[\u0AC7-\u0AC8]|[\u0ACD-\u0ACD]|[\u0B01-\u0B01]|[\u0B3C-\u0B3C]|[\u0B3F-\u0B3F]|[\u0B41-\u0B43]|[\u0B4D-\u0B4D]|[\u0B56-\u0B56]|[\u0B82-\u0B82]|[\u0BC0-\u0BC0]|[\u0BCD-\u0BCD]|[\u0C3E-\u0C40]|[\u0C46-\u0C48]|[\u0C4A-\u0C4D]|[\u0C55-\u0C56]|[\u0CBF-\u0CBF]|[\u0CC6-\u0CC6]|[\u0CCC-\u0CCD]|[\u0D41-\u0D43]|[\u0D4D-\u0D4D]|[\u0E31-\u0E31]|[\u0E34-\u0E3A]|[\u0E47-\u0E4E]|[\u0EB1-\u0EB1]|[\u0EB4-\u0EB9]|[\u0EBB-\u0EBC]|[\u0EC8-\u0ECD]|[\u0F18-\u0F19]|[\u0F35-\u0F35]|[\u0F37-\u0F37]|[\u0F39-\u0F39]|[\u0F71-\u0F7E]|[\u0F80-\u0F84]|[\u0F86-\u0F87]|[\u0F90-\u0F95]|[\u0F97-\u0F97]|[\u0F99-\u0FAD]|[\u0FB1-\u0FB7]|[\u0FB9-\u0FB9]|[\u20D0-\u20DC]|[\u20E1-\u20E1]|[\u302A-\u302F]|[\u3099-\u309A]|[\uFB1E-\uFB1E]|[\uFE20-\uFE23]/,
  Mc: /[\u0903-\u0903]|[\u093E-\u0940]|[\u0949-\u094C]|[\u0982-\u0983]|[\u09BE-\u09C0]|[\u09C7-\u09C8]|[\u09CB-\u09CC]|[\u09D7-\u09D7]|[\u0A3E-\u0A40]|[\u0A83-\u0A83]|[\u0ABE-\u0AC0]|[\u0AC9-\u0AC9]|[\u0ACB-\u0ACC]|[\u0B02-\u0B03]|[\u0B3E-\u0B3E]|[\u0B40-\u0B40]|[\u0B47-\u0B48]|[\u0B4B-\u0B4C]|[\u0B57-\u0B57]|[\u0B83-\u0B83]|[\u0BBE-\u0BBF]|[\u0BC1-\u0BC2]|[\u0BC6-\u0BC8]|[\u0BCA-\u0BCC]|[\u0BD7-\u0BD7]|[\u0C01-\u0C03]|[\u0C41-\u0C44]|[\u0C82-\u0C83]|[\u0CBE-\u0CBE]|[\u0CC0-\u0CC4]|[\u0CC7-\u0CC8]|[\u0CCA-\u0CCB]|[\u0CD5-\u0CD6]|[\u0D02-\u0D03]|[\u0D3E-\u0D40]|[\u0D46-\u0D48]|[\u0D4A-\u0D4C]|[\u0D57-\u0D57]|[\u0F3E-\u0F3F]|[\u0F7F-\u0F7F]/,

  // Punctuation, Connector
  Pc: /[\u005F-\u005F]|[\u203F-\u2040]|[\u30FB-\u30FB]|[\uFE33-\uFE34]|[\uFE4D-\uFE4F]|[\uFF3F-\uFF3F]|[\uFF65-\uFF65]/,

  // Separator, Space
  Zs: /[\u2000-\u200B]|[\u3000-\u3000]/,

  // These two are not real Unicode categories, but our useful for Ohm.
  // L is a combination of all the letter categories.
  // Ltmo is a combination of Lt, Lm, and Lo.
  L: /[\u0041-\u005A]|[\u00C0-\u00D6]|[\u00D8-\u00DE]|[\u0100-\u0100]|[\u0102-\u0102]|[\u0104-\u0104]|[\u0106-\u0106]|[\u0108-\u0108]|[\u010A-\u010A]|[\u010C-\u010C]|[\u010E-\u010E]|[\u0110-\u0110]|[\u0112-\u0112]|[\u0114-\u0114]|[\u0116-\u0116]|[\u0118-\u0118]|[\u011A-\u011A]|[\u011C-\u011C]|[\u011E-\u011E]|[\u0120-\u0120]|[\u0122-\u0122]|[\u0124-\u0124]|[\u0126-\u0126]|[\u0128-\u0128]|[\u012A-\u012A]|[\u012C-\u012C]|[\u012E-\u012E]|[\u0130-\u0130]|[\u0132-\u0132]|[\u0134-\u0134]|[\u0136-\u0136]|[\u0139-\u0139]|[\u013B-\u013B]|[\u013D-\u013D]|[\u013F-\u013F]|[\u0141-\u0141]|[\u0143-\u0143]|[\u0145-\u0145]|[\u0147-\u0147]|[\u014A-\u014A]|[\u014C-\u014C]|[\u014E-\u014E]|[\u0150-\u0150]|[\u0152-\u0152]|[\u0154-\u0154]|[\u0156-\u0156]|[\u0158-\u0158]|[\u015A-\u015A]|[\u015C-\u015C]|[\u015E-\u015E]|[\u0160-\u0160]|[\u0162-\u0162]|[\u0164-\u0164]|[\u0166-\u0166]|[\u0168-\u0168]|[\u016A-\u016A]|[\u016C-\u016C]|[\u016E-\u016E]|[\u0170-\u0170]|[\u0172-\u0172]|[\u0174-\u0174]|[\u0176-\u0176]|[\u0178-\u0179]|[\u017B-\u017B]|[\u017D-\u017D]|[\u0181-\u0182]|[\u0184-\u0184]|[\u0186-\u0187]|[\u0189-\u018B]|[\u018E-\u0191]|[\u0193-\u0194]|[\u0196-\u0198]|[\u019C-\u019D]|[\u019F-\u01A0]|[\u01A2-\u01A2]|[\u01A4-\u01A4]|[\u01A6-\u01A7]|[\u01A9-\u01A9]|[\u01AC-\u01AC]|[\u01AE-\u01AF]|[\u01B1-\u01B3]|[\u01B5-\u01B5]|[\u01B7-\u01B8]|[\u01BC-\u01BC]|[\u01C4-\u01C4]|[\u01C7-\u01C7]|[\u01CA-\u01CA]|[\u01CD-\u01CD]|[\u01CF-\u01CF]|[\u01D1-\u01D1]|[\u01D3-\u01D3]|[\u01D5-\u01D5]|[\u01D7-\u01D7]|[\u01D9-\u01D9]|[\u01DB-\u01DB]|[\u01DE-\u01DE]|[\u01E0-\u01E0]|[\u01E2-\u01E2]|[\u01E4-\u01E4]|[\u01E6-\u01E6]|[\u01E8-\u01E8]|[\u01EA-\u01EA]|[\u01EC-\u01EC]|[\u01EE-\u01EE]|[\u01F1-\u01F1]|[\u01F4-\u01F4]|[\u01FA-\u01FA]|[\u01FC-\u01FC]|[\u01FE-\u01FE]|[\u0200-\u0200]|[\u0202-\u0202]|[\u0204-\u0204]|[\u0206-\u0206]|[\u0208-\u0208]|[\u020A-\u020A]|[\u020C-\u020C]|[\u020E-\u020E]|[\u0210-\u0210]|[\u0212-\u0212]|[\u0214-\u0214]|[\u0216-\u0216]|[\u0386-\u0386]|[\u0388-\u038A]|[\u038C-\u038C]|[\u038E-\u038F]|[\u0391-\u03A1]|[\u03A3-\u03AB]|[\u03D2-\u03D4]|[\u03DA-\u03DA]|[\u03DC-\u03DC]|[\u03DE-\u03DE]|[\u03E0-\u03E0]|[\u03E2-\u03E2]|[\u03E4-\u03E4]|[\u03E6-\u03E6]|[\u03E8-\u03E8]|[\u03EA-\u03EA]|[\u03EC-\u03EC]|[\u03EE-\u03EE]|[\u0401-\u040C]|[\u040E-\u042F]|[\u0460-\u0460]|[\u0462-\u0462]|[\u0464-\u0464]|[\u0466-\u0466]|[\u0468-\u0468]|[\u046A-\u046A]|[\u046C-\u046C]|[\u046E-\u046E]|[\u0470-\u0470]|[\u0472-\u0472]|[\u0474-\u0474]|[\u0476-\u0476]|[\u0478-\u0478]|[\u047A-\u047A]|[\u047C-\u047C]|[\u047E-\u047E]|[\u0480-\u0480]|[\u0490-\u0490]|[\u0492-\u0492]|[\u0494-\u0494]|[\u0496-\u0496]|[\u0498-\u0498]|[\u049A-\u049A]|[\u049C-\u049C]|[\u049E-\u049E]|[\u04A0-\u04A0]|[\u04A2-\u04A2]|[\u04A4-\u04A4]|[\u04A6-\u04A6]|[\u04A8-\u04A8]|[\u04AA-\u04AA]|[\u04AC-\u04AC]|[\u04AE-\u04AE]|[\u04B0-\u04B0]|[\u04B2-\u04B2]|[\u04B4-\u04B4]|[\u04B6-\u04B6]|[\u04B8-\u04B8]|[\u04BA-\u04BA]|[\u04BC-\u04BC]|[\u04BE-\u04BE]|[\u04C1-\u04C1]|[\u04C3-\u04C3]|[\u04C7-\u04C7]|[\u04CB-\u04CB]|[\u04D0-\u04D0]|[\u04D2-\u04D2]|[\u04D4-\u04D4]|[\u04D6-\u04D6]|[\u04D8-\u04D8]|[\u04DA-\u04DA]|[\u04DC-\u04DC]|[\u04DE-\u04DE]|[\u04E0-\u04E0]|[\u04E2-\u04E2]|[\u04E4-\u04E4]|[\u04E6-\u04E6]|[\u04E8-\u04E8]|[\u04EA-\u04EA]|[\u04EE-\u04EE]|[\u04F0-\u04F0]|[\u04F2-\u04F2]|[\u04F4-\u04F4]|[\u04F8-\u04F8]|[\u0531-\u0556]|[\u10A0-\u10C5]|[\u1E00-\u1E00]|[\u1E02-\u1E02]|[\u1E04-\u1E04]|[\u1E06-\u1E06]|[\u1E08-\u1E08]|[\u1E0A-\u1E0A]|[\u1E0C-\u1E0C]|[\u1E0E-\u1E0E]|[\u1E10-\u1E10]|[\u1E12-\u1E12]|[\u1E14-\u1E14]|[\u1E16-\u1E16]|[\u1E18-\u1E18]|[\u1E1A-\u1E1A]|[\u1E1C-\u1E1C]|[\u1E1E-\u1E1E]|[\u1E20-\u1E20]|[\u1E22-\u1E22]|[\u1E24-\u1E24]|[\u1E26-\u1E26]|[\u1E28-\u1E28]|[\u1E2A-\u1E2A]|[\u1E2C-\u1E2C]|[\u1E2E-\u1E2E]|[\u1E30-\u1E30]|[\u1E32-\u1E32]|[\u1E34-\u1E34]|[\u1E36-\u1E36]|[\u1E38-\u1E38]|[\u1E3A-\u1E3A]|[\u1E3C-\u1E3C]|[\u1E3E-\u1E3E]|[\u1E40-\u1E40]|[\u1E42-\u1E42]|[\u1E44-\u1E44]|[\u1E46-\u1E46]|[\u1E48-\u1E48]|[\u1E4A-\u1E4A]|[\u1E4C-\u1E4C]|[\u1E4E-\u1E4E]|[\u1E50-\u1E50]|[\u1E52-\u1E52]|[\u1E54-\u1E54]|[\u1E56-\u1E56]|[\u1E58-\u1E58]|[\u1E5A-\u1E5A]|[\u1E5C-\u1E5C]|[\u1E5E-\u1E5E]|[\u1E60-\u1E60]|[\u1E62-\u1E62]|[\u1E64-\u1E64]|[\u1E66-\u1E66]|[\u1E68-\u1E68]|[\u1E6A-\u1E6A]|[\u1E6C-\u1E6C]|[\u1E6E-\u1E6E]|[\u1E70-\u1E70]|[\u1E72-\u1E72]|[\u1E74-\u1E74]|[\u1E76-\u1E76]|[\u1E78-\u1E78]|[\u1E7A-\u1E7A]|[\u1E7C-\u1E7C]|[\u1E7E-\u1E7E]|[\u1E80-\u1E80]|[\u1E82-\u1E82]|[\u1E84-\u1E84]|[\u1E86-\u1E86]|[\u1E88-\u1E88]|[\u1E8A-\u1E8A]|[\u1E8C-\u1E8C]|[\u1E8E-\u1E8E]|[\u1E90-\u1E90]|[\u1E92-\u1E92]|[\u1E94-\u1E94]|[\u1EA0-\u1EA0]|[\u1EA2-\u1EA2]|[\u1EA4-\u1EA4]|[\u1EA6-\u1EA6]|[\u1EA8-\u1EA8]|[\u1EAA-\u1EAA]|[\u1EAC-\u1EAC]|[\u1EAE-\u1EAE]|[\u1EB0-\u1EB0]|[\u1EB2-\u1EB2]|[\u1EB4-\u1EB4]|[\u1EB6-\u1EB6]|[\u1EB8-\u1EB8]|[\u1EBA-\u1EBA]|[\u1EBC-\u1EBC]|[\u1EBE-\u1EBE]|[\u1EC0-\u1EC0]|[\u1EC2-\u1EC2]|[\u1EC4-\u1EC4]|[\u1EC6-\u1EC6]|[\u1EC8-\u1EC8]|[\u1ECA-\u1ECA]|[\u1ECC-\u1ECC]|[\u1ECE-\u1ECE]|[\u1ED0-\u1ED0]|[\u1ED2-\u1ED2]|[\u1ED4-\u1ED4]|[\u1ED6-\u1ED6]|[\u1ED8-\u1ED8]|[\u1EDA-\u1EDA]|[\u1EDC-\u1EDC]|[\u1EDE-\u1EDE]|[\u1EE0-\u1EE0]|[\u1EE2-\u1EE2]|[\u1EE4-\u1EE4]|[\u1EE6-\u1EE6]|[\u1EE8-\u1EE8]|[\u1EEA-\u1EEA]|[\u1EEC-\u1EEC]|[\u1EEE-\u1EEE]|[\u1EF0-\u1EF0]|[\u1EF2-\u1EF2]|[\u1EF4-\u1EF4]|[\u1EF6-\u1EF6]|[\u1EF8-\u1EF8]|[\u1F08-\u1F0F]|[\u1F18-\u1F1D]|[\u1F28-\u1F2F]|[\u1F38-\u1F3F]|[\u1F48-\u1F4D]|[\u1F59-\u1F59]|[\u1F5B-\u1F5B]|[\u1F5D-\u1F5D]|[\u1F5F-\u1F5F]|[\u1F68-\u1F6F]|[\u1F88-\u1F8F]|[\u1F98-\u1F9F]|[\u1FA8-\u1FAF]|[\u1FB8-\u1FBC]|[\u1FC8-\u1FCC]|[\u1FD8-\u1FDB]|[\u1FE8-\u1FEC]|[\u1FF8-\u1FFC]|[\u2102-\u2102]|[\u2107-\u2107]|[\u210B-\u210D]|[\u2110-\u2112]|[\u2115-\u2115]|[\u2119-\u211D]|[\u2124-\u2124]|[\u2126-\u2126]|[\u2128-\u2128]|[\u212A-\u212D]|[\u2130-\u2131]|[\u2133-\u2133]|[\uFF21-\uFF3A]|[\u0061-\u007A]|[\u00AA-\u00AA]|[\u00B5-\u00B5]|[\u00BA-\u00BA]|[\u00DF-\u00F6]|[\u00F8-\u00FF]|[\u0101-\u0101]|[\u0103-\u0103]|[\u0105-\u0105]|[\u0107-\u0107]|[\u0109-\u0109]|[\u010B-\u010B]|[\u010D-\u010D]|[\u010F-\u010F]|[\u0111-\u0111]|[\u0113-\u0113]|[\u0115-\u0115]|[\u0117-\u0117]|[\u0119-\u0119]|[\u011B-\u011B]|[\u011D-\u011D]|[\u011F-\u011F]|[\u0121-\u0121]|[\u0123-\u0123]|[\u0125-\u0125]|[\u0127-\u0127]|[\u0129-\u0129]|[\u012B-\u012B]|[\u012D-\u012D]|[\u012F-\u012F]|[\u0131-\u0131]|[\u0133-\u0133]|[\u0135-\u0135]|[\u0137-\u0138]|[\u013A-\u013A]|[\u013C-\u013C]|[\u013E-\u013E]|[\u0140-\u0140]|[\u0142-\u0142]|[\u0144-\u0144]|[\u0146-\u0146]|[\u0148-\u0149]|[\u014B-\u014B]|[\u014D-\u014D]|[\u014F-\u014F]|[\u0151-\u0151]|[\u0153-\u0153]|[\u0155-\u0155]|[\u0157-\u0157]|[\u0159-\u0159]|[\u015B-\u015B]|[\u015D-\u015D]|[\u015F-\u015F]|[\u0161-\u0161]|[\u0163-\u0163]|[\u0165-\u0165]|[\u0167-\u0167]|[\u0169-\u0169]|[\u016B-\u016B]|[\u016D-\u016D]|[\u016F-\u016F]|[\u0171-\u0171]|[\u0173-\u0173]|[\u0175-\u0175]|[\u0177-\u0177]|[\u017A-\u017A]|[\u017C-\u017C]|[\u017E-\u0180]|[\u0183-\u0183]|[\u0185-\u0185]|[\u0188-\u0188]|[\u018C-\u018D]|[\u0192-\u0192]|[\u0195-\u0195]|[\u0199-\u019B]|[\u019E-\u019E]|[\u01A1-\u01A1]|[\u01A3-\u01A3]|[\u01A5-\u01A5]|[\u01A8-\u01A8]|[\u01AB-\u01AB]|[\u01AD-\u01AD]|[\u01B0-\u01B0]|[\u01B4-\u01B4]|[\u01B6-\u01B6]|[\u01B9-\u01BA]|[\u01BD-\u01BD]|[\u01C6-\u01C6]|[\u01C9-\u01C9]|[\u01CC-\u01CC]|[\u01CE-\u01CE]|[\u01D0-\u01D0]|[\u01D2-\u01D2]|[\u01D4-\u01D4]|[\u01D6-\u01D6]|[\u01D8-\u01D8]|[\u01DA-\u01DA]|[\u01DC-\u01DD]|[\u01DF-\u01DF]|[\u01E1-\u01E1]|[\u01E3-\u01E3]|[\u01E5-\u01E5]|[\u01E7-\u01E7]|[\u01E9-\u01E9]|[\u01EB-\u01EB]|[\u01ED-\u01ED]|[\u01EF-\u01F0]|[\u01F3-\u01F3]|[\u01F5-\u01F5]|[\u01FB-\u01FB]|[\u01FD-\u01FD]|[\u01FF-\u01FF]|[\u0201-\u0201]|[\u0203-\u0203]|[\u0205-\u0205]|[\u0207-\u0207]|[\u0209-\u0209]|[\u020B-\u020B]|[\u020D-\u020D]|[\u020F-\u020F]|[\u0211-\u0211]|[\u0213-\u0213]|[\u0215-\u0215]|[\u0217-\u0217]|[\u0250-\u02A8]|[\u0390-\u0390]|[\u03AC-\u03CE]|[\u03D0-\u03D1]|[\u03D5-\u03D6]|[\u03E3-\u03E3]|[\u03E5-\u03E5]|[\u03E7-\u03E7]|[\u03E9-\u03E9]|[\u03EB-\u03EB]|[\u03ED-\u03ED]|[\u03EF-\u03F2]|[\u0430-\u044F]|[\u0451-\u045C]|[\u045E-\u045F]|[\u0461-\u0461]|[\u0463-\u0463]|[\u0465-\u0465]|[\u0467-\u0467]|[\u0469-\u0469]|[\u046B-\u046B]|[\u046D-\u046D]|[\u046F-\u046F]|[\u0471-\u0471]|[\u0473-\u0473]|[\u0475-\u0475]|[\u0477-\u0477]|[\u0479-\u0479]|[\u047B-\u047B]|[\u047D-\u047D]|[\u047F-\u047F]|[\u0481-\u0481]|[\u0491-\u0491]|[\u0493-\u0493]|[\u0495-\u0495]|[\u0497-\u0497]|[\u0499-\u0499]|[\u049B-\u049B]|[\u049D-\u049D]|[\u049F-\u049F]|[\u04A1-\u04A1]|[\u04A3-\u04A3]|[\u04A5-\u04A5]|[\u04A7-\u04A7]|[\u04A9-\u04A9]|[\u04AB-\u04AB]|[\u04AD-\u04AD]|[\u04AF-\u04AF]|[\u04B1-\u04B1]|[\u04B3-\u04B3]|[\u04B5-\u04B5]|[\u04B7-\u04B7]|[\u04B9-\u04B9]|[\u04BB-\u04BB]|[\u04BD-\u04BD]|[\u04BF-\u04BF]|[\u04C2-\u04C2]|[\u04C4-\u04C4]|[\u04C8-\u04C8]|[\u04CC-\u04CC]|[\u04D1-\u04D1]|[\u04D3-\u04D3]|[\u04D5-\u04D5]|[\u04D7-\u04D7]|[\u04D9-\u04D9]|[\u04DB-\u04DB]|[\u04DD-\u04DD]|[\u04DF-\u04DF]|[\u04E1-\u04E1]|[\u04E3-\u04E3]|[\u04E5-\u04E5]|[\u04E7-\u04E7]|[\u04E9-\u04E9]|[\u04EB-\u04EB]|[\u04EF-\u04EF]|[\u04F1-\u04F1]|[\u04F3-\u04F3]|[\u04F5-\u04F5]|[\u04F9-\u04F9]|[\u0561-\u0587]|[\u10D0-\u10F6]|[\u1E01-\u1E01]|[\u1E03-\u1E03]|[\u1E05-\u1E05]|[\u1E07-\u1E07]|[\u1E09-\u1E09]|[\u1E0B-\u1E0B]|[\u1E0D-\u1E0D]|[\u1E0F-\u1E0F]|[\u1E11-\u1E11]|[\u1E13-\u1E13]|[\u1E15-\u1E15]|[\u1E17-\u1E17]|[\u1E19-\u1E19]|[\u1E1B-\u1E1B]|[\u1E1D-\u1E1D]|[\u1E1F-\u1E1F]|[\u1E21-\u1E21]|[\u1E23-\u1E23]|[\u1E25-\u1E25]|[\u1E27-\u1E27]|[\u1E29-\u1E29]|[\u1E2B-\u1E2B]|[\u1E2D-\u1E2D]|[\u1E2F-\u1E2F]|[\u1E31-\u1E31]|[\u1E33-\u1E33]|[\u1E35-\u1E35]|[\u1E37-\u1E37]|[\u1E39-\u1E39]|[\u1E3B-\u1E3B]|[\u1E3D-\u1E3D]|[\u1E3F-\u1E3F]|[\u1E41-\u1E41]|[\u1E43-\u1E43]|[\u1E45-\u1E45]|[\u1E47-\u1E47]|[\u1E49-\u1E49]|[\u1E4B-\u1E4B]|[\u1E4D-\u1E4D]|[\u1E4F-\u1E4F]|[\u1E51-\u1E51]|[\u1E53-\u1E53]|[\u1E55-\u1E55]|[\u1E57-\u1E57]|[\u1E59-\u1E59]|[\u1E5B-\u1E5B]|[\u1E5D-\u1E5D]|[\u1E5F-\u1E5F]|[\u1E61-\u1E61]|[\u1E63-\u1E63]|[\u1E65-\u1E65]|[\u1E67-\u1E67]|[\u1E69-\u1E69]|[\u1E6B-\u1E6B]|[\u1E6D-\u1E6D]|[\u1E6F-\u1E6F]|[\u1E71-\u1E71]|[\u1E73-\u1E73]|[\u1E75-\u1E75]|[\u1E77-\u1E77]|[\u1E79-\u1E79]|[\u1E7B-\u1E7B]|[\u1E7D-\u1E7D]|[\u1E7F-\u1E7F]|[\u1E81-\u1E81]|[\u1E83-\u1E83]|[\u1E85-\u1E85]|[\u1E87-\u1E87]|[\u1E89-\u1E89]|[\u1E8B-\u1E8B]|[\u1E8D-\u1E8D]|[\u1E8F-\u1E8F]|[\u1E91-\u1E91]|[\u1E93-\u1E93]|[\u1E95-\u1E9B]|[\u1EA1-\u1EA1]|[\u1EA3-\u1EA3]|[\u1EA5-\u1EA5]|[\u1EA7-\u1EA7]|[\u1EA9-\u1EA9]|[\u1EAB-\u1EAB]|[\u1EAD-\u1EAD]|[\u1EAF-\u1EAF]|[\u1EB1-\u1EB1]|[\u1EB3-\u1EB3]|[\u1EB5-\u1EB5]|[\u1EB7-\u1EB7]|[\u1EB9-\u1EB9]|[\u1EBB-\u1EBB]|[\u1EBD-\u1EBD]|[\u1EBF-\u1EBF]|[\u1EC1-\u1EC1]|[\u1EC3-\u1EC3]|[\u1EC5-\u1EC5]|[\u1EC7-\u1EC7]|[\u1EC9-\u1EC9]|[\u1ECB-\u1ECB]|[\u1ECD-\u1ECD]|[\u1ECF-\u1ECF]|[\u1ED1-\u1ED1]|[\u1ED3-\u1ED3]|[\u1ED5-\u1ED5]|[\u1ED7-\u1ED7]|[\u1ED9-\u1ED9]|[\u1EDB-\u1EDB]|[\u1EDD-\u1EDD]|[\u1EDF-\u1EDF]|[\u1EE1-\u1EE1]|[\u1EE3-\u1EE3]|[\u1EE5-\u1EE5]|[\u1EE7-\u1EE7]|[\u1EE9-\u1EE9]|[\u1EEB-\u1EEB]|[\u1EED-\u1EED]|[\u1EEF-\u1EEF]|[\u1EF1-\u1EF1]|[\u1EF3-\u1EF3]|[\u1EF5-\u1EF5]|[\u1EF7-\u1EF7]|[\u1EF9-\u1EF9]|[\u1F00-\u1F07]|[\u1F10-\u1F15]|[\u1F20-\u1F27]|[\u1F30-\u1F37]|[\u1F40-\u1F45]|[\u1F50-\u1F57]|[\u1F60-\u1F67]|[\u1F70-\u1F7D]|[\u1F80-\u1F87]|[\u1F90-\u1F97]|[\u1FA0-\u1FA7]|[\u1FB0-\u1FB4]|[\u1FB6-\u1FB7]|[\u1FBE-\u1FBE]|[\u1FC2-\u1FC4]|[\u1FC6-\u1FC7]|[\u1FD0-\u1FD3]|[\u1FD6-\u1FD7]|[\u1FE0-\u1FE7]|[\u1FF2-\u1FF4]|[\u1FF6-\u1FF7]|[\u207F-\u207F]|[\u210A-\u210A]|[\u210E-\u210F]|[\u2113-\u2113]|[\u2118-\u2118]|[\u212E-\u212F]|[\u2134-\u2134]|[\uFB00-\uFB06]|[\uFB13-\uFB17]|[\uFF41-\uFF5A]|[\u01C5-\u01C5]|[\u01C8-\u01C8]|[\u01CB-\u01CB]|[\u01F2-\u01F2]|[\u02B0-\u02B8]|[\u02BB-\u02C1]|[\u02D0-\u02D1]|[\u02E0-\u02E4]|[\u037A-\u037A]|[\u0559-\u0559]|[\u0640-\u0640]|[\u06E5-\u06E6]|[\u0E46-\u0E46]|[\u0EC6-\u0EC6]|[\u3005-\u3005]|[\u3031-\u3035]|[\u309D-\u309E]|[\u30FC-\u30FE]|[\uFF70-\uFF70]|[\uFF9E-\uFF9F]|[\u01AA-\u01AA]|[\u01BB-\u01BB]|[\u01BE-\u01C3]|[\u03F3-\u03F3]|[\u04C0-\u04C0]|[\u05D0-\u05EA]|[\u05F0-\u05F2]|[\u0621-\u063A]|[\u0641-\u064A]|[\u0671-\u06B7]|[\u06BA-\u06BE]|[\u06C0-\u06CE]|[\u06D0-\u06D3]|[\u06D5-\u06D5]|[\u0905-\u0939]|[\u093D-\u093D]|[\u0950-\u0950]|[\u0958-\u0961]|[\u0985-\u098C]|[\u098F-\u0990]|[\u0993-\u09A8]|[\u09AA-\u09B0]|[\u09B2-\u09B2]|[\u09B6-\u09B9]|[\u09DC-\u09DD]|[\u09DF-\u09E1]|[\u09F0-\u09F1]|[\u0A05-\u0A0A]|[\u0A0F-\u0A10]|[\u0A13-\u0A28]|[\u0A2A-\u0A30]|[\u0A32-\u0A33]|[\u0A35-\u0A36]|[\u0A38-\u0A39]|[\u0A59-\u0A5C]|[\u0A5E-\u0A5E]|[\u0A72-\u0A74]|[\u0A85-\u0A8B]|[\u0A8D-\u0A8D]|[\u0A8F-\u0A91]|[\u0A93-\u0AA8]|[\u0AAA-\u0AB0]|[\u0AB2-\u0AB3]|[\u0AB5-\u0AB9]|[\u0ABD-\u0ABD]|[\u0AD0-\u0AD0]|[\u0AE0-\u0AE0]|[\u0B05-\u0B0C]|[\u0B0F-\u0B10]|[\u0B13-\u0B28]|[\u0B2A-\u0B30]|[\u0B32-\u0B33]|[\u0B36-\u0B39]|[\u0B3D-\u0B3D]|[\u0B5C-\u0B5D]|[\u0B5F-\u0B61]|[\u0B85-\u0B8A]|[\u0B8E-\u0B90]|[\u0B92-\u0B95]|[\u0B99-\u0B9A]|[\u0B9C-\u0B9C]|[\u0B9E-\u0B9F]|[\u0BA3-\u0BA4]|[\u0BA8-\u0BAA]|[\u0BAE-\u0BB5]|[\u0BB7-\u0BB9]|[\u0C05-\u0C0C]|[\u0C0E-\u0C10]|[\u0C12-\u0C28]|[\u0C2A-\u0C33]|[\u0C35-\u0C39]|[\u0C60-\u0C61]|[\u0C85-\u0C8C]|[\u0C8E-\u0C90]|[\u0C92-\u0CA8]|[\u0CAA-\u0CB3]|[\u0CB5-\u0CB9]|[\u0CDE-\u0CDE]|[\u0CE0-\u0CE1]|[\u0D05-\u0D0C]|[\u0D0E-\u0D10]|[\u0D12-\u0D28]|[\u0D2A-\u0D39]|[\u0D60-\u0D61]|[\u0E01-\u0E30]|[\u0E32-\u0E33]|[\u0E40-\u0E45]|[\u0E81-\u0E82]|[\u0E84-\u0E84]|[\u0E87-\u0E88]|[\u0E8A-\u0E8A]|[\u0E8D-\u0E8D]|[\u0E94-\u0E97]|[\u0E99-\u0E9F]|[\u0EA1-\u0EA3]|[\u0EA5-\u0EA5]|[\u0EA7-\u0EA7]|[\u0EAA-\u0EAB]|[\u0EAD-\u0EB0]|[\u0EB2-\u0EB3]|[\u0EBD-\u0EBD]|[\u0EC0-\u0EC4]|[\u0EDC-\u0EDD]|[\u0F00-\u0F00]|[\u0F40-\u0F47]|[\u0F49-\u0F69]|[\u0F88-\u0F8B]|[\u1100-\u1159]|[\u115F-\u11A2]|[\u11A8-\u11F9]|[\u2135-\u2138]|[\u3006-\u3006]|[\u3041-\u3094]|[\u30A1-\u30FA]|[\u3105-\u312C]|[\u3131-\u318E]|[\u4E00-\u9FA5]|[\uAC00-\uD7A3]|[\uF900-\uFA2D]|[\uFB1F-\uFB28]|[\uFB2A-\uFB36]|[\uFB38-\uFB3C]|[\uFB3E-\uFB3E]|[\uFB40-\uFB41]|[\uFB43-\uFB44]|[\uFB46-\uFBB1]|[\uFBD3-\uFD3D]|[\uFD50-\uFD8F]|[\uFD92-\uFDC7]|[\uFDF0-\uFDFB]|[\uFE70-\uFE72]|[\uFE74-\uFE74]|[\uFE76-\uFEFC]|[\uFF66-\uFF6F]|[\uFF71-\uFF9D]|[\uFFA0-\uFFBE]|[\uFFC2-\uFFC7]|[\uFFCA-\uFFCF]|[\uFFD2-\uFFD7]|[\uFFDA-\uFFDC]/,
  Ltmo: /[\u01C5-\u01C5]|[\u01C8-\u01C8]|[\u01CB-\u01CB]|[\u01F2-\u01F2][\u02B0-\u02B8]|[\u02BB-\u02C1]|[\u02D0-\u02D1]|[\u02E0-\u02E4]|[\u037A-\u037A]|[\u0559-\u0559]|[\u0640-\u0640]|[\u06E5-\u06E6]|[\u0E46-\u0E46]|[\u0EC6-\u0EC6]|[\u3005-\u3005]|[\u3031-\u3035]|[\u309D-\u309E]|[\u30FC-\u30FE]|[\uFF70-\uFF70]|[\uFF9E-\uFF9F][\u01AA-\u01AA]|[\u01BB-\u01BB]|[\u01BE-\u01C3]|[\u03F3-\u03F3]|[\u04C0-\u04C0]|[\u05D0-\u05EA]|[\u05F0-\u05F2]|[\u0621-\u063A]|[\u0641-\u064A]|[\u0671-\u06B7]|[\u06BA-\u06BE]|[\u06C0-\u06CE]|[\u06D0-\u06D3]|[\u06D5-\u06D5]|[\u0905-\u0939]|[\u093D-\u093D]|[\u0950-\u0950]|[\u0958-\u0961]|[\u0985-\u098C]|[\u098F-\u0990]|[\u0993-\u09A8]|[\u09AA-\u09B0]|[\u09B2-\u09B2]|[\u09B6-\u09B9]|[\u09DC-\u09DD]|[\u09DF-\u09E1]|[\u09F0-\u09F1]|[\u0A05-\u0A0A]|[\u0A0F-\u0A10]|[\u0A13-\u0A28]|[\u0A2A-\u0A30]|[\u0A32-\u0A33]|[\u0A35-\u0A36]|[\u0A38-\u0A39]|[\u0A59-\u0A5C]|[\u0A5E-\u0A5E]|[\u0A72-\u0A74]|[\u0A85-\u0A8B]|[\u0A8D-\u0A8D]|[\u0A8F-\u0A91]|[\u0A93-\u0AA8]|[\u0AAA-\u0AB0]|[\u0AB2-\u0AB3]|[\u0AB5-\u0AB9]|[\u0ABD-\u0ABD]|[\u0AD0-\u0AD0]|[\u0AE0-\u0AE0]|[\u0B05-\u0B0C]|[\u0B0F-\u0B10]|[\u0B13-\u0B28]|[\u0B2A-\u0B30]|[\u0B32-\u0B33]|[\u0B36-\u0B39]|[\u0B3D-\u0B3D]|[\u0B5C-\u0B5D]|[\u0B5F-\u0B61]|[\u0B85-\u0B8A]|[\u0B8E-\u0B90]|[\u0B92-\u0B95]|[\u0B99-\u0B9A]|[\u0B9C-\u0B9C]|[\u0B9E-\u0B9F]|[\u0BA3-\u0BA4]|[\u0BA8-\u0BAA]|[\u0BAE-\u0BB5]|[\u0BB7-\u0BB9]|[\u0C05-\u0C0C]|[\u0C0E-\u0C10]|[\u0C12-\u0C28]|[\u0C2A-\u0C33]|[\u0C35-\u0C39]|[\u0C60-\u0C61]|[\u0C85-\u0C8C]|[\u0C8E-\u0C90]|[\u0C92-\u0CA8]|[\u0CAA-\u0CB3]|[\u0CB5-\u0CB9]|[\u0CDE-\u0CDE]|[\u0CE0-\u0CE1]|[\u0D05-\u0D0C]|[\u0D0E-\u0D10]|[\u0D12-\u0D28]|[\u0D2A-\u0D39]|[\u0D60-\u0D61]|[\u0E01-\u0E30]|[\u0E32-\u0E33]|[\u0E40-\u0E45]|[\u0E81-\u0E82]|[\u0E84-\u0E84]|[\u0E87-\u0E88]|[\u0E8A-\u0E8A]|[\u0E8D-\u0E8D]|[\u0E94-\u0E97]|[\u0E99-\u0E9F]|[\u0EA1-\u0EA3]|[\u0EA5-\u0EA5]|[\u0EA7-\u0EA7]|[\u0EAA-\u0EAB]|[\u0EAD-\u0EB0]|[\u0EB2-\u0EB3]|[\u0EBD-\u0EBD]|[\u0EC0-\u0EC4]|[\u0EDC-\u0EDD]|[\u0F00-\u0F00]|[\u0F40-\u0F47]|[\u0F49-\u0F69]|[\u0F88-\u0F8B]|[\u1100-\u1159]|[\u115F-\u11A2]|[\u11A8-\u11F9]|[\u2135-\u2138]|[\u3006-\u3006]|[\u3041-\u3094]|[\u30A1-\u30FA]|[\u3105-\u312C]|[\u3131-\u318E]|[\u4E00-\u9FA5]|[\uAC00-\uD7A3]|[\uF900-\uFA2D]|[\uFB1F-\uFB28]|[\uFB2A-\uFB36]|[\uFB38-\uFB3C]|[\uFB3E-\uFB3E]|[\uFB40-\uFB41]|[\uFB43-\uFB44]|[\uFB46-\uFBB1]|[\uFBD3-\uFD3D]|[\uFD50-\uFD8F]|[\uFD92-\uFDC7]|[\uFDF0-\uFDFB]|[\uFE70-\uFE72]|[\uFE74-\uFE74]|[\uFE76-\uFEFC]|[\uFF66-\uFF6F]|[\uFF71-\uFF9D]|[\uFFA0-\uFFBE]|[\uFFC2-\uFFC7]|[\uFFCA-\uFFCF]|[\uFFD2-\uFFD7]|[\uFFDA-\uFFDC]/
};

},{}]},{},[42])(42)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2J1aWx0LWluLXJ1bGVzLmpzIiwiZGlzdC9vaG0tZ3JhbW1hci5qcyIsImRpc3Qvb3BlcmF0aW9ucy1hbmQtYXR0cmlidXRlcy5qcyIsImV4dHJhcy9pbmRleC5qcyIsImV4dHJhcy9zZW1hbnRpY3MtdG9BU1QuanMiLCJub2RlX21vZHVsZXMvZC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9hc3NpZ24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzIiwibm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9zaGltLmpzIiwibm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2lzLWNhbGxhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2tleXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qva2V5cy9pcy1pbXBsZW1lbnRlZC5qcyIsIm5vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL3NoaW0uanMiLCJub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnMuanMiLCJub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvdmFsaWQtdmFsdWUuanMiLCJub2RlX21vZHVsZXMvZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zL2lzLWltcGxlbWVudGVkLmpzIiwibm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvc2hpbS5qcyIsIm5vZGVfbW9kdWxlcy9lczYtc3ltYm9sL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2VzNi1zeW1ib2wvaXMtaW1wbGVtZW50ZWQuanMiLCJub2RlX21vZHVsZXMvZXM2LXN5bWJvbC9pcy1zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvZXM2LXN5bWJvbC9wb2x5ZmlsbC5qcyIsIm5vZGVfbW9kdWxlcy9lczYtc3ltYm9sL3ZhbGlkYXRlLXN5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy91dGlsLWV4dGVuZC9leHRlbmQuanMiLCJzcmMvQnVpbGRlci5qcyIsInNyYy9GYWlsdXJlLmpzIiwic3JjL0dyYW1tYXIuanMiLCJzcmMvR3JhbW1hckRlY2wuanMiLCJzcmMvSW5wdXRTdHJlYW0uanMiLCJzcmMvSW50ZXJ2YWwuanMiLCJzcmMvTWF0Y2hSZXN1bHQuanMiLCJzcmMvTmFtZXNwYWNlLmpzIiwic3JjL1Bvc0luZm8uanMiLCJzcmMvU2VtYW50aWNzLmpzIiwic3JjL1N0YXRlLmpzIiwic3JjL1RyYWNlLmpzIiwic3JjL1Zpc2l0b3JGYW1pbHkuanMiLCJzcmMvY29tbW9uLmpzIiwic3JjL2Vycm9ycy5qcyIsInNyYy9tYWluLmpzIiwic3JjL25vZGVzLmpzIiwic3JjL3BleHByLXZpc2l0b3JzLmpzIiwic3JjL3BleHBycy1hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlLmpzIiwic3JjL3BleHBycy1hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZC5qcyIsInNyYy9wZXhwcnMtYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkuanMiLCJzcmMvcGV4cHJzLWFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZS5qcyIsInNyYy9wZXhwcnMtY2hlY2suanMiLCJzcmMvcGV4cHJzLWV2YWwuanMiLCJzcmMvcGV4cHJzLWdlbmVyYXRlRXhhbXBsZS5qcyIsInNyYy9wZXhwcnMtZ2V0QXJpdHkuanMiLCJzcmMvcGV4cHJzLWludHJvZHVjZVBhcmFtcy5qcyIsInNyYy9wZXhwcnMtaXNOdWxsYWJsZS5qcyIsInNyYy9wZXhwcnMtb3V0cHV0UmVjaXBlLmpzIiwic3JjL3BleHBycy1zdWJzdGl0dXRlUGFyYW1zLmpzIiwic3JjL3BleHBycy10b0FyZ3VtZW50TmFtZUxpc3QuanMiLCJzcmMvcGV4cHJzLXRvRGlzcGxheVN0cmluZy5qcyIsInNyYy9wZXhwcnMtdG9GYWlsdXJlLmpzIiwic3JjL3BleHBycy10b1N0cmluZy5qcyIsInNyYy9wZXhwcnMuanMiLCJzcmMvdXRpbC5qcyIsInRoaXJkX3BhcnR5L1VuaWNvZGVDYXRlZ29yaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzcUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaFdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDak1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbk5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBvaG0gPSByZXF1aXJlKCcuLicpO1xubW9kdWxlLmV4cG9ydHMgPSBvaG0ubWFrZVJlY2lwZShbXCJncmFtbWFyXCIse1wic291cmNlXCI6XCJCdWlsdEluUnVsZXMge1xcblxcbiAgYWxudW0gIChhbiBhbHBoYS1udW1lcmljIGNoYXJhY3RlcilcXG4gICAgPSBsZXR0ZXJcXG4gICAgfCBkaWdpdFxcblxcbiAgbGV0dGVyICAoYSBsZXR0ZXIpXFxuICAgID0gbG93ZXJcXG4gICAgfCB1cHBlclxcbiAgICB8IHVuaWNvZGVMdG1vXFxuXFxuICBkaWdpdCAgKGEgZGlnaXQpXFxuICAgID0gXFxcIjBcXFwiLi5cXFwiOVxcXCJcXG5cXG4gIGhleERpZ2l0ICAoYSBoZXhhZGVjaW1hbCBkaWdpdClcXG4gICAgPSBkaWdpdFxcbiAgICB8IFxcXCJhXFxcIi4uXFxcImZcXFwiXFxuICAgIHwgXFxcIkFcXFwiLi5cXFwiRlxcXCJcXG5cXG4gIExpc3RPZjxlbGVtLCBzZXA+XFxuICAgID0gTm9uZW1wdHlMaXN0T2Y8ZWxlbSwgc2VwPlxcbiAgICB8IEVtcHR5TGlzdE9mPGVsZW0sIHNlcD5cXG5cXG4gIE5vbmVtcHR5TGlzdE9mPGVsZW0sIHNlcD5cXG4gICAgPSBlbGVtIChzZXAgZWxlbSkqXFxuXFxuICBFbXB0eUxpc3RPZjxlbGVtLCBzZXA+XFxuICAgID0gLyogbm90aGluZyAqL1xcblxcbiAgbGlzdE9mPGVsZW0sIHNlcD5cXG4gICAgPSBub25lbXB0eUxpc3RPZjxlbGVtLCBzZXA+XFxuICAgIHwgZW1wdHlMaXN0T2Y8ZWxlbSwgc2VwPlxcblxcbiAgbm9uZW1wdHlMaXN0T2Y8ZWxlbSwgc2VwPlxcbiAgICA9IGVsZW0gKHNlcCBlbGVtKSpcXG5cXG4gIGVtcHR5TGlzdE9mPGVsZW0sIHNlcD5cXG4gICAgPSAvKiBub3RoaW5nICovXFxuXFxufVwifSxcIkJ1aWx0SW5SdWxlc1wiLG51bGwsbnVsbCx7XCJhbG51bVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE4LDc4XX0sXCJhbiBhbHBoYS1udW1lcmljIGNoYXJhY3RlclwiLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzYwLDc4XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjAsNjZdfSxcImxldHRlclwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3Myw3OF19LFwiZGlnaXRcIixbXV1dXSxcImxldHRlclwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzgyLDE0Ml19LFwiYSBsZXR0ZXJcIixbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMDcsMTQyXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTA3LDExMl19LFwibG93ZXJcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE5LDEyNF19LFwidXBwZXJcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTMxLDE0Ml19LFwidW5pY29kZUx0bW9cIixbXV1dXSxcImRpZ2l0XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQ2LDE3N119LFwiYSBkaWdpdFwiLFtdLFtcInJhbmdlXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTY5LDE3N119LFwiMFwiLFwiOVwiXV0sXCJoZXhEaWdpdFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE4MSwyNTRdfSxcImEgaGV4YWRlY2ltYWwgZGlnaXRcIixbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTksMjU0XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE5LDIyNF19LFwiZGlnaXRcIixbXV0sW1wicmFuZ2VcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzEsMjM5XX0sXCJhXCIsXCJmXCJdLFtcInJhbmdlXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQ2LDI1NF19LFwiQVwiLFwiRlwiXV1dLFwiTGlzdE9mXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjU4LDMzNl19LG51bGwsW1wiZWxlbVwiLFwic2VwXCJdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzI4MiwzMzZdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyODIsMzA3XX0sXCJOb25lbXB0eUxpc3RPZlwiLFtbXCJwYXJhbVwiLHt9LDBdLFtcInBhcmFtXCIse30sMV1dXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszMTQsMzM2XX0sXCJFbXB0eUxpc3RPZlwiLFtbXCJwYXJhbVwiLHt9LDBdLFtcInBhcmFtXCIse30sMV1dXV1dLFwiTm9uZW1wdHlMaXN0T2ZcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszNDAsMzg4XX0sbnVsbCxbXCJlbGVtXCIsXCJzZXBcIl0sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzcyLDM4OF19LFtcInBhcmFtXCIse30sMF0sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6WzM3NywzODhdfSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszNzgsMzg2XX0sW1wicGFyYW1cIix7fSwxXSxbXCJwYXJhbVwiLHt9LDBdXV1dXSxcIkVtcHR5TGlzdE9mXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzkyLDQzNF19LG51bGwsW1wiZWxlbVwiLFwic2VwXCJdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzQzOCw0MzhdfV1dLFwibGlzdE9mXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDM4LDUxNl19LG51bGwsW1wiZWxlbVwiLFwic2VwXCJdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzQ2Miw1MTZdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NjIsNDg3XX0sXCJub25lbXB0eUxpc3RPZlwiLFtbXCJwYXJhbVwiLHt9LDBdLFtcInBhcmFtXCIse30sMV1dXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0OTQsNTE2XX0sXCJlbXB0eUxpc3RPZlwiLFtbXCJwYXJhbVwiLHt9LDBdLFtcInBhcmFtXCIse30sMV1dXV1dLFwibm9uZW1wdHlMaXN0T2ZcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1MjAsNTY4XX0sbnVsbCxbXCJlbGVtXCIsXCJzZXBcIl0sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTUyLDU2OF19LFtcInBhcmFtXCIse30sMF0sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6WzU1Nyw1NjhdfSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NTgsNTY2XX0sW1wicGFyYW1cIix7fSwxXSxbXCJwYXJhbVwiLHt9LDBdXV1dXSxcImVtcHR5TGlzdE9mXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTcyLDYxNF19LG51bGwsW1wiZWxlbVwiLFwic2VwXCJdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzYxNiw2MTZdfV1dfV0pO1xuIiwidmFyIG9obSA9IHJlcXVpcmUoJy4uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IG9obS5tYWtlUmVjaXBlKFtcImdyYW1tYXJcIix7XCJzb3VyY2VcIjpcIk9obSB7XFxuXFxuICBHcmFtbWFyc1xcbiAgICA9IEdyYW1tYXIqXFxuXFxuICBHcmFtbWFyXFxuICAgID0gaWRlbnQgU3VwZXJHcmFtbWFyPyBcXFwie1xcXCIgUnVsZSogXFxcIn1cXFwiXFxuXFxuICBTdXBlckdyYW1tYXJcXG4gICAgPSBcXFwiPDpcXFwiIGlkZW50XFxuXFxuICBSdWxlXFxuICAgID0gaWRlbnQgRm9ybWFscz8gcnVsZURlc2NyPyBcXFwiPVxcXCIgIFJ1bGVCb2R5ICAtLSBkZWZpbmVcXG4gICAgfCBpZGVudCBGb3JtYWxzPyAgICAgICAgICAgIFxcXCI6PVxcXCIgUnVsZUJvZHkgIC0tIG92ZXJyaWRlXFxuICAgIHwgaWRlbnQgRm9ybWFscz8gICAgICAgICAgICBcXFwiKz1cXFwiIFJ1bGVCb2R5ICAtLSBleHRlbmRcXG5cXG4gIFJ1bGVCb2R5XFxuICAgID0gXFxcInxcXFwiPyBOb25lbXB0eUxpc3RPZjxUb3BMZXZlbFRlcm0sIFxcXCJ8XFxcIj5cXG5cXG4gIFRvcExldmVsVGVybVxcbiAgICA9IFNlcSBjYXNlTmFtZSAgLS0gaW5saW5lXFxuICAgIHwgU2VxXFxuXFxuICBGb3JtYWxzXFxuICAgID0gXFxcIjxcXFwiIExpc3RPZjxpZGVudCwgXFxcIixcXFwiPiBcXFwiPlxcXCJcXG5cXG4gIFBhcmFtc1xcbiAgICA9IFxcXCI8XFxcIiBMaXN0T2Y8U2VxLCBcXFwiLFxcXCI+IFxcXCI+XFxcIlxcblxcbiAgQWx0XFxuICAgID0gTm9uZW1wdHlMaXN0T2Y8U2VxLCBcXFwifFxcXCI+XFxuXFxuICBTZXFcXG4gICAgPSBJdGVyKlxcblxcbiAgSXRlclxcbiAgICA9IFByZWQgXFxcIipcXFwiICAtLSBzdGFyXFxuICAgIHwgUHJlZCBcXFwiK1xcXCIgIC0tIHBsdXNcXG4gICAgfCBQcmVkIFxcXCI/XFxcIiAgLS0gb3B0XFxuICAgIHwgUHJlZFxcblxcbiAgUHJlZFxcbiAgICA9IFxcXCJ+XFxcIiBMZXggIC0tIG5vdFxcbiAgICB8IFxcXCImXFxcIiBMZXggIC0tIGxvb2thaGVhZFxcbiAgICB8IExleFxcblxcbiAgTGV4XFxuICAgID0gXFxcIiNcXFwiIEJhc2UgIC0tIGxleFxcbiAgICB8IEJhc2VcXG5cXG4gIEJhc2VcXG4gICAgPSBpZGVudCBQYXJhbXM/IH4ocnVsZURlc2NyPyBcXFwiPVxcXCIgfCBcXFwiOj1cXFwiIHwgXFxcIis9XFxcIikgIC0tIGFwcGxpY2F0aW9uXFxuICAgIHwgdGVybWluYWwgXFxcIi4uXFxcIiB0ZXJtaW5hbCAgICAgICAgICAgICAgICAgICAgICAgICAtLSByYW5nZVxcbiAgICB8IHRlcm1pbmFsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0gdGVybWluYWxcXG4gICAgfCBcXFwiKFxcXCIgQWx0IFxcXCIpXFxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tIHBhcmVuXFxuXFxuICBydWxlRGVzY3IgIChhIHJ1bGUgZGVzY3JpcHRpb24pXFxuICAgID0gXFxcIihcXFwiIHJ1bGVEZXNjclRleHQgXFxcIilcXFwiXFxuXFxuICBydWxlRGVzY3JUZXh0XFxuICAgID0gKH5cXFwiKVxcXCIgYW55KSpcXG5cXG4gIGNhc2VOYW1lXFxuICAgID0gXFxcIi0tXFxcIiAoflxcXCJcXFxcblxcXCIgc3BhY2UpKiBuYW1lICh+XFxcIlxcXFxuXFxcIiBzcGFjZSkqIChcXFwiXFxcXG5cXFwiIHwgJlxcXCJ9XFxcIilcXG5cXG4gIG5hbWUgIChhIG5hbWUpXFxuICAgID0gbmFtZUZpcnN0IG5hbWVSZXN0KlxcblxcbiAgbmFtZUZpcnN0XFxuICAgID0gXFxcIl9cXFwiXFxuICAgIHwgbGV0dGVyXFxuXFxuICBuYW1lUmVzdFxcbiAgICA9IFxcXCJfXFxcIlxcbiAgICB8IGFsbnVtXFxuXFxuICBpZGVudCAgKGFuIGlkZW50aWZpZXIpXFxuICAgID0gbmFtZVxcblxcbiAgdGVybWluYWxcXG4gICAgPSBcXFwiXFxcXFxcXCJcXFwiIHRlcm1pbmFsQ2hhciogXFxcIlxcXFxcXFwiXFxcIlxcblxcbiAgdGVybWluYWxDaGFyXFxuICAgID0gZXNjYXBlQ2hhclxcbiAgICB8IH5cXFwiXFxcXFxcXFxcXFwiIH5cXFwiXFxcXFxcXCJcXFwiIH5cXFwiXFxcXG5cXFwiIGFueVxcblxcbiAgZXNjYXBlQ2hhciAgKGFuIGVzY2FwZSBzZXF1ZW5jZSlcXG4gICAgPSBcXFwiXFxcXFxcXFxcXFxcXFxcXFxcXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLS0gYmFja3NsYXNoXFxuICAgIHwgXFxcIlxcXFxcXFxcXFxcXFxcXCJcXFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tIGRvdWJsZVF1b3RlXFxuICAgIHwgXFxcIlxcXFxcXFxcXFxcXCdcXFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tIHNpbmdsZVF1b3RlXFxuICAgIHwgXFxcIlxcXFxcXFxcYlxcXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC0tIGJhY2tzcGFjZVxcbiAgICB8IFxcXCJcXFxcXFxcXG5cXFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSBsaW5lRmVlZFxcbiAgICB8IFxcXCJcXFxcXFxcXHJcXFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSBjYXJyaWFnZVJldHVyblxcbiAgICB8IFxcXCJcXFxcXFxcXHRcXFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtLSB0YWJcXG4gICAgfCBcXFwiXFxcXFxcXFx1XFxcIiBoZXhEaWdpdCBoZXhEaWdpdCBoZXhEaWdpdCBoZXhEaWdpdCAgLS0gdW5pY29kZUVzY2FwZVxcbiAgICB8IFxcXCJcXFxcXFxcXHhcXFwiIGhleERpZ2l0IGhleERpZ2l0ICAgICAgICAgICAgICAgICAgICAtLSBoZXhFc2NhcGVcXG5cXG4gIHNwYWNlXFxuICAgKz0gY29tbWVudFxcblxcbiAgY29tbWVudFxcbiAgICA9IFxcXCIvL1xcXCIgKH5cXFwiXFxcXG5cXFwiIGFueSkqIFxcXCJcXFxcblxcXCIgIC0tIHNpbmdsZUxpbmVcXG4gICAgfCBcXFwiLypcXFwiICh+XFxcIiovXFxcIiBhbnkpKiBcXFwiKi9cXFwiICAtLSBtdWx0aUxpbmVcXG5cXG4gIHRva2VucyA9IHRva2VuKlxcblxcbiAgdG9rZW4gPSBjYXNlTmFtZSB8IGNvbW1lbnQgfCBpZGVudCB8IG9wZXJhdG9yIHwgcHVuY3R1YXRpb24gfCB0ZXJtaW5hbCB8IGFueVxcblxcbiAgb3BlcmF0b3IgPSBcXFwiPDpcXFwiIHwgXFxcIj1cXFwiIHwgXFxcIjo9XFxcIiB8IFxcXCIrPVxcXCIgfCBcXFwiKlxcXCIgfCBcXFwiK1xcXCIgfCBcXFwiP1xcXCIgfCBcXFwiflxcXCIgfCBcXFwiJlxcXCJcXG5cXG4gIHB1bmN0dWF0aW9uID0gXFxcIjxcXFwiIHwgXFxcIj5cXFwiIHwgXFxcIixcXFwiIHwgXFxcIi0tXFxcIlxcbn1cIn0sXCJPaG1cIixudWxsLFwiR3JhbW1hcnNcIix7XCJHcmFtbWFyc1wiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzksMzJdfSxudWxsLFtdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNCwzMl19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzI0LDMxXX0sXCJHcmFtbWFyXCIsW11dXV0sXCJHcmFtbWFyXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzYsODNdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzUwLDgzXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTAsNTVdfSxcImlkZW50XCIsW11dLFtcIm9wdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzU2LDY5XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTYsNjhdfSxcIlN1cGVyR3JhbW1hclwiLFtdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3MCw3M119LFwie1wiXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzQsNzldfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3NCw3OF19LFwiUnVsZVwiLFtdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls4MCw4M119LFwifVwiXV1dLFwiU3VwZXJHcmFtbWFyXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODcsMTE2XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMDYsMTE2XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMDYsMTEwXX0sXCI8OlwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTEsMTE2XX0sXCJpZGVudFwiLFtdXV1dLFwiUnVsZV9kZWZpbmVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzEsMTgxXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzEsMTcwXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTMxLDEzNl19LFwiaWRlbnRcIixbXV0sW1wib3B0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTM3LDE0NV19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzNywxNDRdfSxcIkZvcm1hbHNcIixbXV1dLFtcIm9wdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0NiwxNTZdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDYsMTU1XX0sXCJydWxlRGVzY3JcIixbXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTU3LDE2MF19LFwiPVwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNjIsMTcwXX0sXCJSdWxlQm9keVwiLFtdXV1dLFwiUnVsZV9vdmVycmlkZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE4OCwyNDBdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE4OCwyMjddfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxODgsMTkzXX0sXCJpZGVudFwiLFtdXSxbXCJvcHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTQsMjAyXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTk0LDIwMV19LFwiRm9ybWFsc1wiLFtdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTQsMjE4XX0sXCI6PVwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTksMjI3XX0sXCJSdWxlQm9keVwiLFtdXV1dLFwiUnVsZV9leHRlbmRcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNDcsMjk3XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNDcsMjg2XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjQ3LDI1Ml19LFwiaWRlbnRcIixbXV0sW1wib3B0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjUzLDI2MV19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzI1MywyNjBdfSxcIkZvcm1hbHNcIixbXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjczLDI3N119LFwiKz1cIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjc4LDI4Nl19LFwiUnVsZUJvZHlcIixbXV1dXSxcIlJ1bGVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjAsMjk3XX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzEsMjk3XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTMxLDE3MF19LFwiUnVsZV9kZWZpbmVcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTg4LDIyN119LFwiUnVsZV9vdmVycmlkZVwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNDcsMjg2XX0sXCJSdWxlX2V4dGVuZFwiLFtdXV1dLFwiUnVsZUJvZHlcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszMDEsMzU0XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszMTYsMzU0XX0sW1wib3B0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzE2LDMyMF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzE2LDMxOV19LFwifFwiXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzIxLDM1NF19LFwiTm9uZW1wdHlMaXN0T2ZcIixbW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzM2LDM0OF19LFwiVG9wTGV2ZWxUZXJtXCIsW11dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzUwLDM1M119LFwifFwiXV1dXV0sXCJUb3BMZXZlbFRlcm1faW5saW5lXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzc3LDQwMF19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzc3LDM4OV19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzM3NywzODBdfSxcIlNlcVwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlszODEsMzg5XX0sXCJjYXNlTmFtZVwiLFtdXV1dLFwiVG9wTGV2ZWxUZXJtXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzU4LDQxMF19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMzc3LDQxMF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzM3NywzODldfSxcIlRvcExldmVsVGVybV9pbmxpbmVcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDA3LDQxMF19LFwiU2VxXCIsW11dXV0sXCJGb3JtYWxzXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDE0LDQ1NF19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDI4LDQ1NF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDI4LDQzMV19LFwiPFwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0MzIsNDUwXX0sXCJMaXN0T2ZcIixbW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNDM5LDQ0NF19LFwiaWRlbnRcIixbXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NDYsNDQ5XX0sXCIsXCJdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NTEsNDU0XX0sXCI+XCJdXV0sXCJQYXJhbXNcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NTgsNDk1XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NzEsNDk1XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0NzEsNDc0XX0sXCI8XCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzQ3NSw0OTFdfSxcIkxpc3RPZlwiLFtbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0ODIsNDg1XX0sXCJTZXFcIixbXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0ODcsNDkwXX0sXCIsXCJdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0OTIsNDk1XX0sXCI+XCJdXV0sXCJBbHRcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls0OTksNTMzXX0sbnVsbCxbXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1MDksNTMzXX0sXCJOb25lbXB0eUxpc3RPZlwiLFtbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1MjQsNTI3XX0sXCJTZXFcIixbXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1MjksNTMyXX0sXCJ8XCJdXV1dLFwiU2VxXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTM3LDU1Ml19LG51bGwsW10sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6WzU0Nyw1NTJdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NDcsNTUxXX0sXCJJdGVyXCIsW11dXV0sXCJJdGVyX3N0YXJcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NjcsNTg0XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NjcsNTc1XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTY3LDU3MV19LFwiUHJlZFwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzU3Miw1NzVdfSxcIipcIl1dXSxcIkl0ZXJfcGx1c1wiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzU5MSw2MDhdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzU5MSw1OTldfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1OTEsNTk1XX0sXCJQcmVkXCIsW11dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTk2LDU5OV19LFwiK1wiXV1dLFwiSXRlcl9vcHRcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MTUsNjMxXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MTUsNjIzXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjE1LDYxOV19LFwiUHJlZFwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzYyMCw2MjNdfSxcIj9cIl1dXSxcIkl0ZXJcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NTYsNjQyXX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls1NjcsNjQyXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNTY3LDU3NV19LFwiSXRlcl9zdGFyXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzU5MSw1OTldfSxcIkl0ZXJfcGx1c1wiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MTUsNjIzXX0sXCJJdGVyX29wdFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls2MzgsNjQyXX0sXCJQcmVkXCIsW11dXV0sXCJQcmVkX25vdFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzY1Nyw2NzJdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzY1Nyw2NjRdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzY1Nyw2NjBdfSxcIn5cIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjYxLDY2NF19LFwiTGV4XCIsW11dXV0sXCJQcmVkX2xvb2thaGVhZFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzY3OSw3MDBdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzY3OSw2ODZdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzY3OSw2ODJdfSxcIiZcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjgzLDY4Nl19LFwiTGV4XCIsW11dXV0sXCJQcmVkXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjQ2LDcxMF19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNjU3LDcxMF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzY1Nyw2NjRdfSxcIlByZWRfbm90XCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzY3OSw2ODZdfSxcIlByZWRfbG9va2FoZWFkXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzcwNyw3MTBdfSxcIkxleFwiLFtdXV1dLFwiTGV4X2xleFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzcyNCw3NDBdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzcyNCw3MzJdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzcyNCw3MjddfSxcIiNcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzI4LDczMl19LFwiQmFzZVwiLFtdXV1dLFwiTGV4XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzE0LDc1MV19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzI0LDc1MV19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzcyNCw3MzJdfSxcIkxleF9sZXhcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzQ3LDc1MV19LFwiQmFzZVwiLFtdXV1dLFwiQmFzZV9hcHBsaWNhdGlvblwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc2Niw4MjddfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc2Niw4MTFdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3NjYsNzcxXX0sXCJpZGVudFwiLFtdXSxbXCJvcHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3NzIsNzc5XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzcyLDc3OF19LFwiUGFyYW1zXCIsW11dXSxbXCJub3RcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3ODAsODExXX0sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzgyLDgxMF19LFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc4Miw3OTZdfSxbXCJvcHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3ODIsNzkyXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzgyLDc5MV19LFwicnVsZURlc2NyXCIsW11dXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc5Myw3OTZdfSxcIj1cIl1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbNzk5LDgwM119LFwiOj1cIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls4MDYsODEwXX0sXCIrPVwiXV1dXV0sXCJCYXNlX3JhbmdlXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODM0LDg4OV19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODM0LDg1Nl19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzgzNCw4NDJdfSxcInRlcm1pbmFsXCIsW11dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODQzLDg0N119LFwiLi5cIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODQ4LDg1Nl19LFwidGVybWluYWxcIixbXV1dXSxcIkJhc2VfdGVybWluYWxcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls4OTYsOTU0XX0sbnVsbCxbXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls4OTYsOTA0XX0sXCJ0ZXJtaW5hbFwiLFtdXV0sXCJCYXNlX3BhcmVuXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbOTYxLDEwMTZdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzk2MSw5NzJdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzk2MSw5NjRdfSxcIihcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbOTY1LDk2OF19LFwiQWx0XCIsW11dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbOTY5LDk3Ml19LFwiKVwiXV1dLFwiQmFzZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc1NSwxMDE2XX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls3NjYsMTAxNl19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzc2Niw4MTFdfSxcIkJhc2VfYXBwbGljYXRpb25cIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODM0LDg1Nl19LFwiQmFzZV9yYW5nZVwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOls4OTYsOTA0XX0sXCJCYXNlX3Rlcm1pbmFsXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6Wzk2MSw5NzJdfSxcIkJhc2VfcGFyZW5cIixbXV1dXSxcInJ1bGVEZXNjclwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEwMjAsMTA3OV19LFwiYSBydWxlIGRlc2NyaXB0aW9uXCIsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTA1OCwxMDc5XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMDU4LDEwNjFdfSxcIihcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTA2MiwxMDc1XX0sXCJydWxlRGVzY3JUZXh0XCIsW11dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTA3NiwxMDc5XX0sXCIpXCJdXV0sXCJydWxlRGVzY3JUZXh0XCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTA4MywxMTE0XX0sbnVsbCxbXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTEwMywxMTE0XX0sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTEwNCwxMTEyXX0sW1wibm90XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTEwNCwxMTA4XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTA1LDExMDhdfSxcIilcIl1dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMDksMTExMl19LFwiYW55XCIsW11dXV1dLFwiY2FzZU5hbWVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTE4LDExODZdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzExMzMsMTE4Nl19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTEzMywxMTM3XX0sXCItLVwiXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTEzOCwxMTUyXX0sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTEzOSwxMTUwXX0sW1wibm90XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTEzOSwxMTQ0XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTQwLDExNDRdfSxcIlxcblwiXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE0NSwxMTUwXX0sXCJzcGFjZVwiLFtdXV1dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNTMsMTE1N119LFwibmFtZVwiLFtdXSxbXCJzdGFyXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE1OCwxMTcyXX0sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE1OSwxMTcwXX0sW1wibm90XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE1OSwxMTY0XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTYwLDExNjRdfSxcIlxcblwiXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE2NSwxMTcwXX0sXCJzcGFjZVwiLFtdXV1dLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzExNzQsMTE4NV19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE3NCwxMTc4XX0sXCJcXG5cIl0sW1wibG9va2FoZWFkXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE4MSwxMTg1XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMTgyLDExODVdfSxcIn1cIl1dXV1dLFwibmFtZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzExOTAsMTIzMF19LFwiYSBuYW1lXCIsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTIxMSwxMjMwXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTIxMSwxMjIwXX0sXCJuYW1lRmlyc3RcIixbXV0sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyMjEsMTIzMF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyMjEsMTIyOV19LFwibmFtZVJlc3RcIixbXV1dXV0sXCJuYW1lRmlyc3RcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjM0LDEyNjZdfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyNTAsMTI2Nl19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTI1MCwxMjUzXX0sXCJfXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyNjAsMTI2Nl19LFwibGV0dGVyXCIsW11dXV0sXCJuYW1lUmVzdFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEyNzAsMTMwMF19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTI4NSwxMzAwXX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjg1LDEyODhdfSxcIl9cIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTI5NSwxMzAwXX0sXCJhbG51bVwiLFtdXV1dLFwiaWRlbnRcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzA0LDEzMzddfSxcImFuIGlkZW50aWZpZXJcIixbXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzMzLDEzMzddfSxcIm5hbWVcIixbXV1dLFwidGVybWluYWxcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzQxLDEzNzldfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzNTYsMTM3OV19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTM1NiwxMzYwXX0sXCJcXFwiXCJdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzYxLDEzNzRdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzYxLDEzNzNdfSxcInRlcm1pbmFsQ2hhclwiLFtdXV0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMzc1LDEzNzldfSxcIlxcXCJcIl1dXSxcInRlcm1pbmFsQ2hhclwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzODMsMTQ0MF19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQwMiwxNDQwXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQwMiwxNDEyXX0sXCJlc2NhcGVDaGFyXCIsW11dLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MTksMTQ0MF19LFtcIm5vdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MTksMTQyNF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQyMCwxNDI0XX0sXCJcXFxcXCJdXSxbXCJub3RcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDI1LDE0MzBdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MjYsMTQzMF19LFwiXFxcIlwiXV0sW1wibm90XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQzMSwxNDM2XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDMyLDE0MzZdfSxcIlxcblwiXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTQzNywxNDQwXX0sXCJhbnlcIixbXV1dXV0sXCJlc2NhcGVDaGFyX2JhY2tzbGFzaFwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0ODMsMTUzOF19LG51bGwsW10sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDgzLDE0ODldfSxcIlxcXFxcXFxcXCJdXSxcImVzY2FwZUNoYXJfZG91YmxlUXVvdGVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNTQ1LDE2MDJdfSxudWxsLFtdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTU0NSwxNTUxXX0sXCJcXFxcXFxcIlwiXV0sXCJlc2NhcGVDaGFyX3NpbmdsZVF1b3RlXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTYwOSwxNjY2XX0sbnVsbCxbXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE2MDksMTYxNV19LFwiXFxcXCdcIl1dLFwiZXNjYXBlQ2hhcl9iYWNrc3BhY2VcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNjczLDE3MjhdfSxudWxsLFtdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTY3MywxNjc4XX0sXCJcXFxcYlwiXV0sXCJlc2NhcGVDaGFyX2xpbmVGZWVkXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTczNSwxNzg5XX0sbnVsbCxbXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE3MzUsMTc0MF19LFwiXFxcXG5cIl1dLFwiZXNjYXBlQ2hhcl9jYXJyaWFnZVJldHVyblwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE3OTYsMTg1Nl19LG51bGwsW10sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNzk2LDE4MDFdfSxcIlxcXFxyXCJdXSxcImVzY2FwZUNoYXJfdGFiXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTg2MywxOTEyXX0sbnVsbCxbXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE4NjMsMTg2OF19LFwiXFxcXHRcIl1dLFwiZXNjYXBlQ2hhcl91bmljb2RlRXNjYXBlXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTkxOSwxOTc4XX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTE5LDE5NjBdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5MTksMTkyNF19LFwiXFxcXHVcIl0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTkyNSwxOTMzXX0sXCJoZXhEaWdpdFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTM0LDE5NDJdfSxcImhleERpZ2l0XCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5NDMsMTk1MV19LFwiaGV4RGlnaXRcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTk1MiwxOTYwXX0sXCJoZXhEaWdpdFwiLFtdXV1dLFwiZXNjYXBlQ2hhcl9oZXhFc2NhcGVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTg1LDIwNDBdfSxudWxsLFtdLFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzE5ODUsMjAwOF19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTk4NSwxOTkwXX0sXCJcXFxceFwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTkxLDE5OTldfSxcImhleERpZ2l0XCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIwMDAsMjAwOF19LFwiaGV4RGlnaXRcIixbXV1dXSxcImVzY2FwZUNoYXJcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDQ0LDIwNDBdfSxcImFuIGVzY2FwZSBzZXF1ZW5jZVwiLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0ODMsMjA0MF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0ODMsMTQ4OV19LFwiZXNjYXBlQ2hhcl9iYWNrc2xhc2hcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTU0NSwxNTUxXX0sXCJlc2NhcGVDaGFyX2RvdWJsZVF1b3RlXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE2MDksMTYxNV19LFwiZXNjYXBlQ2hhcl9zaW5nbGVRdW90ZVwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNjczLDE2NzhdfSxcImVzY2FwZUNoYXJfYmFja3NwYWNlXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE3MzUsMTc0MF19LFwiZXNjYXBlQ2hhcl9saW5lRmVlZFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNzk2LDE4MDFdfSxcImVzY2FwZUNoYXJfY2FycmlhZ2VSZXR1cm5cIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTg2MywxODY4XX0sXCJlc2NhcGVDaGFyX3RhYlwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTE5LDE5NjBdfSxcImVzY2FwZUNoYXJfdW5pY29kZUVzY2FwZVwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTg1LDIwMDhdfSxcImVzY2FwZUNoYXJfaGV4RXNjYXBlXCIsW11dXV0sXCJzcGFjZVwiOltcImV4dGVuZFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIwNDQsMjA2M119LG51bGwsW10sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA1NiwyMDYzXX0sXCJjb21tZW50XCIsW11dXSxcImNvbW1lbnRfc2luZ2xlTGluZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIwODEsMjExOF19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA4MSwyMTAzXX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDgxLDIwODVdfSxcIi8vXCJdLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDg2LDIwOThdfSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDg3LDIwOTZdfSxbXCJub3RcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDg3LDIwOTJdfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIwODgsMjA5Ml19LFwiXFxuXCJdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDkzLDIwOTZdfSxcImFueVwiLFtdXV1dLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjA5OSwyMTAzXX0sXCJcXG5cIl1dXSxcImNvbW1lbnRfbXVsdGlMaW5lXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjEyNSwyMTYxXX0sbnVsbCxbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTI1LDIxNDddfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMjUsMjEyOV19LFwiLypcIl0sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMzAsMjE0Ml19LFtcInNlcVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMzEsMjE0MF19LFtcIm5vdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMzEsMjEzNl19LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjEzMiwyMTM2XX0sXCIqL1wiXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjEzNywyMTQwXX0sXCJhbnlcIixbXV1dXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxNDMsMjE0N119LFwiKi9cIl1dXSxcImNvbW1lbnRcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDY3LDIxNjFdfSxudWxsLFtdLFtcImFsdFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIwODEsMjE2MV19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIwODEsMjEwM119LFwiY29tbWVudF9zaW5nbGVMaW5lXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxMjUsMjE0N119LFwiY29tbWVudF9tdWx0aUxpbmVcIixbXV1dXSxcInRva2Vuc1wiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxNjUsMjE4MF19LG51bGwsW10sW1wic3RhclwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxNzQsMjE4MF19LFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxNzQsMjE3OV19LFwidG9rZW5cIixbXV1dXSxcInRva2VuXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjE4NCwyMjYwXX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTkyLDIyNjBdfSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMTkyLDIyMDBdfSxcImNhc2VOYW1lXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyMDMsMjIxMF19LFwiY29tbWVudFwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjEzLDIyMThdfSxcImlkZW50XCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyMjEsMjIyOV19LFwib3BlcmF0b3JcIixbXV0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjIzMiwyMjQzXX0sXCJwdW5jdHVhdGlvblwiLFtdXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjQ2LDIyNTRdfSxcInRlcm1pbmFsXCIsW11dLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyNTcsMjI2MF19LFwiYW55XCIsW11dXV0sXCJvcGVyYXRvclwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyNjQsMjMyOV19LG51bGwsW10sW1wiYWx0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjI3NSwyMzI5XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjc1LDIyNzldfSxcIjw6XCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjI4MiwyMjg1XX0sXCI9XCJdLFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjI4OCwyMjkyXX0sXCI6PVwiXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIyOTUsMjI5OV19LFwiKz1cIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzAyLDIzMDVdfSxcIipcIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzA4LDIzMTFdfSxcIitcIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzE0LDIzMTddfSxcIj9cIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzIwLDIzMjNdfSxcIn5cIl0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzI2LDIzMjldfSxcIiZcIl1dXSxcInB1bmN0dWF0aW9uXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjMzMywyMzY5XX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMzQ3LDIzNjldfSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIzNDcsMjM1MF19LFwiPFwiXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIzNTMsMjM1Nl19LFwiPlwiXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIzNTksMjM2Ml19LFwiLFwiXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIzNjUsMjM2OV19LFwiLS1cIl1dXX1dKTtcbiIsInZhciBvaG0gPSByZXF1aXJlKCcuLicpO1xubW9kdWxlLmV4cG9ydHMgPSBvaG0ubWFrZVJlY2lwZShbXCJncmFtbWFyXCIse1wic291cmNlXCI6XCJPcGVyYXRpb25zQW5kQXR0cmlidXRlcyB7XFxuXFxuICBBdHRyaWJ1dGVTaWduYXR1cmUgPVxcbiAgICBuYW1lXFxuXFxuICBPcGVyYXRpb25TaWduYXR1cmUgPVxcbiAgICBuYW1lIEZvcm1hbHM/XFxuXFxuICBGb3JtYWxzXFxuICAgID0gXFxcIihcXFwiIExpc3RPZjxuYW1lLCBcXFwiLFxcXCI+IFxcXCIpXFxcIlxcblxcbiAgbmFtZSAgKGEgbmFtZSlcXG4gICAgPSBuYW1lRmlyc3QgbmFtZVJlc3QqXFxuXFxuICBuYW1lRmlyc3RcXG4gICAgPSBcXFwiX1xcXCJcXG4gICAgfCBsZXR0ZXJcXG5cXG4gIG5hbWVSZXN0XFxuICAgID0gXFxcIl9cXFwiXFxuICAgIHwgYWxudW1cXG5cXG59XCJ9LFwiT3BlcmF0aW9uc0FuZEF0dHJpYnV0ZXNcIixudWxsLFwiQXR0cmlidXRlU2lnbmF0dXJlXCIse1wiQXR0cmlidXRlU2lnbmF0dXJlXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMjksNThdfSxudWxsLFtdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzU0LDU4XX0sXCJuYW1lXCIsW11dXSxcIk9wZXJhdGlvblNpZ25hdHVyZVwiOltcImRlZmluZVwiLHtcInNvdXJjZUludGVydmFsXCI6WzYyLDEwMF19LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODcsMTAwXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbODcsOTFdfSxcIm5hbWVcIixbXV0sW1wib3B0XCIse1wic291cmNlSW50ZXJ2YWxcIjpbOTIsMTAwXX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbOTIsOTldfSxcIkZvcm1hbHNcIixbXV1dXV0sXCJGb3JtYWxzXCI6W1wiZGVmaW5lXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTA0LDE0M119LG51bGwsW10sW1wic2VxXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE4LDE0M119LFtcInRlcm1pbmFsXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTE4LDEyMV19LFwiKFwiXSxbXCJhcHBcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxMjIsMTM5XX0sXCJMaXN0T2ZcIixbW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTI5LDEzM119LFwibmFtZVwiLFtdXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzEzNSwxMzhdfSxcIixcIl1dXSxbXCJ0ZXJtaW5hbFwiLHtcInNvdXJjZUludGVydmFsXCI6WzE0MCwxNDNdfSxcIilcIl1dXSxcIm5hbWVcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNDcsMTg3XX0sXCJhIG5hbWVcIixbXSxbXCJzZXFcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNjgsMTg3XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTY4LDE3N119LFwibmFtZUZpcnN0XCIsW11dLFtcInN0YXJcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxNzgsMTg3XX0sW1wiYXBwXCIse1wic291cmNlSW50ZXJ2YWxcIjpbMTc4LDE4Nl19LFwibmFtZVJlc3RcIixbXV1dXV0sXCJuYW1lRmlyc3RcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsxOTEsMjIzXX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDcsMjIzXX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMDcsMjEwXX0sXCJfXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzIxNywyMjNdfSxcImxldHRlclwiLFtdXV1dLFwibmFtZVJlc3RcIjpbXCJkZWZpbmVcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyMjcsMjU3XX0sbnVsbCxbXSxbXCJhbHRcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNDIsMjU3XX0sW1widGVybWluYWxcIix7XCJzb3VyY2VJbnRlcnZhbFwiOlsyNDIsMjQ1XX0sXCJfXCJdLFtcImFwcFwiLHtcInNvdXJjZUludGVydmFsXCI6WzI1MiwyNTddfSxcImFsbnVtXCIsW11dXV19XSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0b0FTVDogcmVxdWlyZSgnLi9zZW1hbnRpY3MtdG9BU1QnKS5oZWxwZXIsXG4gIHNlbWFudGljc0ZvclRvQVNUOiByZXF1aXJlKCcuL3NlbWFudGljcy10b0FTVCcpLnNlbWFudGljc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuLi9zcmMvcGV4cHJzJyk7XG52YXIgTWF0Y2hSZXN1bHQgPSByZXF1aXJlKCcuLi9zcmMvTWF0Y2hSZXN1bHQnKTtcbnZhciBHcmFtbWFyID0gcmVxdWlyZSgnLi4vc3JjL0dyYW1tYXInKTtcbnZhciBleHRlbmQgPSByZXF1aXJlKCd1dGlsLWV4dGVuZCcpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGRlZmF1bHRPcGVyYXRpb24gPSB7XG4gIF90ZXJtaW5hbDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJpbWl0aXZlVmFsdWU7XG4gIH0sXG5cbiAgX25vbnRlcm1pbmFsOiBmdW5jdGlvbihjaGlsZHJlbikge1xuICAgIHZhciBjdG9yTmFtZSA9IHRoaXMuX25vZGUuY3Rvck5hbWU7XG4gICAgdmFyIG1hcHBpbmcgPSB0aGlzLmFyZ3MubWFwcGluZztcblxuICAgIC8vIHdpdGhvdXQgY3VzdG9taXphdGlvblxuICAgIGlmICghbWFwcGluZy5oYXNPd25Qcm9wZXJ0eShjdG9yTmFtZSkpIHtcbiAgICAgIC8vIGludGVybWVkaWF0ZSBub2RlXG4gICAgICBpZiAodGhpcy5fbm9kZSBpbnN0YW5jZW9mIHBleHBycy5BbHQgfHwgdGhpcy5fbm9kZSBpbnN0YW5jZW9mIHBleHBycy5BcHBseSkge1xuICAgICAgICByZXR1cm4gY2hpbGRyZW5bMF0udG9BU1QobWFwcGluZyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGxleGljYWwgcnVsZVxuICAgICAgaWYgKHRoaXMuaXNMZXhpY2FsKCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlU3RyaW5nO1xuICAgICAgfVxuXG4gICAgICAvLyBzaW5ndWxhciBub2RlIChlLmcuIG9ubHkgc3Vycm91bmRlZCBieSBsaXRlcmFscyBvciBsb29rYWhlYWRzKVxuICAgICAgdmFyIHJlYWxDaGlsZHJlbiA9IGNoaWxkcmVuLmZpbHRlcihmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICByZXR1cm4gIWNoaWxkLmlzVGVybWluYWwoKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHJlYWxDaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHJlYWxDaGlsZHJlblswXS50b0FTVChtYXBwaW5nKTtcbiAgICAgIH1cblxuICAgICAgLy8gcmVzdDogdGVybXMgd2l0aCBtdWx0aXBsZSBjaGlsZHJlblxuICAgIH1cblxuICAgIC8vIGRpcmVjdCBmb3J3YXJkXG4gICAgaWYgKHR5cGVvZiBtYXBwaW5nW2N0b3JOYW1lXSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBjaGlsZHJlblttYXBwaW5nW2N0b3JOYW1lXV0udG9BU1QobWFwcGluZyk7XG4gICAgfVxuXG4gICAgLy8gbmFtZWQvbWFwcGVkIGNoaWxkcmVuIG9yIHVubmFtZWQgY2hpbGRyZW4gKCcwJywgJzEnLCAnMicsIC4uLilcbiAgICB2YXIgcHJvcE1hcCA9IG1hcHBpbmdbY3Rvck5hbWVdIHx8IGNoaWxkcmVuO1xuICAgIHZhciBub2RlID0ge1xuICAgICAgdHlwZTogY3Rvck5hbWVcbiAgICB9O1xuICAgIGZvciAodmFyIHByb3AgaW4gcHJvcE1hcCkge1xuICAgICAgdmFyIG1hcHBlZFByb3AgPSBtYXBwaW5nW2N0b3JOYW1lXSAmJiBtYXBwaW5nW2N0b3JOYW1lXVtwcm9wXTtcbiAgICAgIGlmICh0eXBlb2YgbWFwcGVkUHJvcCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgLy8gZGlyZWN0IGZvcndhcmRcbiAgICAgICAgbm9kZVtwcm9wXSA9IGNoaWxkcmVuW21hcHBlZFByb3BdLnRvQVNUKG1hcHBpbmcpO1xuICAgICAgfSBlbHNlIGlmICgodHlwZW9mIG1hcHBlZFByb3AgPT09ICdzdHJpbmcnKSB8fCAodHlwZW9mIG1hcHBlZFByb3AgPT09ICdib29sZWFuJykgfHxcbiAgICAgICAgICAobWFwcGVkUHJvcCA9PT0gbnVsbCkpIHtcbiAgICAgICAgLy8gcHJpbWl0aXZlIHZhbHVlXG4gICAgICAgIG5vZGVbcHJvcF0gPSBtYXBwZWRQcm9wO1xuICAgICAgfSBlbHNlIGlmICgodHlwZW9mIG1hcHBlZFByb3AgPT09ICdvYmplY3QnKSAmJiAobWFwcGVkUHJvcCBpbnN0YW5jZW9mIE51bWJlcikpIHtcbiAgICAgICAgLy8gcHJpbWl0aXZlIG51bWJlciAobXVzdCBiZSB1bmJveGVkKVxuICAgICAgICBub2RlW3Byb3BdID0gTnVtYmVyKG1hcHBlZFByb3ApO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWFwcGVkUHJvcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBjb21wdXRlZCB2YWx1ZVxuICAgICAgICBub2RlW3Byb3BdID0gbWFwcGVkUHJvcC5jYWxsKHRoaXMsIGNoaWxkcmVuKTtcbiAgICAgIH0gZWxzZSBpZiAobWFwcGVkUHJvcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChjaGlsZHJlbltwcm9wXSAmJiAhY2hpbGRyZW5bcHJvcF0uaXNUZXJtaW5hbCgpKSB7XG4gICAgICAgICAgbm9kZVtwcm9wXSA9IGNoaWxkcmVuW3Byb3BdLnRvQVNUKG1hcHBpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGRlbGV0ZSBwcmVkZWZpbmVkICd0eXBlJyBwcm9wZXJ0aWVzLCBsaWtlICd0eXBlJywgaWYgZXhwbGljaXRlbHkgcmVtb3ZlZFxuICAgICAgICAgIGRlbGV0ZSBub2RlW3Byb3BdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9LFxuXG4gIF9pdGVyOiBmdW5jdGlvbihjaGlsZHJlbikge1xuICAgIGlmICh0aGlzLl9ub2RlLmlzT3B0aW9uYWwoKSkge1xuICAgICAgaWYgKHRoaXMubnVtQ2hpbGRyZW4gPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2hpbGRyZW5bMF0udG9BU1QodGhpcy5hcmdzLm1hcHBpbmcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjaGlsZHJlbi5tYXAoZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIHJldHVybiBjaGlsZC50b0FTVCh0aGlzLmFyZ3MubWFwcGluZyk7XG4gICAgfSwgdGhpcyk7XG4gIH0sXG5cbiAgTm9uZW1wdHlMaXN0T2Y6IGZ1bmN0aW9uKGZpcnN0LCBzZXAsIHJlc3QpIHtcbiAgICByZXR1cm4gW2ZpcnN0LnRvQVNUKHRoaXMuYXJncy5tYXBwaW5nKV0uY29uY2F0KHJlc3QudG9BU1QodGhpcy5hcmdzLm1hcHBpbmcpKTtcbiAgfSxcblxuICBFbXB0eUxpc3RPZjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG59O1xuXG4vLyBSZXR1cm5zIGEgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3QgdGhhdCBpbmNsdWRlcyBhbiBhYnN0cmFjdCBzeW50YXggdHJlZSAoQVNUKVxuLy8gZm9yIHRoZSBnaXZlbiBtYXRjaCByZXN1bHQgYHJlc2AgY29udGFpbmcgYSBjb25jcmV0ZSBzeW50YXggdHJlZSAoQ1NUKSBhbmQgZ3JhbW1hci5cbi8vIFRoZSBvcHRpb25hbCBgbWFwcGluZ2AgcGFyYW1ldGVyIGNhbiBiZSB1c2VkIHRvIGN1c3RvbWl6ZSBob3cgdGhlIG5vZGVzIG9mIHRoZSBDU1Rcbi8vIGFyZSBtYXBwZWQgdG8gdGhlIEFTVCAoc2VlIC9kb2MvZXh0cmFzLm1kI3RvYXN0bWF0Y2hyZXN1bHQtbWFwcGluZykuXG5mdW5jdGlvbiB0b0FTVChyZXMsIG1hcHBpbmcpIHtcbiAgaWYgKCEocmVzIGluc3RhbmNlb2YgTWF0Y2hSZXN1bHQpIHx8IHJlcy5mYWlsZWQoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcigndG9BU1QoKSBleHBlY3RzIGEgc3VjY2VzZnVsbCBNYXRjaFJlc3VsdCBhcyBmaXJzdCBwYXJhbWV0ZXInKTtcbiAgfVxuXG4gIG1hcHBpbmcgPSBleHRlbmQoe30sIG1hcHBpbmcpO1xuICB2YXIgb3BlcmF0aW9uID0gZXh0ZW5kKHt9LCBkZWZhdWx0T3BlcmF0aW9uKTtcbiAgZm9yICh2YXIgdGVybU5hbWUgaW4gbWFwcGluZykge1xuICAgIGlmICh0eXBlb2YgbWFwcGluZ1t0ZXJtTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9wZXJhdGlvblt0ZXJtTmFtZV0gPSBtYXBwaW5nW3Rlcm1OYW1lXTtcbiAgICAgIGRlbGV0ZSBtYXBwaW5nW3Rlcm1OYW1lXTtcbiAgICB9XG4gIH1cbiAgdmFyIGcgPSByZXMuX2NzdC5ncmFtbWFyO1xuICB2YXIgcyA9IGcuY3JlYXRlU2VtYW50aWNzKCkuYWRkT3BlcmF0aW9uKCd0b0FTVChtYXBwaW5nKScsIG9wZXJhdGlvbik7XG4gIHJldHVybiBzKHJlcykudG9BU1QobWFwcGluZyk7XG59XG5cbi8vIFJldHVybnMgYSBzZW1hbnRpY3MgY29udGFpbmcgdGhlIHRvQVNUKG1hcHBpbmcpIG9wZXJhdGlvbiBmb3IgdGhlIGdpdmVuIGdyYW1tYXIgZy5cbmZ1bmN0aW9uIHNlbWFudGljc0ZvclRvQVNUKGcpIHtcbiAgaWYgKCEoZyBpbnN0YW5jZW9mIEdyYW1tYXIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZW1hbnRpY3NUb0FTVCgpIGV4cGVjdHMgYSBHcmFtbWFyIGFzIHBhcmFtZXRlcicpO1xuICB9XG5cbiAgcmV0dXJuIGcuY3JlYXRlU2VtYW50aWNzKCkuYWRkT3BlcmF0aW9uKCd0b0FTVChtYXBwaW5nKScsIGRlZmF1bHRPcGVyYXRpb24pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGVscGVyOiB0b0FTVCxcbiAgc2VtYW50aWNzOiBzZW1hbnRpY3NGb3JUb0FTVFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2lnbiAgICAgICAgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9hc3NpZ24nKVxuICAsIG5vcm1hbGl6ZU9wdHMgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9ub3JtYWxpemUtb3B0aW9ucycpXG4gICwgaXNDYWxsYWJsZSAgICA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L2lzLWNhbGxhYmxlJylcbiAgLCBjb250YWlucyAgICAgID0gcmVxdWlyZSgnZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucycpXG5cbiAgLCBkO1xuXG5kID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZHNjciwgdmFsdWUvKiwgb3B0aW9ucyovKSB7XG5cdHZhciBjLCBlLCB3LCBvcHRpb25zLCBkZXNjO1xuXHRpZiAoKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB8fCAodHlwZW9mIGRzY3IgIT09ICdzdHJpbmcnKSkge1xuXHRcdG9wdGlvbnMgPSB2YWx1ZTtcblx0XHR2YWx1ZSA9IGRzY3I7XG5cdFx0ZHNjciA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1syXTtcblx0fVxuXHRpZiAoZHNjciA9PSBudWxsKSB7XG5cdFx0YyA9IHcgPSB0cnVlO1xuXHRcdGUgPSBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRjID0gY29udGFpbnMuY2FsbChkc2NyLCAnYycpO1xuXHRcdGUgPSBjb250YWlucy5jYWxsKGRzY3IsICdlJyk7XG5cdFx0dyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ3cnKTtcblx0fVxuXG5cdGRlc2MgPSB7IHZhbHVlOiB2YWx1ZSwgY29uZmlndXJhYmxlOiBjLCBlbnVtZXJhYmxlOiBlLCB3cml0YWJsZTogdyB9O1xuXHRyZXR1cm4gIW9wdGlvbnMgPyBkZXNjIDogYXNzaWduKG5vcm1hbGl6ZU9wdHMob3B0aW9ucyksIGRlc2MpO1xufTtcblxuZC5ncyA9IGZ1bmN0aW9uIChkc2NyLCBnZXQsIHNldC8qLCBvcHRpb25zKi8pIHtcblx0dmFyIGMsIGUsIG9wdGlvbnMsIGRlc2M7XG5cdGlmICh0eXBlb2YgZHNjciAhPT0gJ3N0cmluZycpIHtcblx0XHRvcHRpb25zID0gc2V0O1xuXHRcdHNldCA9IGdldDtcblx0XHRnZXQgPSBkc2NyO1xuXHRcdGRzY3IgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbM107XG5cdH1cblx0aWYgKGdldCA9PSBudWxsKSB7XG5cdFx0Z2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCFpc0NhbGxhYmxlKGdldCkpIHtcblx0XHRvcHRpb25zID0gZ2V0O1xuXHRcdGdldCA9IHNldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmIChzZXQgPT0gbnVsbCkge1xuXHRcdHNldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICghaXNDYWxsYWJsZShzZXQpKSB7XG5cdFx0b3B0aW9ucyA9IHNldDtcblx0XHRzZXQgPSB1bmRlZmluZWQ7XG5cdH1cblx0aWYgKGRzY3IgPT0gbnVsbCkge1xuXHRcdGMgPSB0cnVlO1xuXHRcdGUgPSBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRjID0gY29udGFpbnMuY2FsbChkc2NyLCAnYycpO1xuXHRcdGUgPSBjb250YWlucy5jYWxsKGRzY3IsICdlJyk7XG5cdH1cblxuXHRkZXNjID0geyBnZXQ6IGdldCwgc2V0OiBzZXQsIGNvbmZpZ3VyYWJsZTogYywgZW51bWVyYWJsZTogZSB9O1xuXHRyZXR1cm4gIW9wdGlvbnMgPyBkZXNjIDogYXNzaWduKG5vcm1hbGl6ZU9wdHMob3B0aW9ucyksIGRlc2MpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2lzLWltcGxlbWVudGVkJykoKVxuXHQ/IE9iamVjdC5hc3NpZ25cblx0OiByZXF1aXJlKCcuL3NoaW0nKTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBhc3NpZ24gPSBPYmplY3QuYXNzaWduLCBvYmo7XG5cdGlmICh0eXBlb2YgYXNzaWduICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gZmFsc2U7XG5cdG9iaiA9IHsgZm9vOiAncmF6JyB9O1xuXHRhc3NpZ24ob2JqLCB7IGJhcjogJ2R3YScgfSwgeyB0cnp5OiAndHJ6eScgfSk7XG5cdHJldHVybiAob2JqLmZvbyArIG9iai5iYXIgKyBvYmoudHJ6eSkgPT09ICdyYXpkd2F0cnp5Jztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzICA9IHJlcXVpcmUoJy4uL2tleXMnKVxuICAsIHZhbHVlID0gcmVxdWlyZSgnLi4vdmFsaWQtdmFsdWUnKVxuXG4gICwgbWF4ID0gTWF0aC5tYXg7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRlc3QsIHNyYy8qLCDigKZzcmNuKi8pIHtcblx0dmFyIGVycm9yLCBpLCBsID0gbWF4KGFyZ3VtZW50cy5sZW5ndGgsIDIpLCBhc3NpZ247XG5cdGRlc3QgPSBPYmplY3QodmFsdWUoZGVzdCkpO1xuXHRhc3NpZ24gPSBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0dHJ5IHsgZGVzdFtrZXldID0gc3JjW2tleV07IH0gY2F0Y2ggKGUpIHtcblx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZTtcblx0XHR9XG5cdH07XG5cdGZvciAoaSA9IDE7IGkgPCBsOyArK2kpIHtcblx0XHRzcmMgPSBhcmd1bWVudHNbaV07XG5cdFx0a2V5cyhzcmMpLmZvckVhY2goYXNzaWduKTtcblx0fVxuXHRpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCkgdGhyb3cgZXJyb3I7XG5cdHJldHVybiBkZXN0O1xufTtcbiIsIi8vIERlcHJlY2F0ZWRcblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbic7IH07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pcy1pbXBsZW1lbnRlZCcpKClcblx0PyBPYmplY3Qua2V5c1xuXHQ6IHJlcXVpcmUoJy4vc2hpbScpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dHJ5IHtcblx0XHRPYmplY3Qua2V5cygncHJpbWl0aXZlJyk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHsgcmV0dXJuIGZhbHNlOyB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIga2V5cyA9IE9iamVjdC5rZXlzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QpIHtcblx0cmV0dXJuIGtleXMob2JqZWN0ID09IG51bGwgPyBvYmplY3QgOiBPYmplY3Qob2JqZWN0KSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG52YXIgcHJvY2VzcyA9IGZ1bmN0aW9uIChzcmMsIG9iaikge1xuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBzcmMpIG9ialtrZXldID0gc3JjW2tleV07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLyosIOKApm9wdGlvbnMqLykge1xuXHR2YXIgcmVzdWx0ID0gY3JlYXRlKG51bGwpO1xuXHRmb3JFYWNoLmNhbGwoYXJndW1lbnRzLCBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdGlmIChvcHRpb25zID09IG51bGwpIHJldHVybjtcblx0XHRwcm9jZXNzKE9iamVjdChvcHRpb25zKSwgcmVzdWx0KTtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRpZiAodmFsdWUgPT0gbnVsbCkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgbnVsbCBvciB1bmRlZmluZWRcIik7XG5cdHJldHVybiB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pcy1pbXBsZW1lbnRlZCcpKClcblx0PyBTdHJpbmcucHJvdG90eXBlLmNvbnRhaW5zXG5cdDogcmVxdWlyZSgnLi9zaGltJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHIgPSAncmF6ZHdhdHJ6eSc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHRpZiAodHlwZW9mIHN0ci5jb250YWlucyAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGZhbHNlO1xuXHRyZXR1cm4gKChzdHIuY29udGFpbnMoJ2R3YScpID09PSB0cnVlKSAmJiAoc3RyLmNvbnRhaW5zKCdmb28nKSA9PT0gZmFsc2UpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbmRleE9mID0gU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWFyY2hTdHJpbmcvKiwgcG9zaXRpb24qLykge1xuXHRyZXR1cm4gaW5kZXhPZi5jYWxsKHRoaXMsIHNlYXJjaFN0cmluZywgYXJndW1lbnRzWzFdKSA+IC0xO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2lzLWltcGxlbWVudGVkJykoKSA/IFN5bWJvbCA6IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHZhbGlkVHlwZXMgPSB7IG9iamVjdDogdHJ1ZSwgc3ltYm9sOiB0cnVlIH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgc3ltYm9sO1xuXHRpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGZhbHNlO1xuXHRzeW1ib2wgPSBTeW1ib2woJ3Rlc3Qgc3ltYm9sJyk7XG5cdHRyeSB7IFN0cmluZyhzeW1ib2wpOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIFJldHVybiAndHJ1ZScgYWxzbyBmb3IgcG9seWZpbGxzXG5cdGlmICghdmFsaWRUeXBlc1t0eXBlb2YgU3ltYm9sLml0ZXJhdG9yXSkgcmV0dXJuIGZhbHNlO1xuXHRpZiAoIXZhbGlkVHlwZXNbdHlwZW9mIFN5bWJvbC50b1ByaW1pdGl2ZV0pIHJldHVybiBmYWxzZTtcblx0aWYgKCF2YWxpZFR5cGVzW3R5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWddKSByZXR1cm4gZmFsc2U7XG5cblx0cmV0dXJuIHRydWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh4KSB7XG5cdGlmICgheCkgcmV0dXJuIGZhbHNlO1xuXHRpZiAodHlwZW9mIHggPT09ICdzeW1ib2wnKSByZXR1cm4gdHJ1ZTtcblx0aWYgKCF4LmNvbnN0cnVjdG9yKSByZXR1cm4gZmFsc2U7XG5cdGlmICh4LmNvbnN0cnVjdG9yLm5hbWUgIT09ICdTeW1ib2wnKSByZXR1cm4gZmFsc2U7XG5cdHJldHVybiAoeFt4LmNvbnN0cnVjdG9yLnRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCcpO1xufTtcbiIsIi8vIEVTMjAxNSBTeW1ib2wgcG9seWZpbGwgZm9yIGVudmlyb25tZW50cyB0aGF0IGRvIG5vdCBzdXBwb3J0IGl0IChvciBwYXJ0aWFsbHkgc3VwcG9ydCBpdClcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZCAgICAgICAgICAgICAgPSByZXF1aXJlKCdkJylcbiAgLCB2YWxpZGF0ZVN5bWJvbCA9IHJlcXVpcmUoJy4vdmFsaWRhdGUtc3ltYm9sJylcblxuICAsIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUsIGRlZmluZVByb3BlcnRpZXMgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllc1xuICAsIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5LCBvYmpQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlXG4gICwgTmF0aXZlU3ltYm9sLCBTeW1ib2xQb2x5ZmlsbCwgSGlkZGVuU3ltYm9sLCBnbG9iYWxTeW1ib2xzID0gY3JlYXRlKG51bGwpXG4gICwgaXNOYXRpdmVTYWZlO1xuXG5pZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuXHROYXRpdmVTeW1ib2wgPSBTeW1ib2w7XG5cdHRyeSB7XG5cdFx0U3RyaW5nKE5hdGl2ZVN5bWJvbCgpKTtcblx0XHRpc05hdGl2ZVNhZmUgPSB0cnVlO1xuXHR9IGNhdGNoIChpZ25vcmUpIHt9XG59XG5cbnZhciBnZW5lcmF0ZU5hbWUgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgY3JlYXRlZCA9IGNyZWF0ZShudWxsKTtcblx0cmV0dXJuIGZ1bmN0aW9uIChkZXNjKSB7XG5cdFx0dmFyIHBvc3RmaXggPSAwLCBuYW1lLCBpZTExQnVnV29ya2Fyb3VuZDtcblx0XHR3aGlsZSAoY3JlYXRlZFtkZXNjICsgKHBvc3RmaXggfHwgJycpXSkgKytwb3N0Zml4O1xuXHRcdGRlc2MgKz0gKHBvc3RmaXggfHwgJycpO1xuXHRcdGNyZWF0ZWRbZGVzY10gPSB0cnVlO1xuXHRcdG5hbWUgPSAnQEAnICsgZGVzYztcblx0XHRkZWZpbmVQcm9wZXJ0eShvYmpQcm90b3R5cGUsIG5hbWUsIGQuZ3MobnVsbCwgZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHQvLyBGb3IgSUUxMSBpc3N1ZSBzZWU6XG5cdFx0XHQvLyBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFja2RldGFpbC92aWV3LzE5Mjg1MDgvXG5cdFx0XHQvLyAgICBpZTExLWJyb2tlbi1nZXR0ZXJzLW9uLWRvbS1vYmplY3RzXG5cdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vbWVkaWtvby9lczYtc3ltYm9sL2lzc3Vlcy8xMlxuXHRcdFx0aWYgKGllMTFCdWdXb3JrYXJvdW5kKSByZXR1cm47XG5cdFx0XHRpZTExQnVnV29ya2Fyb3VuZCA9IHRydWU7XG5cdFx0XHRkZWZpbmVQcm9wZXJ0eSh0aGlzLCBuYW1lLCBkKHZhbHVlKSk7XG5cdFx0XHRpZTExQnVnV29ya2Fyb3VuZCA9IGZhbHNlO1xuXHRcdH0pKTtcblx0XHRyZXR1cm4gbmFtZTtcblx0fTtcbn0oKSk7XG5cbi8vIEludGVybmFsIGNvbnN0cnVjdG9yIChub3Qgb25lIGV4cG9zZWQpIGZvciBjcmVhdGluZyBTeW1ib2wgaW5zdGFuY2VzLlxuLy8gVGhpcyBvbmUgaXMgdXNlZCB0byBlbnN1cmUgdGhhdCBgc29tZVN5bWJvbCBpbnN0YW5jZW9mIFN5bWJvbGAgYWx3YXlzIHJldHVybiBmYWxzZVxuSGlkZGVuU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKGRlc2NyaXB0aW9uKSB7XG5cdGlmICh0aGlzIGluc3RhbmNlb2YgSGlkZGVuU3ltYm9sKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdUeXBlRXJyb3I6IFN5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvcicpO1xuXHRyZXR1cm4gU3ltYm9sUG9seWZpbGwoZGVzY3JpcHRpb24pO1xufTtcblxuLy8gRXhwb3NlZCBgU3ltYm9sYCBjb25zdHJ1Y3RvclxuLy8gKHJldHVybnMgaW5zdGFuY2VzIG9mIEhpZGRlblN5bWJvbClcbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sUG9seWZpbGwgPSBmdW5jdGlvbiBTeW1ib2woZGVzY3JpcHRpb24pIHtcblx0dmFyIHN5bWJvbDtcblx0aWYgKHRoaXMgaW5zdGFuY2VvZiBTeW1ib2wpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGVFcnJvcjogU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG5cdGlmIChpc05hdGl2ZVNhZmUpIHJldHVybiBOYXRpdmVTeW1ib2woZGVzY3JpcHRpb24pO1xuXHRzeW1ib2wgPSBjcmVhdGUoSGlkZGVuU3ltYm9sLnByb3RvdHlwZSk7XG5cdGRlc2NyaXB0aW9uID0gKGRlc2NyaXB0aW9uID09PSB1bmRlZmluZWQgPyAnJyA6IFN0cmluZyhkZXNjcmlwdGlvbikpO1xuXHRyZXR1cm4gZGVmaW5lUHJvcGVydGllcyhzeW1ib2wsIHtcblx0XHRfX2Rlc2NyaXB0aW9uX186IGQoJycsIGRlc2NyaXB0aW9uKSxcblx0XHRfX25hbWVfXzogZCgnJywgZ2VuZXJhdGVOYW1lKGRlc2NyaXB0aW9uKSlcblx0fSk7XG59O1xuZGVmaW5lUHJvcGVydGllcyhTeW1ib2xQb2x5ZmlsbCwge1xuXHRmb3I6IGQoZnVuY3Rpb24gKGtleSkge1xuXHRcdGlmIChnbG9iYWxTeW1ib2xzW2tleV0pIHJldHVybiBnbG9iYWxTeW1ib2xzW2tleV07XG5cdFx0cmV0dXJuIChnbG9iYWxTeW1ib2xzW2tleV0gPSBTeW1ib2xQb2x5ZmlsbChTdHJpbmcoa2V5KSkpO1xuXHR9KSxcblx0a2V5Rm9yOiBkKGZ1bmN0aW9uIChzKSB7XG5cdFx0dmFyIGtleTtcblx0XHR2YWxpZGF0ZVN5bWJvbChzKTtcblx0XHRmb3IgKGtleSBpbiBnbG9iYWxTeW1ib2xzKSBpZiAoZ2xvYmFsU3ltYm9sc1trZXldID09PSBzKSByZXR1cm4ga2V5O1xuXHR9KSxcblxuXHQvLyBJZiB0aGVyZSdzIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiBvZiBnaXZlbiBzeW1ib2wsIGxldCdzIGZhbGxiYWNrIHRvIGl0XG5cdC8vIHRvIGVuc3VyZSBwcm9wZXIgaW50ZXJvcGVyYWJpbGl0eSB3aXRoIG90aGVyIG5hdGl2ZSBmdW5jdGlvbnMgZS5nLiBBcnJheS5mcm9tXG5cdGhhc0luc3RhbmNlOiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5oYXNJbnN0YW5jZSkgfHwgU3ltYm9sUG9seWZpbGwoJ2hhc0luc3RhbmNlJykpLFxuXHRpc0NvbmNhdFNwcmVhZGFibGU6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLmlzQ29uY2F0U3ByZWFkYWJsZSkgfHxcblx0XHRTeW1ib2xQb2x5ZmlsbCgnaXNDb25jYXRTcHJlYWRhYmxlJykpLFxuXHRpdGVyYXRvcjogZCgnJywgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wuaXRlcmF0b3IpIHx8IFN5bWJvbFBvbHlmaWxsKCdpdGVyYXRvcicpKSxcblx0bWF0Y2g6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLm1hdGNoKSB8fCBTeW1ib2xQb2x5ZmlsbCgnbWF0Y2gnKSksXG5cdHJlcGxhY2U6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLnJlcGxhY2UpIHx8IFN5bWJvbFBvbHlmaWxsKCdyZXBsYWNlJykpLFxuXHRzZWFyY2g6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLnNlYXJjaCkgfHwgU3ltYm9sUG9seWZpbGwoJ3NlYXJjaCcpKSxcblx0c3BlY2llczogZCgnJywgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wuc3BlY2llcykgfHwgU3ltYm9sUG9seWZpbGwoJ3NwZWNpZXMnKSksXG5cdHNwbGl0OiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC5zcGxpdCkgfHwgU3ltYm9sUG9seWZpbGwoJ3NwbGl0JykpLFxuXHR0b1ByaW1pdGl2ZTogZCgnJywgKE5hdGl2ZVN5bWJvbCAmJiBOYXRpdmVTeW1ib2wudG9QcmltaXRpdmUpIHx8IFN5bWJvbFBvbHlmaWxsKCd0b1ByaW1pdGl2ZScpKSxcblx0dG9TdHJpbmdUYWc6IGQoJycsIChOYXRpdmVTeW1ib2wgJiYgTmF0aXZlU3ltYm9sLnRvU3RyaW5nVGFnKSB8fCBTeW1ib2xQb2x5ZmlsbCgndG9TdHJpbmdUYWcnKSksXG5cdHVuc2NvcGFibGVzOiBkKCcnLCAoTmF0aXZlU3ltYm9sICYmIE5hdGl2ZVN5bWJvbC51bnNjb3BhYmxlcykgfHwgU3ltYm9sUG9seWZpbGwoJ3Vuc2NvcGFibGVzJykpXG59KTtcblxuLy8gSW50ZXJuYWwgdHdlYWtzIGZvciByZWFsIHN5bWJvbCBwcm9kdWNlclxuZGVmaW5lUHJvcGVydGllcyhIaWRkZW5TeW1ib2wucHJvdG90eXBlLCB7XG5cdGNvbnN0cnVjdG9yOiBkKFN5bWJvbFBvbHlmaWxsKSxcblx0dG9TdHJpbmc6IGQoJycsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX19uYW1lX187IH0pXG59KTtcblxuLy8gUHJvcGVyIGltcGxlbWVudGF0aW9uIG9mIG1ldGhvZHMgZXhwb3NlZCBvbiBTeW1ib2wucHJvdG90eXBlXG4vLyBUaGV5IHdvbid0IGJlIGFjY2Vzc2libGUgb24gcHJvZHVjZWQgc3ltYm9sIGluc3RhbmNlcyBhcyB0aGV5IGRlcml2ZSBmcm9tIEhpZGRlblN5bWJvbC5wcm90b3R5cGVcbmRlZmluZVByb3BlcnRpZXMoU3ltYm9sUG9seWZpbGwucHJvdG90eXBlLCB7XG5cdHRvU3RyaW5nOiBkKGZ1bmN0aW9uICgpIHsgcmV0dXJuICdTeW1ib2wgKCcgKyB2YWxpZGF0ZVN5bWJvbCh0aGlzKS5fX2Rlc2NyaXB0aW9uX18gKyAnKSc7IH0pLFxuXHR2YWx1ZU9mOiBkKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbGlkYXRlU3ltYm9sKHRoaXMpOyB9KVxufSk7XG5kZWZpbmVQcm9wZXJ0eShTeW1ib2xQb2x5ZmlsbC5wcm90b3R5cGUsIFN5bWJvbFBvbHlmaWxsLnRvUHJpbWl0aXZlLCBkKCcnLCBmdW5jdGlvbiAoKSB7XG5cdHZhciBzeW1ib2wgPSB2YWxpZGF0ZVN5bWJvbCh0aGlzKTtcblx0aWYgKHR5cGVvZiBzeW1ib2wgPT09ICdzeW1ib2wnKSByZXR1cm4gc3ltYm9sO1xuXHRyZXR1cm4gc3ltYm9sLnRvU3RyaW5nKCk7XG59KSk7XG5kZWZpbmVQcm9wZXJ0eShTeW1ib2xQb2x5ZmlsbC5wcm90b3R5cGUsIFN5bWJvbFBvbHlmaWxsLnRvU3RyaW5nVGFnLCBkKCdjJywgJ1N5bWJvbCcpKTtcblxuLy8gUHJvcGVyIGltcGxlbWVudGF0b24gb2YgdG9QcmltaXRpdmUgYW5kIHRvU3RyaW5nVGFnIGZvciByZXR1cm5lZCBzeW1ib2wgaW5zdGFuY2VzXG5kZWZpbmVQcm9wZXJ0eShIaWRkZW5TeW1ib2wucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZyxcblx0ZCgnYycsIFN5bWJvbFBvbHlmaWxsLnByb3RvdHlwZVtTeW1ib2xQb2x5ZmlsbC50b1N0cmluZ1RhZ10pKTtcblxuLy8gTm90ZTogSXQncyBpbXBvcnRhbnQgdG8gZGVmaW5lIGB0b1ByaW1pdGl2ZWAgYXMgbGFzdCBvbmUsIGFzIHNvbWUgaW1wbGVtZW50YXRpb25zXG4vLyBpbXBsZW1lbnQgYHRvUHJpbWl0aXZlYCBuYXRpdmVseSB3aXRob3V0IGltcGxlbWVudGluZyBgdG9TdHJpbmdUYWdgIChvciBvdGhlciBzcGVjaWZpZWQgc3ltYm9scylcbi8vIEFuZCB0aGF0IG1heSBpbnZva2UgZXJyb3IgaW4gZGVmaW5pdGlvbiBmbG93OlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vbWVkaWtvby9lczYtc3ltYm9sL2lzc3Vlcy8xMyNpc3N1ZWNvbW1lbnQtMTY0MTQ2MTQ5XG5kZWZpbmVQcm9wZXJ0eShIaWRkZW5TeW1ib2wucHJvdG90eXBlLCBTeW1ib2xQb2x5ZmlsbC50b1ByaW1pdGl2ZSxcblx0ZCgnYycsIFN5bWJvbFBvbHlmaWxsLnByb3RvdHlwZVtTeW1ib2xQb2x5ZmlsbC50b1ByaW1pdGl2ZV0pKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pcy1zeW1ib2wnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0aWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHRocm93IG5ldyBUeXBlRXJyb3IodmFsdWUgKyBcIiBpcyBub3QgYSBzeW1ib2xcIik7XG5cdHJldHVybiB2YWx1ZTtcbn07XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gIH1cbn1cbiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZDtcbmZ1bmN0aW9uIGV4dGVuZChvcmlnaW4sIGFkZCkge1xuICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiBhZGQgaXNuJ3QgYW4gb2JqZWN0XG4gIGlmICghYWRkIHx8IHR5cGVvZiBhZGQgIT09ICdvYmplY3QnKSByZXR1cm4gb3JpZ2luO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWRkKTtcbiAgdmFyIGkgPSBrZXlzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIG9yaWdpbltrZXlzW2ldXSA9IGFkZFtrZXlzW2ldXTtcbiAgfVxuICByZXR1cm4gb3JpZ2luO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIEdyYW1tYXJEZWNsID0gcmVxdWlyZSgnLi9HcmFtbWFyRGVjbCcpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBCdWlsZGVyKCkge31cblxuQnVpbGRlci5wcm90b3R5cGUgPSB7XG4gIGN1cnJlbnREZWNsOiBudWxsLFxuXG4gIG5ld0dyYW1tYXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmV3IEdyYW1tYXJEZWNsKG5hbWUpO1xuICB9LFxuXG4gIGdyYW1tYXI6IGZ1bmN0aW9uKG1ldGFJbmZvLCBuYW1lLCBzdXBlckdyYW1tYXIsIGRlZmF1bHRTdGFydFJ1bGUsIHJ1bGVzKSB7XG4gICAgdmFyIGdEZWNsID0gbmV3IEdyYW1tYXJEZWNsKG5hbWUpO1xuICAgIGlmIChzdXBlckdyYW1tYXIpIHtcbiAgICAgIGdEZWNsLndpdGhTdXBlckdyYW1tYXIodGhpcy5mcm9tUmVjaXBlKHN1cGVyR3JhbW1hcikpO1xuICAgIH1cbiAgICBpZiAoZGVmYXVsdFN0YXJ0UnVsZSkge1xuICAgICAgZ0RlY2wud2l0aERlZmF1bHRTdGFydFJ1bGUoZGVmYXVsdFN0YXJ0UnVsZSk7XG4gICAgfVxuICAgIGlmIChtZXRhSW5mbyAmJiBtZXRhSW5mby5zb3VyY2UpIHtcbiAgICAgIGdEZWNsLndpdGhTb3VyY2UobWV0YUluZm8uc291cmNlKTtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5jdXJyZW50RGVjbCA9IGdEZWNsO1xuICAgIE9iamVjdC5rZXlzKHJ1bGVzKS5mb3JFYWNoKGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gICAgICB2YXIgcnVsZVJlY2lwZSA9IHJ1bGVzW3J1bGVOYW1lXTtcblxuICAgICAgdmFyIGFjdGlvbiA9IHJ1bGVSZWNpcGVbMF07IC8vIGRlZmluZS9leHRlbmQvb3ZlcnJpZGVcbiAgICAgIHZhciBtZXRhSW5mbyA9IHJ1bGVSZWNpcGVbMV07XG4gICAgICB2YXIgZGVzY3JpcHRpb24gPSBydWxlUmVjaXBlWzJdO1xuICAgICAgdmFyIGZvcm1hbHMgPSBydWxlUmVjaXBlWzNdO1xuICAgICAgdmFyIGJvZHkgPSBzZWxmLmZyb21SZWNpcGUocnVsZVJlY2lwZVs0XSk7XG5cbiAgICAgIHZhciBzb3VyY2U7XG4gICAgICBpZiAoZ0RlY2wuc291cmNlICYmIG1ldGFJbmZvICYmIG1ldGFJbmZvLnNvdXJjZUludGVydmFsKSB7XG4gICAgICAgIHZhciBpbnB1dFN0cmVhbSA9IGdEZWNsLnNvdXJjZS5pbnB1dFN0cmVhbTtcbiAgICAgICAgc291cmNlID0gaW5wdXRTdHJlYW0uaW50ZXJ2YWwuYXBwbHkoaW5wdXRTdHJlYW0sIG1ldGFJbmZvLnNvdXJjZUludGVydmFsKTtcbiAgICAgIH1cbiAgICAgIGdEZWNsW2FjdGlvbl0ocnVsZU5hbWUsIGZvcm1hbHMsIGJvZHksIGRlc2NyaXB0aW9uLCBzb3VyY2UpO1xuICAgIH0pO1xuICAgIHRoaXMuY3VycmVudERlY2wgPSBudWxsO1xuICAgIHJldHVybiBnRGVjbC5idWlsZCgpO1xuICB9LFxuXG4gIHRlcm1pbmFsOiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuVGVybWluYWwoeCk7XG4gIH0sXG5cbiAgcmFuZ2U6IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuUmFuZ2UoZnJvbSwgdG8pO1xuICB9LFxuXG4gIHBhcmFtOiBmdW5jdGlvbihpbmRleCkge1xuICAgIHJldHVybiBuZXcgcGV4cHJzLlBhcmFtKGluZGV4KTtcbiAgfSxcblxuICBhbHQ6IGZ1bmN0aW9uKC8qIHRlcm0xLCB0ZXJtMSwgLi4uICovKSB7XG4gICAgdmFyIHRlcm1zID0gW107XG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaWR4XTtcbiAgICAgIGlmICghKGFyZyBpbnN0YW5jZW9mIHBleHBycy5QRXhwcikpIHtcbiAgICAgICAgYXJnID0gdGhpcy5mcm9tUmVjaXBlKGFyZyk7XG4gICAgICB9XG4gICAgICBpZiAoYXJnIGluc3RhbmNlb2YgcGV4cHJzLkFsdCkge1xuICAgICAgICB0ZXJtcyA9IHRlcm1zLmNvbmNhdChhcmcudGVybXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVybXMucHVzaChhcmcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGVybXMubGVuZ3RoID09PSAxID8gdGVybXNbMF0gOiBuZXcgcGV4cHJzLkFsdCh0ZXJtcyk7XG4gIH0sXG5cbiAgc2VxOiBmdW5jdGlvbigvKiBmYWN0b3IxLCBmYWN0b3IyLCAuLi4gKi8pIHtcbiAgICB2YXIgZmFjdG9ycyA9IFtdO1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2lkeF07XG4gICAgICBpZiAoIShhcmcgaW5zdGFuY2VvZiBwZXhwcnMuUEV4cHIpKSB7XG4gICAgICAgIGFyZyA9IHRoaXMuZnJvbVJlY2lwZShhcmcpO1xuICAgICAgfVxuICAgICAgaWYgKGFyZyBpbnN0YW5jZW9mIHBleHBycy5TZXEpIHtcbiAgICAgICAgZmFjdG9ycyA9IGZhY3RvcnMuY29uY2F0KGFyZy5mYWN0b3JzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhY3RvcnMucHVzaChhcmcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFjdG9ycy5sZW5ndGggPT09IDEgPyBmYWN0b3JzWzBdIDogbmV3IHBleHBycy5TZXEoZmFjdG9ycyk7XG4gIH0sXG5cbiAgc3RhcjogZnVuY3Rpb24oZXhwcikge1xuICAgIGlmICghKGV4cHIgaW5zdGFuY2VvZiBwZXhwcnMuUEV4cHIpKSB7XG4gICAgICBleHByID0gdGhpcy5mcm9tUmVjaXBlKGV4cHIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHBleHBycy5TdGFyKGV4cHIpO1xuICB9LFxuXG4gIHBsdXM6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICBpZiAoIShleHByIGluc3RhbmNlb2YgcGV4cHJzLlBFeHByKSkge1xuICAgICAgZXhwciA9IHRoaXMuZnJvbVJlY2lwZShleHByKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuUGx1cyhleHByKTtcbiAgfSxcblxuICBvcHQ6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICBpZiAoIShleHByIGluc3RhbmNlb2YgcGV4cHJzLlBFeHByKSkge1xuICAgICAgZXhwciA9IHRoaXMuZnJvbVJlY2lwZShleHByKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuT3B0KGV4cHIpO1xuICB9LFxuXG4gIG5vdDogZnVuY3Rpb24oZXhwcikge1xuICAgIGlmICghKGV4cHIgaW5zdGFuY2VvZiBwZXhwcnMuUEV4cHIpKSB7XG4gICAgICBleHByID0gdGhpcy5mcm9tUmVjaXBlKGV4cHIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHBleHBycy5Ob3QoZXhwcik7XG4gIH0sXG5cbiAgbGE6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICAvLyBUT0RPOiB0ZW1wb3JhcnkgdG8gc3RpbGwgYmUgYWJsZSB0byByZWFkIG9sZCByZWNpcGVzXG4gICAgcmV0dXJuIHRoaXMubG9va2FoZWFkKGV4cHIpO1xuICB9LFxuXG4gIGxvb2thaGVhZDogZnVuY3Rpb24oZXhwcikge1xuICAgIGlmICghKGV4cHIgaW5zdGFuY2VvZiBwZXhwcnMuUEV4cHIpKSB7XG4gICAgICBleHByID0gdGhpcy5mcm9tUmVjaXBlKGV4cHIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHBleHBycy5Mb29rYWhlYWQoZXhwcik7XG4gIH0sXG5cbiAgbGV4OiBmdW5jdGlvbihleHByKSB7XG4gICAgaWYgKCEoZXhwciBpbnN0YW5jZW9mIHBleHBycy5QRXhwcikpIHtcbiAgICAgIGV4cHIgPSB0aGlzLmZyb21SZWNpcGUoZXhwcik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgcGV4cHJzLkxleChleHByKTtcbiAgfSxcblxuICBhcHA6IGZ1bmN0aW9uKHJ1bGVOYW1lLCBvcHRQYXJhbXMpIHtcbiAgICBpZiAob3B0UGFyYW1zICYmIG9wdFBhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgICBvcHRQYXJhbXMgPSBvcHRQYXJhbXMubWFwKGZ1bmN0aW9uKHBhcmFtKSB7XG4gICAgICAgIHJldHVybiBwYXJhbSBpbnN0YW5jZW9mIHBleHBycy5QRXhwciA/IHBhcmFtIDpcbiAgICAgICAgICB0aGlzLmZyb21SZWNpcGUocGFyYW0pO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgcGV4cHJzLkFwcGx5KHJ1bGVOYW1lLCBvcHRQYXJhbXMpO1xuICB9LFxuXG4gIGZyb21SZWNpcGU6IGZ1bmN0aW9uKHJlY2lwZSkge1xuICAgIC8vIHRoZSBtZXRhLWluZm8gb2YgJ2dyYW1tYXInIGlzIHByb2NjZXNzZWQgaW4gQnVpbGRlci5ncmFtbWFyXG4gICAgdmFyIHJlc3VsdCA9IHRoaXNbcmVjaXBlWzBdXS5hcHBseSh0aGlzLFxuICAgICAgcmVjaXBlWzBdID09PSAnZ3JhbW1hcicgPyByZWNpcGUuc2xpY2UoMSkgOiByZWNpcGUuc2xpY2UoMikpO1xuXG4gICAgdmFyIG1ldGFJbmZvID0gcmVjaXBlWzFdO1xuICAgIGlmIChtZXRhSW5mbykge1xuICAgICAgaWYgKG1ldGFJbmZvLnNvdXJjZUludGVydmFsICYmIHRoaXMuY3VycmVudERlY2wpIHtcbiAgICAgICAgcmVzdWx0LndpdGhTb3VyY2UoXG4gICAgICAgICAgdGhpcy5jdXJyZW50RGVjbC5zb3VyY2VJbnRlcnZhbC5hcHBseSh0aGlzLmN1cnJlbnREZWNsLCBtZXRhSW5mby5zb3VyY2VJbnRlcnZhbClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gQnVpbGRlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qXG4gIGBGYWlsdXJlYHMgcmVwcmVzZW50IGV4cHJlc3Npb25zIHRoYXQgd2VyZW4ndCBtYXRjaGVkIHdoaWxlIHBhcnNpbmcuIFRoZXkgYXJlIHVzZWQgdG8gZ2VuZXJhdGVcbiAgZXJyb3IgbWVzc2FnZXMgYXV0b21hdGljYWxseS4gVGhlIGludGVyZmFjZSBvZiBgRmFpbHVyZWBzIGluY2x1ZGVzIHRoZSBjb2xsb3dpbmcgbWV0aG9kczpcblxuICAtIGdldFRleHQoKSA6IFN0cmluZ1xuICAtIGdldFR5cGUoKSA6IFN0cmluZyAgKG9uZSBvZiB7XCJkZXNjcmlwdGlvblwiLCBcInN0cmluZ1wiLCBcImNvZGVcIn0pXG4gIC0gaXNEZXNjcmlwdGlvbigpIDogYm9vbFxuICAtIGlzU3RyaW5nVGVybWluYWwoKSA6IGJvb2xcbiAgLSBpc0NvZGUoKSA6IGJvb2xcbiAgLSBpc0ZsdWZmeSgpIDogYm9vbFxuICAtIG1ha2VGbHVmZnkoKSA6IHZvaWRcbiAgLSBzdWJzdW1lcyhGYWlsdXJlKSA6IGJvb2xcbiovXG5cbmZ1bmN0aW9uIGlzVmFsaWRUeXBlKHR5cGUpIHtcbiAgcmV0dXJuIHR5cGUgPT09ICdkZXNjcmlwdGlvbicgfHwgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ2NvZGUnO1xufVxuXG5mdW5jdGlvbiBGYWlsdXJlKHBleHByLCB0ZXh0LCB0eXBlKSB7XG4gIGlmICghaXNWYWxpZFR5cGUodHlwZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgRmFpbHVyZSB0eXBlOiAnICsgdHlwZSk7XG4gIH1cbiAgdGhpcy5wZXhwciA9IHBleHByO1xuICB0aGlzLnRleHQgPSB0ZXh0O1xuICB0aGlzLnR5cGUgPSB0eXBlO1xuICB0aGlzLmZsdWZmeSA9IGZhbHNlO1xufVxuXG5GYWlsdXJlLnByb3RvdHlwZS5nZXRQRXhwciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5wZXhwcjtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLmdldFRleHQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudGV4dDtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLmdldFR5cGUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudHlwZTtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLmlzRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ2Rlc2NyaXB0aW9uJztcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLmlzU3RyaW5nVGVybWluYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ3N0cmluZyc7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS5pc0NvZGUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ2NvZGUnO1xufTtcblxuRmFpbHVyZS5wcm90b3R5cGUuaXNGbHVmZnkgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZmx1ZmZ5O1xufTtcblxuRmFpbHVyZS5wcm90b3R5cGUubWFrZUZsdWZmeSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmZsdWZmeSA9IHRydWU7XG59O1xuXG5GYWlsdXJlLnByb3RvdHlwZS5jbGVhckZsdWZmeSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmZsdWZmeSA9IGZhbHNlO1xufTtcblxuRmFpbHVyZS5wcm90b3R5cGUuc3Vic3VtZXMgPSBmdW5jdGlvbih0aGF0KSB7XG4gIHJldHVybiB0aGlzLmdldFRleHQoKSA9PT0gdGhhdC5nZXRUZXh0KCkgJiZcbiAgICAgIHRoaXMudHlwZSA9PT0gdGhhdC50eXBlICYmXG4gICAgICAoIXRoaXMuaXNGbHVmZnkoKSB8fCB0aGlzLmlzRmx1ZmZ5KCkgJiYgdGhhdC5pc0ZsdWZmeSgpKTtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnR5cGUgPT09ICdzdHJpbmcnID9cbiAgICBKU09OLnN0cmluZ2lmeSh0aGlzLmdldFRleHQoKSkgOlxuICAgIHRoaXMuZ2V0VGV4dCgpO1xufTtcblxuRmFpbHVyZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGZhaWx1cmUgPSBuZXcgRmFpbHVyZSh0aGlzLnBleHByLCB0aGlzLnRleHQsIHRoaXMudHlwZSk7XG4gIGlmICh0aGlzLmlzRmx1ZmZ5KCkpIHtcbiAgICBmYWlsdXJlLm1ha2VGbHVmZnkoKTtcbiAgfVxuICByZXR1cm4gZmFpbHVyZTtcbn07XG5cbkZhaWx1cmUucHJvdG90eXBlLnRvS2V5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnRvU3RyaW5nKCkgKyAnIycgKyB0aGlzLnR5cGU7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBGYWlsdXJlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIE1hdGNoUmVzdWx0ID0gcmVxdWlyZSgnLi9NYXRjaFJlc3VsdCcpO1xudmFyIFNlbWFudGljcyA9IHJlcXVpcmUoJy4vU2VtYW50aWNzJyk7XG52YXIgU3RhdGUgPSByZXF1aXJlKCcuL1N0YXRlJyk7XG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBHcmFtbWFyKFxuICAgIG5hbWUsXG4gICAgc3VwZXJHcmFtbWFyLFxuICAgIHJ1bGVzLFxuICAgIG9wdERlZmF1bHRTdGFydFJ1bGUpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5zdXBlckdyYW1tYXIgPSBzdXBlckdyYW1tYXI7XG4gIHRoaXMucnVsZXMgPSBydWxlcztcbiAgaWYgKG9wdERlZmF1bHRTdGFydFJ1bGUpIHtcbiAgICBpZiAoIShvcHREZWZhdWx0U3RhcnRSdWxlIGluIHJ1bGVzKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzdGFydCBydWxlOiAnXCIgKyBvcHREZWZhdWx0U3RhcnRSdWxlICtcbiAgICAgICAgICAgICAgICAgICAgICBcIicgaXMgbm90IGEgcnVsZSBpbiBncmFtbWFyICdcIiArIG5hbWUgKyBcIidcIik7XG4gICAgfVxuICAgIHRoaXMuZGVmYXVsdFN0YXJ0UnVsZSA9IG9wdERlZmF1bHRTdGFydFJ1bGU7XG4gIH1cbn1cblxudmFyIG9obUdyYW1tYXI7XG52YXIgYnVpbGRHcmFtbWFyO1xuXG4vLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgZnJvbSBtYWluLmpzIG9uY2UgT2htIGhhcyBsb2FkZWQuXG5HcmFtbWFyLmluaXRBcHBsaWNhdGlvblBhcnNlciA9IGZ1bmN0aW9uKGdyYW1tYXIsIGJ1aWxkZXJGbikge1xuICBvaG1HcmFtbWFyID0gZ3JhbW1hcjtcbiAgYnVpbGRHcmFtbWFyID0gYnVpbGRlckZuO1xufTtcblxuR3JhbW1hci5wcm90b3R5cGUgPSB7XG4gIC8vIFJldHVybiB0cnVlIGlmIHRoZSBncmFtbWFyIGlzIGEgYnVpbHQtaW4gZ3JhbW1hciwgb3RoZXJ3aXNlIGZhbHNlLlxuICAvLyBOT1RFOiBUaGlzIG1pZ2h0IGdpdmUgYW4gdW5leHBlY3RlZCByZXN1bHQgaWYgY2FsbGVkIGJlZm9yZSBCdWlsdEluUnVsZXMgaXMgZGVmaW5lZCFcbiAgaXNCdWlsdEluOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcyA9PT0gR3JhbW1hci5Qcm90b0J1aWx0SW5SdWxlcyB8fCB0aGlzID09PSBHcmFtbWFyLkJ1aWx0SW5SdWxlcztcbiAgfSxcblxuICBfbWF0Y2g6IGZ1bmN0aW9uKGlucHV0LCBvcHRzKSB7XG4gICAgdmFyIHN0YXRlID0gbmV3IFN0YXRlKHRoaXMsIGlucHV0LCBvcHRzKTtcbiAgICBzdGF0ZS5ldmFsRnJvbVN0YXJ0KCk7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9LFxuXG4gIG1hdGNoOiBmdW5jdGlvbihpbnB1dCwgb3B0U3RhcnRBcHBsaWNhdGlvbikge1xuICAgIHZhciBzdGF0ZSA9IHRoaXMuX21hdGNoKGlucHV0LCB7c3RhcnRBcHBsaWNhdGlvbjogb3B0U3RhcnRBcHBsaWNhdGlvbn0pO1xuICAgIHJldHVybiBNYXRjaFJlc3VsdC5uZXdGb3Ioc3RhdGUpO1xuICB9LFxuXG4gIHRyYWNlOiBmdW5jdGlvbihpbnB1dCwgb3B0U3RhcnRBcHBsaWNhdGlvbikge1xuICAgIHZhciBzdGF0ZSA9IHRoaXMuX21hdGNoKGlucHV0LCB7c3RhcnRBcHBsaWNhdGlvbjogb3B0U3RhcnRBcHBsaWNhdGlvbiwgdHJhY2U6IHRydWV9KTtcblxuICAgIC8vIFRoZSB0cmFjZSBub2RlIGZvciB0aGUgc3RhcnQgcnVsZSBpcyBhbHdheXMgdGhlIGxhc3QgZW50cnkuIElmIGl0IGlzIGEgc3ludGFjdGljIHJ1bGUsXG4gICAgLy8gdGhlIGZpcnN0IGVudHJ5IGlzIGZvciBhbiBhcHBsaWNhdGlvbiBvZiAnc3BhY2VzJy5cbiAgICAvLyBUT0RPKHBkdWJyb3kpOiBDbGVhbiB0aGlzIHVwIGJ5IGludHJvZHVjaW5nIGEgc3BlY2lhbCBgTWF0Y2g8c3RhcnRBcHBsPmAgcnVsZSwgd2hpY2ggd2lsbFxuICAgIC8vIGVuc3VyZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBhIHNpbmdsZSByb290IHRyYWNlIG5vZGUuXG4gICAgdmFyIHJvb3RUcmFjZSA9IHN0YXRlLnRyYWNlW3N0YXRlLnRyYWNlLmxlbmd0aCAtIDFdO1xuICAgIHJvb3RUcmFjZS5zdGF0ZSA9IHN0YXRlO1xuICAgIHJvb3RUcmFjZS5yZXN1bHQgPSBNYXRjaFJlc3VsdC5uZXdGb3Ioc3RhdGUpO1xuICAgIHJldHVybiByb290VHJhY2U7XG4gIH0sXG5cbiAgc2VtYW50aWNzOiBmdW5jdGlvbigpIHtcbiAgICAvLyBUT0RPOiBSZW1vdmUgdGhpcyBldmVudHVhbGx5ISBEZXByZWNhdGVkIGluIHYwLjEyLlxuICAgIHRocm93IG5ldyBFcnJvcignc2VtYW50aWNzKCkgaXMgZGVwcmVjYXRlZCAtLSB1c2UgY3JlYXRlU2VtYW50aWNzKCkgaW5zdGVhZC4nKTtcbiAgfSxcblxuICBjcmVhdGVTZW1hbnRpY3M6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBTZW1hbnRpY3MuY3JlYXRlU2VtYW50aWNzKHRoaXMpO1xuICB9LFxuXG4gIGV4dGVuZFNlbWFudGljczogZnVuY3Rpb24oc3VwZXJTZW1hbnRpY3MpIHtcbiAgICByZXR1cm4gU2VtYW50aWNzLmNyZWF0ZVNlbWFudGljcyh0aGlzLCBzdXBlclNlbWFudGljcy5fZ2V0U2VtYW50aWNzKCkpO1xuICB9LFxuXG4gIC8vIENoZWNrIHRoYXQgZXZlcnkga2V5IGluIGBhY3Rpb25EaWN0YCBjb3JyZXNwb25kcyB0byBhIHNlbWFudGljIGFjdGlvbiwgYW5kIHRoYXQgaXQgbWFwcyB0b1xuICAvLyBhIGZ1bmN0aW9uIG9mIHRoZSBjb3JyZWN0IGFyaXR5LiBJZiBub3QsIHRocm93IGFuIGV4Y2VwdGlvbi5cbiAgX2NoZWNrVG9wRG93bkFjdGlvbkRpY3Q6IGZ1bmN0aW9uKHdoYXQsIG5hbWUsIGFjdGlvbkRpY3QpIHtcbiAgICBmdW5jdGlvbiBpc1NwZWNpYWxBY3Rpb24oYSkge1xuICAgICAgcmV0dXJuIGEgPT09ICdfaXRlcicgfHwgYSA9PT0gJ190ZXJtaW5hbCcgfHwgYSA9PT0gJ19ub250ZXJtaW5hbCcgfHwgYSA9PT0gJ19kZWZhdWx0JztcbiAgICB9XG5cbiAgICB2YXIgcHJvYmxlbXMgPSBbXTtcbiAgICBmb3IgKHZhciBrIGluIGFjdGlvbkRpY3QpIHtcbiAgICAgIHZhciB2ID0gYWN0aW9uRGljdFtrXTtcbiAgICAgIGlmICghaXNTcGVjaWFsQWN0aW9uKGspICYmICEoayBpbiB0aGlzLnJ1bGVzKSkge1xuICAgICAgICBwcm9ibGVtcy5wdXNoKFwiJ1wiICsgayArIFwiJyBpcyBub3QgYSB2YWxpZCBzZW1hbnRpYyBhY3Rpb24gZm9yICdcIiArIHRoaXMubmFtZSArIFwiJ1wiKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHYgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJvYmxlbXMucHVzaChcbiAgICAgICAgICAgIFwiJ1wiICsgayArIFwiJyBtdXN0IGJlIGEgZnVuY3Rpb24gaW4gYW4gYWN0aW9uIGRpY3Rpb25hcnkgZm9yICdcIiArIHRoaXMubmFtZSArIFwiJ1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBhY3R1YWwgPSB2Lmxlbmd0aDtcbiAgICAgICAgdmFyIGV4cGVjdGVkID0gdGhpcy5fdG9wRG93bkFjdGlvbkFyaXR5KGspO1xuICAgICAgICBpZiAoYWN0dWFsICE9PSBleHBlY3RlZCkge1xuICAgICAgICAgIHByb2JsZW1zLnB1c2goXG4gICAgICAgICAgICAgIFwiU2VtYW50aWMgYWN0aW9uICdcIiArIGsgKyBcIicgaGFzIHRoZSB3cm9uZyBhcml0eTogXCIgK1xuICAgICAgICAgICAgICAnZXhwZWN0ZWQgJyArIGV4cGVjdGVkICsgJywgZ290ICcgKyBhY3R1YWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwcm9ibGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgcHJldHR5UHJvYmxlbXMgPSBwcm9ibGVtcy5tYXAoZnVuY3Rpb24ocHJvYmxlbSkgeyByZXR1cm4gJy0gJyArIHByb2JsZW07IH0pO1xuICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAgIFwiRm91bmQgZXJyb3JzIGluIHRoZSBhY3Rpb24gZGljdGlvbmFyeSBvZiB0aGUgJ1wiICsgbmFtZSArIFwiJyBcIiArIHdoYXQgKyAnOlxcbicgK1xuICAgICAgICAgIHByZXR0eVByb2JsZW1zLmpvaW4oJ1xcbicpKTtcbiAgICAgIGVycm9yLnByb2JsZW1zID0gcHJvYmxlbXM7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH0sXG5cbiAgLy8gUmV0dXJuIHRoZSBleHBlY3RlZCBhcml0eSBmb3IgYSBzZW1hbnRpYyBhY3Rpb24gbmFtZWQgYGFjdGlvbk5hbWVgLCB3aGljaFxuICAvLyBpcyBlaXRoZXIgYSBydWxlIG5hbWUgb3IgYSBzcGVjaWFsIGFjdGlvbiBuYW1lIGxpa2UgJ19ub250ZXJtaW5hbCcuXG4gIF90b3BEb3duQWN0aW9uQXJpdHk6IGZ1bmN0aW9uKGFjdGlvbk5hbWUpIHtcbiAgICBpZiAoYWN0aW9uTmFtZSA9PT0gJ19pdGVyJyB8fCBhY3Rpb25OYW1lID09PSAnX25vbnRlcm1pbmFsJyB8fCBhY3Rpb25OYW1lID09PSAnX2RlZmF1bHQnKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGFjdGlvbk5hbWUgPT09ICdfdGVybWluYWwnKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucnVsZXNbYWN0aW9uTmFtZV0uYm9keS5nZXRBcml0eSgpO1xuICB9LFxuXG4gIF9pbmhlcml0c0Zyb206IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgICB2YXIgZyA9IHRoaXMuc3VwZXJHcmFtbWFyO1xuICAgIHdoaWxlIChnKSB7XG4gICAgICBpZiAoZyA9PT0gZ3JhbW1hcikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGcgPSBnLnN1cGVyR3JhbW1hcjtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIHRvUmVjaXBlOiBmdW5jdGlvbihvcHRWYXJOYW1lKSB7XG4gICAgdmFyIG1ldGFJbmZvID0ge307XG4gICAgLy8gSW5jbHVkZSB0aGUgZ3JhbW1hciBzb3VyY2UgaWYgaXQgaXMgYXZhaWxhYmxlLlxuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgbWV0YUluZm8uc291cmNlID0gdGhpcy5zb3VyY2UuY29udGVudHM7XG4gICAgfVxuXG4gICAgdmFyIHN1cGVyR3JhbW1hciA9IG51bGw7XG4gICAgaWYgKHRoaXMuc3VwZXJHcmFtbWFyICYmICF0aGlzLnN1cGVyR3JhbW1hci5pc0J1aWx0SW4oKSkge1xuICAgICAgc3VwZXJHcmFtbWFyID0gSlNPTi5wYXJzZSh0aGlzLnN1cGVyR3JhbW1hci50b1JlY2lwZSgpKTtcbiAgICB9XG5cbiAgICB2YXIgc3RhcnRSdWxlID0gbnVsbDtcbiAgICBpZiAodGhpcy5kZWZhdWx0U3RhcnRSdWxlKSB7XG4gICAgICBzdGFydFJ1bGUgPSB0aGlzLmRlZmF1bHRTdGFydFJ1bGU7XG4gICAgfVxuXG4gICAgdmFyIHJ1bGVzID0ge307XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIE9iamVjdC5rZXlzKHRoaXMucnVsZXMpLmZvckVhY2goZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgICAgIHZhciBydWxlSW5mbyA9IHNlbGYucnVsZXNbcnVsZU5hbWVdO1xuICAgICAgdmFyIGJvZHkgPSBydWxlSW5mby5ib2R5O1xuICAgICAgdmFyIGlzRGVmaW5pdGlvbiA9ICFzZWxmLnN1cGVyR3JhbW1hciB8fCAhc2VsZi5zdXBlckdyYW1tYXIucnVsZXNbcnVsZU5hbWVdO1xuXG4gICAgICB2YXIgb3BlcmF0aW9uO1xuICAgICAgaWYgKGlzRGVmaW5pdGlvbikge1xuICAgICAgICBvcGVyYXRpb24gPSAnZGVmaW5lJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wZXJhdGlvbiA9IGJvZHkgaW5zdGFuY2VvZiBwZXhwcnMuRXh0ZW5kID8gJ2V4dGVuZCcgOiAnb3ZlcnJpZGUnO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWV0YUluZm8gPSB7fTtcbiAgICAgIGlmIChydWxlSW5mby5zb3VyY2UgJiYgc2VsZi5zb3VyY2UpIHtcbiAgICAgICAgdmFyIGFkanVzdGVkID0gcnVsZUluZm8uc291cmNlLnJlbGF0aXZlVG8oc2VsZi5zb3VyY2UpO1xuICAgICAgICBtZXRhSW5mby5zb3VyY2VJbnRlcnZhbCA9IFthZGp1c3RlZC5zdGFydElkeCwgYWRqdXN0ZWQuZW5kSWR4XTtcbiAgICAgIH1cblxuICAgICAgdmFyIGRlc2NyaXB0aW9uID0gaXNEZWZpbml0aW9uID8gcnVsZUluZm8uZGVzY3JpcHRpb24gOiBudWxsO1xuICAgICAgdmFyIGJvZHlSZWNpcGUgPSBib2R5Lm91dHB1dFJlY2lwZShydWxlSW5mby5mb3JtYWxzLCBzZWxmLnNvdXJjZSk7XG5cbiAgICAgIHJ1bGVzW3J1bGVOYW1lXSA9IFtcbiAgICAgICAgb3BlcmF0aW9uLCAvLyBcImRlZmluZVwiL1wiZXh0ZW5kXCIvXCJvdmVycmlkZVwiXG4gICAgICAgIG1ldGFJbmZvLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgcnVsZUluZm8uZm9ybWFscyxcbiAgICAgICAgYm9keVJlY2lwZVxuICAgICAgXTtcbiAgICB9KTtcblxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShbXG4gICAgICAnZ3JhbW1hcicsXG4gICAgICBtZXRhSW5mbyxcbiAgICAgIHRoaXMubmFtZSxcbiAgICAgIHN1cGVyR3JhbW1hcixcbiAgICAgIHN0YXJ0UnVsZSxcbiAgICAgIHJ1bGVzXG4gICAgXSk7XG4gIH0sXG5cbiAgLy8gVE9ETzogQ29tZSB1cCB3aXRoIGJldHRlciBuYW1lcyBmb3IgdGhlc2UgbWV0aG9kcy5cbiAgLy8gVE9ETzogV3JpdGUgdGhlIGFuYWxvZyBvZiB0aGVzZSBtZXRob2RzIGZvciBpbmhlcml0ZWQgYXR0cmlidXRlcy5cbiAgdG9PcGVyYXRpb25BY3Rpb25EaWN0aW9uYXJ5VGVtcGxhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl90b09wZXJhdGlvbk9yQXR0cmlidXRlQWN0aW9uRGljdGlvbmFyeVRlbXBsYXRlKCk7XG4gIH0sXG4gIHRvQXR0cmlidXRlQWN0aW9uRGljdGlvbmFyeVRlbXBsYXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fdG9PcGVyYXRpb25PckF0dHJpYnV0ZUFjdGlvbkRpY3Rpb25hcnlUZW1wbGF0ZSgpO1xuICB9LFxuXG4gIF90b09wZXJhdGlvbk9yQXR0cmlidXRlQWN0aW9uRGljdGlvbmFyeVRlbXBsYXRlOiBmdW5jdGlvbigpIHtcbiAgICAvLyBUT0RPOiBhZGQgdGhlIHN1cGVyLWdyYW1tYXIncyB0ZW1wbGF0ZXMgYXQgdGhlIHJpZ2h0IHBsYWNlLCBlLmcuLCBhIGNhc2UgZm9yIEFkZEV4cHJfcGx1c1xuICAgIC8vIHNob3VsZCBhcHBlYXIgbmV4dCB0byBvdGhlciBjYXNlcyBvZiBBZGRFeHByLlxuXG4gICAgdmFyIHNiID0gbmV3IGNvbW1vbi5TdHJpbmdCdWZmZXIoKTtcbiAgICBzYi5hcHBlbmQoJ3snKTtcblxuICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgZm9yICh2YXIgcnVsZU5hbWUgaW4gdGhpcy5ydWxlcykge1xuICAgICAgdmFyIGJvZHkgPSB0aGlzLnJ1bGVzW3J1bGVOYW1lXS5ib2R5O1xuICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzYi5hcHBlbmQoJywnKTtcbiAgICAgIH1cbiAgICAgIHNiLmFwcGVuZCgnXFxuJyk7XG4gICAgICBzYi5hcHBlbmQoJyAgJyk7XG4gICAgICB0aGlzLmFkZFNlbWFudGljQWN0aW9uVGVtcGxhdGUocnVsZU5hbWUsIGJvZHksIHNiKTtcbiAgICB9XG5cbiAgICBzYi5hcHBlbmQoJ1xcbn0nKTtcbiAgICByZXR1cm4gc2IuY29udGVudHMoKTtcbiAgfSxcblxuICBhZGRTZW1hbnRpY0FjdGlvblRlbXBsYXRlOiBmdW5jdGlvbihydWxlTmFtZSwgYm9keSwgc2IpIHtcbiAgICBzYi5hcHBlbmQocnVsZU5hbWUpO1xuICAgIHNiLmFwcGVuZCgnOiBmdW5jdGlvbignKTtcbiAgICB2YXIgYXJpdHkgPSB0aGlzLl90b3BEb3duQWN0aW9uQXJpdHkocnVsZU5hbWUpO1xuICAgIHNiLmFwcGVuZChjb21tb24ucmVwZWF0KCdfJywgYXJpdHkpLmpvaW4oJywgJykpO1xuICAgIHNiLmFwcGVuZCgnKSB7XFxuJyk7XG4gICAgc2IuYXBwZW5kKCcgIH0nKTtcbiAgfSxcblxuICAvLyBQYXJzZSBhIHN0cmluZyB3aGljaCBleHByZXNzZXMgYSBydWxlIGFwcGxpY2F0aW9uIGluIHRoaXMgZ3JhbW1hciwgYW5kIHJldHVybiB0aGVcbiAgLy8gcmVzdWx0aW5nIEFwcGx5IG5vZGUuXG4gIHBhcnNlQXBwbGljYXRpb246IGZ1bmN0aW9uKHN0cikge1xuICAgIHZhciBhcHA7XG4gICAgaWYgKHN0ci5pbmRleE9mKCc8JykgPT09IC0xKSB7XG4gICAgICAvLyBzaW1wbGUgYXBwbGljYXRpb25cbiAgICAgIGFwcCA9IG5ldyBwZXhwcnMuQXBwbHkoc3RyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcGFyYW1ldGVyaXplZCBhcHBsaWNhdGlvblxuICAgICAgdmFyIGNzdCA9IG9obUdyYW1tYXIubWF0Y2goc3RyLCAnQmFzZV9hcHBsaWNhdGlvbicpO1xuICAgICAgYXBwID0gYnVpbGRHcmFtbWFyKGNzdCwge30pO1xuICAgIH1cblxuICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBhcHBsaWNhdGlvbiBpcyB2YWxpZC5cbiAgICBpZiAoIShhcHAucnVsZU5hbWUgaW4gdGhpcy5ydWxlcykpIHtcbiAgICAgIHRocm93IGVycm9ycy51bmRlY2xhcmVkUnVsZShhcHAucnVsZU5hbWUsIHRoaXMubmFtZSk7XG4gICAgfVxuICAgIHZhciBmb3JtYWxzID0gdGhpcy5ydWxlc1thcHAucnVsZU5hbWVdLmZvcm1hbHM7XG4gICAgaWYgKGZvcm1hbHMubGVuZ3RoICE9PSBhcHAuYXJncy5sZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSB0aGlzLnJ1bGVzW2FwcC5ydWxlTmFtZV0uc291cmNlO1xuICAgICAgdGhyb3cgZXJyb3JzLndyb25nTnVtYmVyT2ZQYXJhbWV0ZXJzKGFwcC5ydWxlTmFtZSwgZm9ybWFscy5sZW5ndGgsIGFwcC5hcmdzLmxlbmd0aCwgc291cmNlKTtcbiAgICB9XG4gICAgcmV0dXJuIGFwcDtcbiAgfVxufTtcblxuLy8gVGhlIGZvbGxvd2luZyBncmFtbWFyIGNvbnRhaW5zIGEgZmV3IHJ1bGVzIHRoYXQgY291bGRuJ3QgYmUgd3JpdHRlbiAgaW4gXCJ1c2VybGFuZFwiLlxuLy8gQXQgdGhlIGJvdHRvbSBvZiBzcmMvbWFpbi5qcywgd2UgY3JlYXRlIGEgc3ViLWdyYW1tYXIgb2YgdGhpcyBncmFtbWFyIHRoYXQncyBjYWxsZWRcbi8vIGBCdWlsdEluUnVsZXNgLiBUaGF0IGdyYW1tYXIgY29udGFpbnMgc2V2ZXJhbCBjb252ZW5pZW5jZSBydWxlcywgZS5nLiwgYGxldHRlcmAgYW5kXG4vLyBgZGlnaXRgLCBhbmQgaXMgaW1wbGljaXRseSB0aGUgc3VwZXItZ3JhbW1hciBvZiBhbnkgZ3JhbW1hciB3aG9zZSBzdXBlci1ncmFtbWFyXG4vLyBpc24ndCBzcGVjaWZpZWQuXG5HcmFtbWFyLlByb3RvQnVpbHRJblJ1bGVzID0gbmV3IEdyYW1tYXIoXG4gICdQcm90b0J1aWx0SW5SdWxlcycsICAvLyBuYW1lXG4gIHVuZGVmaW5lZCwgIC8vIHN1cGVyZ3JhbW1hclxuICB7XG4gICAgLy8gVGhlIGZvbGxvd2luZyBydWxlcyBjYW4ndCBiZSB3cml0dGVuIGluIHVzZXJsYW5kIGJlY2F1c2UgdGhleSByZWZlcmVuY2VcbiAgICAvLyBgYW55YCBhbmQgYGVuZGAgZGlyZWN0bHkuXG4gICAgYW55OiB7Ym9keTogcGV4cHJzLmFueSwgZm9ybWFsczogW10sIGRlc2NyaXB0aW9uOiAnYW55IG9iamVjdCd9LFxuICAgIGVuZDoge2JvZHk6IHBleHBycy5lbmQsIGZvcm1hbHM6IFtdLCBkZXNjcmlwdGlvbjogJ2VuZCBvZiBpbnB1dCd9LFxuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBydWxlIGlzIGludm9rZWQgaW1wbGljaXRseSBieSBzeW50YWN0aWMgcnVsZXMgdG8gc2tpcCBzcGFjZXMuXG4gICAgc3BhY2VzOiB7XG4gICAgICBib2R5OiBuZXcgcGV4cHJzLlN0YXIobmV3IHBleHBycy5BcHBseSgnc3BhY2UnKSksXG4gICAgICBmb3JtYWxzOiBbXVxuICAgIH0sXG5cbiAgICAvLyBUaGUgYHNwYWNlYCBydWxlIG11c3QgYmUgZGVmaW5lZCBoZXJlIGJlY2F1c2UgaXQncyByZWZlcmVuY2VkIGJ5IGBzcGFjZXNgLlxuICAgIHNwYWNlOiB7XG4gICAgICBib2R5OiBuZXcgcGV4cHJzLlJhbmdlKCdcXHgwMCcsICcgJyksXG4gICAgICBmb3JtYWxzOiBbXSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnYSBzcGFjZSdcbiAgICB9LFxuXG4gICAgLy8gVGhlc2UgcnVsZXMgYXJlIGltcGxlbWVudGVkIG5hdGl2ZWx5IGJlY2F1c2UgdGhleSB1c2UgVW5pY29kZUNoYXIgZGlyZWN0bHksIHdoaWNoIGlzXG4gICAgLy8gbm90IHBhcnQgb2YgdGhlIE9obSBncmFtbWFyLlxuICAgIGxvd2VyOiB7XG4gICAgICBib2R5OiBuZXcgcGV4cHJzLlVuaWNvZGVDaGFyKCdMbCcpLFxuICAgICAgZm9ybWFsczogW10sXG4gICAgICBkZXNjcmlwdGlvbjogJ2EgbG93ZXJjYXNlIGxldHRlcidcbiAgICB9LFxuICAgIHVwcGVyOiB7XG4gICAgICBib2R5OiBuZXcgcGV4cHJzLlVuaWNvZGVDaGFyKCdMdScpLFxuICAgICAgZm9ybWFsczogW10sXG4gICAgICBkZXNjcmlwdGlvbjogJ2FuIHVwcGVyY2FzZSBsZXR0ZXInXG4gICAgfSxcblxuICAgIC8vIFRoZSB1bmlvbiBvZiBMdCAodGl0bGVjYXNlKSwgTG0gKG1vZGlmaWVyKSwgYW5kIExvIChvdGhlciksIGkuZS4gYW55IGxldHRlciBub3RcbiAgICAvLyBpbiBMbCBvciBMdS5cbiAgICB1bmljb2RlTHRtbzoge1xuICAgICAgYm9keTogbmV3IHBleHBycy5Vbmljb2RlQ2hhcignTHRtbycpLFxuICAgICAgZm9ybWFsczogW11cbiAgICB9XG4gIH1cbik7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyYW1tYXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgR3JhbW1hciA9IHJlcXVpcmUoJy4vR3JhbW1hcicpO1xudmFyIElucHV0U3RyZWFtID0gcmVxdWlyZSgnLi9JbnB1dFN0cmVhbScpO1xudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBTdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gQ29uc3RydWN0b3JzXG5cbmZ1bmN0aW9uIEdyYW1tYXJEZWNsKG5hbWUpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbn1cblxuLy8gSGVscGVyc1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUuc291cmNlSW50ZXJ2YWwgPSBmdW5jdGlvbihzdGFydElkeCwgZW5kSWR4KSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHRoaXMuc291cmNlLmlucHV0U3RyZWFtO1xuICByZXR1cm4gaW5wdXRTdHJlYW0uaW50ZXJ2YWwoc3RhcnRJZHgsIGVuZElkeCk7XG59O1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUuZW5zdXJlU3VwZXJHcmFtbWFyID0gZnVuY3Rpb24oKSB7XG4gIGlmICghdGhpcy5zdXBlckdyYW1tYXIpIHtcbiAgICB0aGlzLndpdGhTdXBlckdyYW1tYXIoXG4gICAgICAgIC8vIFRPRE86IFRoZSBjb25kaXRpb25hbCBleHByZXNzaW9uIGJlbG93IGlzIGFuIHVnbHkgaGFjay4gSXQncyBraW5kIG9mIG9rIGJlY2F1c2VcbiAgICAgICAgLy8gSSBkb3VidCBhbnlvbmUgd2lsbCBldmVyIHRyeSB0byBkZWNsYXJlIGEgZ3JhbW1hciBjYWxsZWQgYEJ1aWx0SW5SdWxlc2AuIFN0aWxsLFxuICAgICAgICAvLyB3ZSBzaG91bGQgdHJ5IHRvIGZpbmQgYSBiZXR0ZXIgd2F5IHRvIGRvIHRoaXMuXG4gICAgICAgIHRoaXMubmFtZSA9PT0gJ0J1aWx0SW5SdWxlcycgP1xuICAgICAgICAgICAgR3JhbW1hci5Qcm90b0J1aWx0SW5SdWxlcyA6XG4gICAgICAgICAgICBHcmFtbWFyLkJ1aWx0SW5SdWxlcyk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuc3VwZXJHcmFtbWFyO1xufTtcblxuR3JhbW1hckRlY2wucHJvdG90eXBlLmluc3RhbGxPdmVycmlkZGVuT3JFeHRlbmRlZFJ1bGUgPSBmdW5jdGlvbihuYW1lLCBmb3JtYWxzLCBib2R5LCBzb3VyY2UpIHtcbiAgdmFyIGR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzID0gY29tbW9uLmdldER1cGxpY2F0ZXMoZm9ybWFscyk7XG4gIGlmIChkdXBsaWNhdGVQYXJhbWV0ZXJOYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgZXJyb3JzLmR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzKG5hbWUsIGR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzLCBib2R5LCBzb3VyY2UpO1xuICB9XG4gIHZhciBydWxlSW5mbyA9IHRoaXMuZW5zdXJlU3VwZXJHcmFtbWFyKCkucnVsZXNbbmFtZV07XG4gIHZhciBleHBlY3RlZEZvcm1hbHMgPSBydWxlSW5mby5mb3JtYWxzO1xuICB2YXIgZXhwZWN0ZWROdW1Gb3JtYWxzID0gZXhwZWN0ZWRGb3JtYWxzID8gZXhwZWN0ZWRGb3JtYWxzLmxlbmd0aCA6IDA7XG4gIGlmIChmb3JtYWxzLmxlbmd0aCAhPT0gZXhwZWN0ZWROdW1Gb3JtYWxzKSB7XG4gICAgdGhyb3cgZXJyb3JzLndyb25nTnVtYmVyT2ZQYXJhbWV0ZXJzKG5hbWUsIGV4cGVjdGVkTnVtRm9ybWFscywgZm9ybWFscy5sZW5ndGgsIGJvZHksIHNvdXJjZSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuaW5zdGFsbChuYW1lLCBmb3JtYWxzLCBib2R5LCBydWxlSW5mby5kZXNjcmlwdGlvbiwgc291cmNlKTtcbn07XG5cbkdyYW1tYXJEZWNsLnByb3RvdHlwZS5pbnN0YWxsID0gZnVuY3Rpb24obmFtZSwgZm9ybWFscywgYm9keSwgZGVzY3JpcHRpb24sIHNvdXJjZSkge1xuICB0aGlzLnJ1bGVzW25hbWVdID0ge1xuICAgIGJvZHk6IGJvZHkuaW50cm9kdWNlUGFyYW1zKGZvcm1hbHMpLFxuICAgIGZvcm1hbHM6IGZvcm1hbHMsXG4gICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgIHNvdXJjZTogc291cmNlXG4gIH07XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gU3R1ZmYgdGhhdCB5b3Ugc2hvdWxkIG9ubHkgZG8gb25jZVxuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUud2l0aFN1cGVyR3JhbW1hciA9IGZ1bmN0aW9uKHN1cGVyR3JhbW1hcikge1xuICBpZiAodGhpcy5zdXBlckdyYW1tYXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBzdXBlciBncmFtbWFyIG9mIGEgR3JhbW1hckRlY2wgY2Fubm90IGJlIHNldCBtb3JlIHRoYW4gb25jZScpO1xuICB9XG4gIHRoaXMuc3VwZXJHcmFtbWFyID0gc3VwZXJHcmFtbWFyO1xuICB0aGlzLnJ1bGVzID0gT2JqZWN0LmNyZWF0ZShzdXBlckdyYW1tYXIucnVsZXMpO1xuXG4gIC8vIEdyYW1tYXJzIHdpdGggYW4gZXhwbGljaXQgc3VwZXJncmFtbWFyIGluaGVyaXQgYSBkZWZhdWx0IHN0YXJ0IHJ1bGUuXG4gIGlmICghc3VwZXJHcmFtbWFyLmlzQnVpbHRJbigpKSB7XG4gICAgdGhpcy5kZWZhdWx0U3RhcnRSdWxlID0gc3VwZXJHcmFtbWFyLmRlZmF1bHRTdGFydFJ1bGU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUud2l0aERlZmF1bHRTdGFydFJ1bGUgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmRlZmF1bHRTdGFydFJ1bGUgPSBydWxlTmFtZTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUud2l0aFNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZSkge1xuICB0aGlzLnNvdXJjZSA9IG5ldyBJbnB1dFN0cmVhbShzb3VyY2UpLmludGVydmFsKDAsIHNvdXJjZS5sZW5ndGgpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIENyZWF0ZXMgYSBHcmFtbWFyIGluc3RhbmNlLCBhbmQgaWYgaXQgcGFzc2VzIHRoZSBzYW5pdHkgY2hlY2tzLCByZXR1cm5zIGl0LlxuR3JhbW1hckRlY2wucHJvdG90eXBlLmJ1aWxkID0gZnVuY3Rpb24oKSB7XG4gIHZhciBncmFtbWFyID0gbmV3IEdyYW1tYXIoXG4gICAgICB0aGlzLm5hbWUsXG4gICAgICB0aGlzLmVuc3VyZVN1cGVyR3JhbW1hcigpLFxuICAgICAgdGhpcy5ydWxlcyxcbiAgICAgIHRoaXMuZGVmYXVsdFN0YXJ0UnVsZSk7XG5cbiAgLy8gVE9ETzogY2hhbmdlIHRoZSBwZXhwci5wcm90b3R5cGUuYXNzZXJ0Li4uIG1ldGhvZHMgdG8gbWFrZSB0aGVtIGFkZFxuICAvLyBleGNlcHRpb25zIHRvIGFuIGFycmF5IHRoYXQncyBwcm92aWRlZCBhcyBhbiBhcmcuIFRoZW4gd2UnbGwgYmUgYWJsZSB0b1xuICAvLyBzaG93IG1vcmUgdGhhbiBvbmUgZXJyb3Igb2YgdGhlIHNhbWUgdHlwZSBhdCBhIHRpbWUuXG4gIC8vIFRPRE86IGluY2x1ZGUgdGhlIG9mZmVuZGluZyBwZXhwciBpbiB0aGUgZXJyb3JzLCB0aGF0IHdheSB3ZSBjYW4gc2hvd1xuICAvLyB0aGUgcGFydCBvZiB0aGUgc291cmNlIHRoYXQgY2F1c2VkIGl0LlxuICB2YXIgZ3JhbW1hckVycm9ycyA9IFtdO1xuICB2YXIgZ3JhbW1hckhhc0ludmFsaWRBcHBsaWNhdGlvbnMgPSBmYWxzZTtcbiAgT2JqZWN0LmtleXMoZ3JhbW1hci5ydWxlcykuZm9yRWFjaChmdW5jdGlvbihydWxlTmFtZSkge1xuICAgIHZhciBib2R5ID0gZ3JhbW1hci5ydWxlc1tydWxlTmFtZV0uYm9keTtcbiAgICB0cnkge1xuICAgICAgYm9keS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eShydWxlTmFtZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZ3JhbW1hckVycm9ycy5wdXNoKGUpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgYm9keS5hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZChydWxlTmFtZSwgZ3JhbW1hcik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZ3JhbW1hckVycm9ycy5wdXNoKGUpO1xuICAgICAgZ3JhbW1hckhhc0ludmFsaWRBcHBsaWNhdGlvbnMgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIGlmICghZ3JhbW1hckhhc0ludmFsaWRBcHBsaWNhdGlvbnMpIHtcbiAgICAvLyBUaGUgZm9sbG93aW5nIGNoZWNrIGNhbiBvbmx5IGJlIGRvbmUgaWYgdGhlIGdyYW1tYXIgaGFzIG5vIGludmFsaWQgYXBwbGljYXRpb25zLlxuICAgIE9iamVjdC5rZXlzKGdyYW1tYXIucnVsZXMpLmZvckVhY2goZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgICAgIHZhciBib2R5ID0gZ3JhbW1hci5ydWxlc1tydWxlTmFtZV0uYm9keTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGJvZHkuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlKGdyYW1tYXIsIHJ1bGVOYW1lKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZ3JhbW1hckVycm9ycy5wdXNoKGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGlmIChncmFtbWFyRXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICBlcnJvcnMudGhyb3dFcnJvcnMoZ3JhbW1hckVycm9ycyk7XG4gIH1cbiAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgZ3JhbW1hci5zb3VyY2UgPSB0aGlzLnNvdXJjZTtcbiAgfVxuXG4gIHJldHVybiBncmFtbWFyO1xufTtcblxuLy8gUnVsZSBkZWNsYXJhdGlvbnNcblxuR3JhbW1hckRlY2wucHJvdG90eXBlLmRlZmluZSA9IGZ1bmN0aW9uKG5hbWUsIGZvcm1hbHMsIGJvZHksIGRlc2NyaXB0aW9uLCBzb3VyY2UpIHtcbiAgdGhpcy5lbnN1cmVTdXBlckdyYW1tYXIoKTtcbiAgaWYgKHRoaXMuc3VwZXJHcmFtbWFyLnJ1bGVzW25hbWVdKSB7XG4gICAgdGhyb3cgZXJyb3JzLmR1cGxpY2F0ZVJ1bGVEZWNsYXJhdGlvbihuYW1lLCB0aGlzLm5hbWUsIHRoaXMuc3VwZXJHcmFtbWFyLm5hbWUsIGJvZHksIHNvdXJjZSk7XG4gIH0gZWxzZSBpZiAodGhpcy5ydWxlc1tuYW1lXSkge1xuICAgIHRocm93IGVycm9ycy5kdXBsaWNhdGVSdWxlRGVjbGFyYXRpb24obmFtZSwgdGhpcy5uYW1lLCB0aGlzLm5hbWUsIGJvZHksIHNvdXJjZSk7XG4gIH1cbiAgdmFyIGR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzID0gY29tbW9uLmdldER1cGxpY2F0ZXMoZm9ybWFscyk7XG4gIGlmIChkdXBsaWNhdGVQYXJhbWV0ZXJOYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgZXJyb3JzLmR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzKG5hbWUsIGR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzLCBib2R5LCBzb3VyY2UpO1xuICB9XG4gIHJldHVybiB0aGlzLmluc3RhbGwobmFtZSwgZm9ybWFscywgYm9keSwgZGVzY3JpcHRpb24sIHNvdXJjZSk7XG59O1xuXG5HcmFtbWFyRGVjbC5wcm90b3R5cGUub3ZlcnJpZGUgPSBmdW5jdGlvbihuYW1lLCBmb3JtYWxzLCBib2R5LCBkZXNjSWdub3JlZCwgc291cmNlKSB7XG4gIHZhciBydWxlSW5mbyA9IHRoaXMuZW5zdXJlU3VwZXJHcmFtbWFyKCkucnVsZXNbbmFtZV07XG4gIGlmICghcnVsZUluZm8pIHtcbiAgICB0aHJvdyBlcnJvcnMuY2Fubm90T3ZlcnJpZGVVbmRlY2xhcmVkUnVsZShuYW1lLCB0aGlzLnN1cGVyR3JhbW1hci5uYW1lLCBib2R5LCBzb3VyY2UpO1xuICB9XG4gIHRoaXMuaW5zdGFsbE92ZXJyaWRkZW5PckV4dGVuZGVkUnVsZShuYW1lLCBmb3JtYWxzLCBib2R5LCBzb3VyY2UpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkdyYW1tYXJEZWNsLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbihuYW1lLCBmb3JtYWxzLCBmcmFnbWVudCwgZGVzY0lnbm9yZWQsIHNvdXJjZSkge1xuICB2YXIgcnVsZUluZm8gPSB0aGlzLmVuc3VyZVN1cGVyR3JhbW1hcigpLnJ1bGVzW25hbWVdO1xuICBpZiAoIXJ1bGVJbmZvKSB7XG4gICAgdGhyb3cgZXJyb3JzLmNhbm5vdEV4dGVuZFVuZGVjbGFyZWRSdWxlKG5hbWUsIHRoaXMuc3VwZXJHcmFtbWFyLm5hbWUsIGZyYWdtZW50LCBzb3VyY2UpO1xuICB9XG4gIHZhciBib2R5ID0gbmV3IHBleHBycy5FeHRlbmQodGhpcy5zdXBlckdyYW1tYXIsIG5hbWUsIGZyYWdtZW50KTtcbiAgYm9keS5zb3VyY2UgPSBmcmFnbWVudC5zb3VyY2U7XG4gIHRoaXMuaW5zdGFsbE92ZXJyaWRkZW5PckV4dGVuZGVkUnVsZShuYW1lLCBmb3JtYWxzLCBib2R5LCBzb3VyY2UpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdyYW1tYXJEZWNsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIEludGVydmFsID0gcmVxdWlyZSgnLi9JbnRlcnZhbCcpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gSW5wdXRTdHJlYW0oc291cmNlKSB7XG4gIHRoaXMuc291cmNlID0gc291cmNlO1xuICB0aGlzLnBvcyA9IDA7XG4gIHRoaXMucG9zSW5mb3MgPSBbXTtcbn1cblxuSW5wdXRTdHJlYW0ucHJvdG90eXBlID0ge1xuICBhdEVuZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zID09PSB0aGlzLnNvdXJjZS5sZW5ndGg7XG4gIH0sXG5cbiAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlW3RoaXMucG9zKytdO1xuICB9LFxuXG4gIG1hdGNoU3RyaW5nOiBmdW5jdGlvbihzKSB7XG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICBpZiAodGhpcy5uZXh0KCkgIT09IHNbaWR4XSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIHNvdXJjZVNsaWNlOiBmdW5jdGlvbihzdGFydElkeCwgZW5kSWR4KSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlLnNsaWNlKHN0YXJ0SWR4LCBlbmRJZHgpO1xuICB9LFxuXG4gIGludGVydmFsOiBmdW5jdGlvbihzdGFydElkeCwgb3B0RW5kSWR4KSB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcnZhbCh0aGlzLCBzdGFydElkeCwgb3B0RW5kSWR4ID8gb3B0RW5kSWR4IDogdGhpcy5wb3MpO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dFN0cmVhbTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBhc3NlcnQgPSByZXF1aXJlKCcuL2NvbW1vbicpLmFzc2VydDtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIEludGVydmFsKGlucHV0U3RyZWFtLCBzdGFydElkeCwgZW5kSWR4KSB7XG4gIHRoaXMuaW5wdXRTdHJlYW0gPSBpbnB1dFN0cmVhbTtcbiAgdGhpcy5zdGFydElkeCA9IHN0YXJ0SWR4O1xuICB0aGlzLmVuZElkeCA9IGVuZElkeDtcbn1cblxuSW50ZXJ2YWwuY292ZXJhZ2UgPSBmdW5jdGlvbigvKiBpbnRlcnZhbDEsIGludGVydmFsMiwgLi4uICovKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IGFyZ3VtZW50c1swXS5pbnB1dFN0cmVhbTtcbiAgdmFyIHN0YXJ0SWR4ID0gYXJndW1lbnRzWzBdLnN0YXJ0SWR4O1xuICB2YXIgZW5kSWR4ID0gYXJndW1lbnRzWzBdLmVuZElkeDtcbiAgZm9yICh2YXIgaWR4ID0gMTsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB2YXIgaW50ZXJ2YWwgPSBhcmd1bWVudHNbaWR4XTtcbiAgICBpZiAoaW50ZXJ2YWwuaW5wdXRTdHJlYW0gIT09IGlucHV0U3RyZWFtKSB7XG4gICAgICB0aHJvdyBlcnJvcnMuaW50ZXJ2YWxTb3VyY2VzRG9udE1hdGNoKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0SWR4ID0gTWF0aC5taW4oc3RhcnRJZHgsIGFyZ3VtZW50c1tpZHhdLnN0YXJ0SWR4KTtcbiAgICAgIGVuZElkeCA9IE1hdGgubWF4KGVuZElkeCwgYXJndW1lbnRzW2lkeF0uZW5kSWR4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ldyBJbnRlcnZhbChpbnB1dFN0cmVhbSwgc3RhcnRJZHgsIGVuZElkeCk7XG59O1xuXG5JbnRlcnZhbC5wcm90b3R5cGUgPSB7XG4gIGNvdmVyYWdlV2l0aDogZnVuY3Rpb24oLyogaW50ZXJ2YWwxLCBpbnRlcnZhbDIsIC4uLiAqLykge1xuICAgIHZhciBpbnRlcnZhbHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIGludGVydmFscy5wdXNoKHRoaXMpO1xuICAgIHJldHVybiBJbnRlcnZhbC5jb3ZlcmFnZS5hcHBseSh1bmRlZmluZWQsIGludGVydmFscyk7XG4gIH0sXG5cbiAgY29sbGFwc2VkTGVmdDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcnZhbCh0aGlzLmlucHV0U3RyZWFtLCB0aGlzLnN0YXJ0SWR4LCB0aGlzLnN0YXJ0SWR4KTtcbiAgfSxcblxuICBjb2xsYXBzZWRSaWdodDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBJbnRlcnZhbCh0aGlzLmlucHV0U3RyZWFtLCB0aGlzLmVuZElkeCwgdGhpcy5lbmRJZHgpO1xuICB9LFxuXG4gIGdldExpbmVBbmRDb2x1bW5NZXNzYWdlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmFuZ2UgPSBbdGhpcy5zdGFydElkeCwgdGhpcy5lbmRJZHhdO1xuICAgIHJldHVybiB1dGlsLmdldExpbmVBbmRDb2x1bW5NZXNzYWdlKHRoaXMuaW5wdXRTdHJlYW0uc291cmNlLCB0aGlzLnN0YXJ0SWR4LCByYW5nZSk7XG4gIH0sXG5cbiAgLy8gUmV0dXJucyBhbiBhcnJheSBvZiAwLCAxLCBvciAyIGludGVydmFscyB0aGF0IHJlcHJlc2VudHMgdGhlIHJlc3VsdCBvZiB0aGVcbiAgLy8gaW50ZXJ2YWwgZGlmZmVyZW5jZSBvcGVyYXRpb24uXG4gIG1pbnVzOiBmdW5jdGlvbih0aGF0KSB7XG4gICAgaWYgKHRoaXMuaW5wdXRTdHJlYW0gIT09IHRoYXQuaW5wdXRTdHJlYW0pIHtcbiAgICAgIHRocm93IGVycm9ycy5pbnRlcnZhbFNvdXJjZXNEb250TWF0Y2goKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhcnRJZHggPT09IHRoYXQuc3RhcnRJZHggJiYgdGhpcy5lbmRJZHggPT09IHRoYXQuZW5kSWR4KSB7XG4gICAgICAvLyBgdGhpc2AgYW5kIGB0aGF0YCBhcmUgdGhlIHNhbWUgaW50ZXJ2YWwhXG4gICAgICByZXR1cm4gW1xuICAgICAgXTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhcnRJZHggPCB0aGF0LnN0YXJ0SWR4ICYmIHRoYXQuZW5kSWR4IDwgdGhpcy5lbmRJZHgpIHtcbiAgICAgIC8vIGB0aGF0YCBzcGxpdHMgYHRoaXNgIGludG8gdHdvIGludGVydmFsc1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgbmV3IEludGVydmFsKHRoaXMuaW5wdXRTdHJlYW0sIHRoaXMuc3RhcnRJZHgsIHRoYXQuc3RhcnRJZHgpLFxuICAgICAgICBuZXcgSW50ZXJ2YWwodGhpcy5pbnB1dFN0cmVhbSwgdGhhdC5lbmRJZHgsIHRoaXMuZW5kSWR4KVxuICAgICAgXTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhcnRJZHggPCB0aGF0LmVuZElkeCAmJiB0aGF0LmVuZElkeCA8IHRoaXMuZW5kSWR4KSB7XG4gICAgICAvLyBgdGhhdGAgY29udGFpbnMgYSBwcmVmaXggb2YgYHRoaXNgXG4gICAgICByZXR1cm4gW1xuICAgICAgICBuZXcgSW50ZXJ2YWwodGhpcy5pbnB1dFN0cmVhbSwgdGhhdC5lbmRJZHgsIHRoaXMuZW5kSWR4KVxuICAgICAgXTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhcnRJZHggPCB0aGF0LnN0YXJ0SWR4ICYmIHRoYXQuc3RhcnRJZHggPCB0aGlzLmVuZElkeCkge1xuICAgICAgLy8gYHRoYXRgIGNvbnRhaW5zIGEgc3VmZml4IG9mIGB0aGlzYFxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgbmV3IEludGVydmFsKHRoaXMuaW5wdXRTdHJlYW0sIHRoaXMuc3RhcnRJZHgsIHRoYXQuc3RhcnRJZHgpXG4gICAgICBdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBgdGhhdGAgYW5kIGB0aGlzYCBkbyBub3Qgb3ZlcmxhcFxuICAgICAgcmV0dXJuIFtcbiAgICAgICAgdGhpc1xuICAgICAgXTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gUmV0dXJucyBhIG5ldyBJbnRlcnZhbCB0aGF0IGhhcyB0aGUgc2FtZSBleHRlbnQgYXMgdGhpcyBvbmUsIGJ1dCB3aGljaCBpcyByZWxhdGl2ZVxuICAvLyB0byBgdGhhdGAsIGFuIEludGVydmFsIHRoYXQgZnVsbHkgY292ZXJzIHRoaXMgb25lLlxuICByZWxhdGl2ZVRvOiBmdW5jdGlvbih0aGF0LCBuZXdJbnB1dFN0cmVhbSkge1xuICAgIGlmICh0aGlzLmlucHV0U3RyZWFtICE9PSB0aGF0LmlucHV0U3RyZWFtKSB7XG4gICAgICB0aHJvdyBlcnJvcnMuaW50ZXJ2YWxTb3VyY2VzRG9udE1hdGNoKCk7XG4gICAgfVxuICAgIGFzc2VydCh0aGlzLnN0YXJ0SWR4ID49IHRoYXQuc3RhcnRJZHggJiYgdGhpcy5lbmRJZHggPD0gdGhhdC5lbmRJZHgsXG4gICAgICAgICAgICdvdGhlciBpbnRlcnZhbCBkb2VzIG5vdCBjb3ZlciB0aGlzIG9uZScpO1xuICAgIHJldHVybiBuZXcgSW50ZXJ2YWwobmV3SW5wdXRTdHJlYW0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SWR4IC0gdGhhdC5zdGFydElkeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kSWR4IC0gdGhhdC5zdGFydElkeCk7XG4gIH0sXG5cbiAgLy8gUmV0dXJucyBhIG5ldyBJbnRlcnZhbCB3aGljaCBjb250YWlucyB0aGUgc2FtZSBjb250ZW50cyBhcyB0aGlzIG9uZSxcbiAgLy8gYnV0IHdpdGggd2hpdGVzcGFjZSB0cmltbWVkIGZyb20gYm90aCBlbmRzLiAoVGhpcyBvbmx5IG1ha2VzIHNlbnNlIHdoZW5cbiAgLy8gdGhlIGlucHV0IHN0cmVhbSBpcyBhIHN0cmluZy4pXG4gIHRyaW1tZWQ6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb250ZW50cyA9IHRoaXMuY29udGVudHM7XG4gICAgdmFyIHN0YXJ0SWR4ID0gdGhpcy5zdGFydElkeCArIGNvbnRlbnRzLm1hdGNoKC9eXFxzKi8pWzBdLmxlbmd0aDtcbiAgICB2YXIgZW5kSWR4ID0gdGhpcy5lbmRJZHggLSBjb250ZW50cy5tYXRjaCgvXFxzKiQvKVswXS5sZW5ndGg7XG4gICAgcmV0dXJuIG5ldyBJbnRlcnZhbCh0aGlzLmlucHV0U3RyZWFtLCBzdGFydElkeCwgZW5kSWR4KTtcbiAgfVxufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoSW50ZXJ2YWwucHJvdG90eXBlLCB7XG4gIGNvbnRlbnRzOiB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLl9jb250ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRzID0gdGhpcy5pbnB1dFN0cmVhbS5zb3VyY2VTbGljZSh0aGlzLnN0YXJ0SWR4LCB0aGlzLmVuZElkeCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fY29udGVudHM7XG4gICAgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG4gIH0sXG4gIGxlbmd0aDoge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmVuZElkeCAtIHRoaXMuc3RhcnRJZHg7IH0sXG4gICAgZW51bWVyYWJsZTogdHJ1ZVxuICB9XG59KTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJ2YWw7XG5cbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIG5vZGVzID0gcmVxdWlyZSgnLi9ub2RlcycpO1xudmFyIHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKTtcbnZhciBJbnRlcnZhbCA9IHJlcXVpcmUoJy4vSW50ZXJ2YWwnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIENyZWF0ZSBhIHNob3J0IGVycm9yIG1lc3NhZ2UgZm9yIGFuIGVycm9yIHRoYXQgb2NjdXJyZWQgZHVyaW5nIG1hdGNoaW5nLlxuZnVuY3Rpb24gZ2V0U2hvcnRNYXRjaEVycm9yTWVzc2FnZShwb3MsIHNvdXJjZSwgZGV0YWlsKSB7XG4gIHZhciBlcnJvckluZm8gPSB1dGlsLmdldExpbmVBbmRDb2x1bW4oc291cmNlLCBwb3MpO1xuICByZXR1cm4gJ0xpbmUgJyArIGVycm9ySW5mby5saW5lTnVtICsgJywgY29sICcgKyBlcnJvckluZm8uY29sTnVtICsgJzogJyArIGRldGFpbDtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gTWF0Y2hGYWlsdXJlIC0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIE1hdGNoUmVzdWx0KHN0YXRlKSB7XG4gIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgdGhpcy5fY3N0ID0gc3RhdGUuYmluZGluZ3NbMF07XG59XG5cbk1hdGNoUmVzdWx0Lm5ld0ZvciA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBzdWNjZWVkZWQgPSBzdGF0ZS5iaW5kaW5ncy5sZW5ndGggPiAwO1xuICByZXR1cm4gc3VjY2VlZGVkID8gbmV3IE1hdGNoUmVzdWx0KHN0YXRlKSA6IG5ldyBNYXRjaEZhaWx1cmUoc3RhdGUpO1xufTtcblxuTWF0Y2hSZXN1bHQucHJvdG90eXBlLmZhaWxlZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5NYXRjaFJlc3VsdC5wcm90b3R5cGUuc3VjY2VlZGVkID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAhdGhpcy5mYWlsZWQoKTtcbn07XG5cbi8vIFJldHVybnMgYSBgTWF0Y2hSZXN1bHRgIHRoYXQgY2FuIGJlIGZlZCBpbnRvIG9wZXJhdGlvbnMgb3IgYXR0cmlidXRlcyB0aGF0IGNhcmVcbi8vIGFib3V0IHRoZSB3aGl0ZXNwYWNlIHRoYXQgd2FzIGltcGxpY2l0bHkgc2tpcHBlZCBvdmVyIGJ5IHN5bnRhY3RpYyBydWxlcy4gVGhpc1xuLy8gaXMgdXNlZnVsIGZvciBkb2luZyB0aGluZ3Mgd2l0aCBjb21tZW50cywgZS5nLiwgc3ludGF4IGhpZ2hsaWdodGluZy5cbk1hdGNoUmVzdWx0LnByb3RvdHlwZS5nZXREaXNjYXJkZWRTcGFjZXMgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZmFpbGVkKCkpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlO1xuICB2YXIgZ3JhbW1hciA9IHN0YXRlLmdyYW1tYXI7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuXG4gIHZhciBpbnRlcnZhbHMgPSBbbmV3IEludGVydmFsKGlucHV0U3RyZWFtLCAwLCBpbnB1dFN0cmVhbS5zb3VyY2UubGVuZ3RoKV07XG5cbiAgLy8gU3VidHJhY3QgdGhlIGludGVydmFsIG9mIGVhY2ggdGVybWluYWwgZnJvbSB0aGUgc2V0IG9mIGludGVydmFscyBhYm92ZS5cbiAgdmFyIHMgPSBncmFtbWFyLmNyZWF0ZVNlbWFudGljcygpLmFkZE9wZXJhdGlvbignc3VidHJhY3RUZXJtaW5hbHMnLCB7XG4gICAgX25vbnRlcm1pbmFsOiBmdW5jdGlvbihjaGlsZHJlbikge1xuICAgICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICBjaGlsZC5zdWJ0cmFjdFRlcm1pbmFscygpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBfdGVybWluYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHQgPSB0aGlzO1xuICAgICAgaW50ZXJ2YWxzID0gaW50ZXJ2YWxzXG4gICAgICAgICAgLm1hcChmdW5jdGlvbihpbnRlcnZhbCkgeyByZXR1cm4gaW50ZXJ2YWwubWludXModC5pbnRlcnZhbCk7IH0pXG4gICAgICAgICAgLnJlZHVjZShmdW5jdGlvbih4cywgeXMpIHsgcmV0dXJuIHhzLmNvbmNhdCh5cyk7IH0sIFtdKTtcbiAgICB9XG4gIH0pO1xuICBzKHRoaXMpLnN1YnRyYWN0VGVybWluYWxzKCk7XG5cbiAgLy8gTm93IGBpbnRlcnZhbHNgIGhvbGRzIHRoZSBpbnRlcnZhbHMgb2YgdGhlIGlucHV0IHN0cmVhbSB0aGF0IHdlcmUgc2tpcHBlZCBvdmVyIGJ5IHN5bnRhY3RpY1xuICAvLyBydWxlcywgYmVjYXVzZSB0aGV5IGNvbnRhaW5lZCBzcGFjZXMuXG5cbiAgLy8gTmV4dCwgd2Ugd2FudCB0byBtYXRjaCB0aGUgY29udGVudHMgb2YgZWFjaCBvZiB0aG9zZSBpbnRlcnZhbHMgd2l0aCB0aGUgZ3JhbW1hcidzIGBzcGFjZXNgXG4gIC8vIHJ1bGUsIHRvIHJlY29uc3RydWN0IHRoZSBDU1Qgbm9kZXMgdGhhdCB3ZXJlIGRpc2NhcmRlZCBieSBzeW50YWN0aWMgcnVsZXMuIEJ1dCBpZiB3ZSBzaW1wbHlcbiAgLy8gcGFzcyBlYWNoIGludGVydmFsJ3MgYGNvbnRlbnRzYCB0byB0aGUgZ3JhbW1hcidzIGBtYXRjaGAgbWV0aG9kLCB0aGUgcmVzdWx0aW5nIG5vZGVzIGFuZFxuICAvLyB0aGVpciBjaGlsZHJlbiB3aWxsIGhhdmUgaW50ZXJ2YWxzIHRoYXQgYXJlIGFzc29jaWF0ZWQgd2l0aCBhIGRpZmZlcmVudCBpbnB1dCwgaS5lLiwgYVxuICAvLyBzdWJzdHJpbmcgb2YgdGhlIG9yaWdpbmFsIGlucHV0LiBUaGUgZm9sbG93aW5nIG9wZXJhdGlvbiB3aWxsIGZpeCB0aGlzIHByb2JsZW0gZm9yIHVzLlxuICBzLmFkZE9wZXJhdGlvbignZml4SW50ZXJ2YWxzKGlkeE9mZnNldCknLCB7XG4gICAgX2RlZmF1bHQ6IGZ1bmN0aW9uKGNoaWxkcmVuKSB7XG4gICAgICB2YXIgaWR4T2Zmc2V0ID0gdGhpcy5hcmdzLmlkeE9mZnNldDtcbiAgICAgIHRoaXMuaW50ZXJ2YWwuaW5wdXRTdHJlYW0gPSBpbnB1dFN0cmVhbTtcbiAgICAgIHRoaXMuaW50ZXJ2YWwuc3RhcnRJZHggKz0gaWR4T2Zmc2V0O1xuICAgICAgdGhpcy5pbnRlcnZhbC5lbmRJZHggKz0gaWR4T2Zmc2V0O1xuICAgICAgaWYgKCF0aGlzLmlzVGVybWluYWwoKSkge1xuICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgICAgY2hpbGQuZml4SW50ZXJ2YWxzKGlkeE9mZnNldCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gTm93IHdlJ3JlIGZpbmFsbHkgcmVhZHkgdG8gcmVjb25zdHJ1Y3QgdGhlIGRpc2NhcmRlZCBDU1Qgbm9kZXMuXG4gIHZhciBkaXNjYXJkZWROb2RlcyA9IGludGVydmFscy5tYXAoZnVuY3Rpb24oaW50ZXJ2YWwpIHtcbiAgICB2YXIgciA9IGdyYW1tYXIubWF0Y2goaW50ZXJ2YWwuY29udGVudHMsICdzcGFjZXMnKTtcbiAgICBzKHIpLmZpeEludGVydmFscyhpbnRlcnZhbC5zdGFydElkeCk7XG4gICAgcmV0dXJuIHIuX2NzdDtcbiAgfSk7XG5cbiAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuIGEgYnVuY2ggb2YgQ1NUIG5vZGVzIGFuZCBtYWtlIHRoZSBjYWxsZXIgb2YgdGhpcyBtZXRob2QgbG9vcCBvdmVyIHRoZW0sXG4gIC8vIHdlIGNhbiBjb25zdHJ1Y3QgYSBzaW5nbGUgQ1NUIG5vZGUgdGhhdCBpcyB0aGUgcGFyZW50IG9mIGFsbCBvZiB0aGUgZGlzY2FyZGVkIG5vZGVzLiBBblxuICAvLyBgSXRlcmF0aW9uTm9kZWAgaXMgdGhlIG9idmlvdXMgY2hvaWNlIGZvciB0aGlzLlxuICBkaXNjYXJkZWROb2RlcyA9IG5ldyBub2Rlcy5JdGVyYXRpb25Ob2RlKFxuICAgICAgZ3JhbW1hcixcbiAgICAgIGRpc2NhcmRlZE5vZGVzLFxuICAgICAgZGlzY2FyZGVkTm9kZXMubGVuZ3RoID09PSAwID9cbiAgICAgICAgICBuZXcgSW50ZXJ2YWwoaW5wdXRTdHJlYW0sIDAsIDApIDpcbiAgICAgICAgICBuZXcgSW50ZXJ2YWwoXG4gICAgICAgICAgICAgIGlucHV0U3RyZWFtLFxuICAgICAgICAgICAgICBkaXNjYXJkZWROb2Rlc1swXS5pbnRlcnZhbC5zdGFydElkeCxcbiAgICAgICAgICAgICAgZGlzY2FyZGVkTm9kZXNbZGlzY2FyZGVkTm9kZXMubGVuZ3RoIC0gMV0uaW50ZXJ2YWwuZW5kSWR4KSk7XG5cbiAgLy8gQnV0IHJlbWVtYmVyIHRoYXQgYSBDU1Qgbm9kZSBjYW4ndCBiZSB1c2VkIGRpcmVjdGx5IGJ5IGNsaWVudHMuIFdoYXQgd2UgcmVhbGx5IG5lZWQgdG8gcmV0dXJuXG4gIC8vIGZyb20gdGhpcyBtZXRob2QgaXMgYSBzdWNjZXNzZnVsIGBNYXRjaFJlc3VsdGAgdGhhdCBjYW4gYmUgdXNlZCB3aXRoIHRoZSBjbGllbnRzJyBzZW1hbnRpY3MuXG4gIC8vIFdlIGFscmVhZHkgaGF2ZSBvbmUgLS0gYHRoaXNgIC0tIGJ1dCBpdCdzIGdvdCBhIGRpZmZlcmVudCBDU1Qgbm9kZSBpbnNpZGUuIFNvIHdlIGNyZWF0ZSBhIG5ld1xuICAvLyBvYmplY3QgdGhhdCBkZWxlZ2F0ZXMgdG8gYHRoaXNgLCBhbmQgb3ZlcnJpZGUgaXRzIGBfY3N0YCBwcm9wZXJ0eS5cbiAgdmFyIHIgPSBPYmplY3QuY3JlYXRlKHRoaXMpO1xuICByLl9jc3QgPSBkaXNjYXJkZWROb2RlcztcblxuICAvLyBXZSBhbHNvIG92ZXJyaWRlIGl0cyBgZ2V0RGlzY2FyZGVkU3BhY2VzYCBtZXRob2QsIGluIGNhc2Ugc29tZW9uZSBkZWNpZGVzIHRvIGNhbGwgaXQuXG4gIHIuZ2V0RGlzY2FyZGVkU3BhY2VzID0gZnVuY3Rpb24oKSB7IHJldHVybiByOyB9O1xuXG4gIHJldHVybiByO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gTWF0Y2hGYWlsdXJlIC0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIE1hdGNoRmFpbHVyZShzdGF0ZSkge1xuICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gIGNvbW1vbi5kZWZpbmVMYXp5UHJvcGVydHkodGhpcywgJ19mYWlsdXJlcycsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLmdldEZhaWx1cmVzKCk7XG4gIH0pO1xuICBjb21tb24uZGVmaW5lTGF6eVByb3BlcnR5KHRoaXMsICdtZXNzYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNvdXJjZSA9IHRoaXMuc3RhdGUuaW5wdXRTdHJlYW0uc291cmNlO1xuICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuICdtYXRjaCBmYWlsZWQgYXQgcG9zaXRpb24gJyArIHRoaXMuZ2V0UmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgdmFyIGRldGFpbCA9ICdFeHBlY3RlZCAnICsgdGhpcy5nZXRFeHBlY3RlZFRleHQoKTtcbiAgICByZXR1cm4gdXRpbC5nZXRMaW5lQW5kQ29sdW1uTWVzc2FnZShzb3VyY2UsIHRoaXMuZ2V0UmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uKCkpICsgZGV0YWlsO1xuICB9KTtcbiAgY29tbW9uLmRlZmluZUxhenlQcm9wZXJ0eSh0aGlzLCAnc2hvcnRNZXNzYWdlJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnN0YXRlLmlucHV0U3RyZWFtLnNvdXJjZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiAnbWF0Y2ggZmFpbGVkIGF0IHBvc2l0aW9uICcgKyB0aGlzLmdldFJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbigpO1xuICAgIH1cbiAgICB2YXIgZGV0YWlsID0gJ2V4cGVjdGVkICcgKyB0aGlzLmdldEV4cGVjdGVkVGV4dCgpO1xuICAgIHJldHVybiBnZXRTaG9ydE1hdGNoRXJyb3JNZXNzYWdlKFxuICAgICAgICB0aGlzLmdldFJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbigpLFxuICAgICAgICB0aGlzLnN0YXRlLmlucHV0U3RyZWFtLnNvdXJjZSxcbiAgICAgICAgZGV0YWlsKTtcbiAgfSk7XG59XG5pbmhlcml0cyhNYXRjaEZhaWx1cmUsIE1hdGNoUmVzdWx0KTtcblxuTWF0Y2hGYWlsdXJlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ1tNYXRjaEZhaWx1cmUgYXQgcG9zaXRpb24gJyArIHRoaXMuZ2V0UmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uKCkgKyAnXSc7XG59O1xuXG5NYXRjaEZhaWx1cmUucHJvdG90eXBlLmZhaWxlZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbk1hdGNoRmFpbHVyZS5wcm90b3R5cGUuZ2V0UmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnN0YXRlLmdldFJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbigpO1xufTtcblxuTWF0Y2hGYWlsdXJlLnByb3RvdHlwZS5nZXRSaWdodG1vc3RGYWlsdXJlcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fZmFpbHVyZXM7XG59O1xuXG4vLyBSZXR1cm4gYSBzdHJpbmcgc3VtbWFyaXppbmcgdGhlIGV4cGVjdGVkIGNvbnRlbnRzIG9mIHRoZSBpbnB1dCBzdHJlYW0gd2hlblxuLy8gdGhlIG1hdGNoIGZhaWx1cmUgb2NjdXJyZWQuXG5NYXRjaEZhaWx1cmUucHJvdG90eXBlLmdldEV4cGVjdGVkVGV4dCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2IgPSBuZXcgY29tbW9uLlN0cmluZ0J1ZmZlcigpO1xuICB2YXIgZmFpbHVyZXMgPSB0aGlzLmdldFJpZ2h0bW9zdEZhaWx1cmVzKCk7XG5cbiAgLy8gRmlsdGVyIG91dCB0aGUgZmx1ZmZ5IGZhaWx1cmVzIHRvIG1ha2UgdGhlIGRlZmF1bHQgZXJyb3IgbWVzc2FnZXMgbW9yZSB1c2VmdWxcbiAgZmFpbHVyZXMgPSBmYWlsdXJlcy5maWx0ZXIoZnVuY3Rpb24oZmFpbHVyZSkge1xuICAgIHJldHVybiAhZmFpbHVyZS5pc0ZsdWZmeSgpO1xuICB9KTtcblxuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBmYWlsdXJlcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgaWYgKGlkeCA+IDApIHtcbiAgICAgIGlmIChpZHggPT09IGZhaWx1cmVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgc2IuYXBwZW5kKChmYWlsdXJlcy5sZW5ndGggPiAyID8gJywgb3IgJyA6ICcgb3IgJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2IuYXBwZW5kKCcsICcpO1xuICAgICAgfVxuICAgIH1cbiAgICBzYi5hcHBlbmQoZmFpbHVyZXNbaWR4XS50b1N0cmluZygpKTtcbiAgfVxuICByZXR1cm4gc2IuY29udGVudHMoKTtcbn07XG5cbk1hdGNoRmFpbHVyZS5wcm90b3R5cGUuZ2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHBvcyA9IHRoaXMuc3RhdGUuZ2V0UmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uKCk7XG4gIHJldHVybiBuZXcgSW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnB1dFN0cmVhbSwgcG9zLCBwb3MpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gTWF0Y2hSZXN1bHQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgndXRpbC1leHRlbmQnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIE5hbWVzcGFjZSgpIHtcbn1cbk5hbWVzcGFjZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5OYW1lc3BhY2UuYXNOYW1lc3BhY2UgPSBmdW5jdGlvbihvYmpPck5hbWVzcGFjZSkge1xuICBpZiAob2JqT3JOYW1lc3BhY2UgaW5zdGFuY2VvZiBOYW1lc3BhY2UpIHtcbiAgICByZXR1cm4gb2JqT3JOYW1lc3BhY2U7XG4gIH1cbiAgcmV0dXJuIE5hbWVzcGFjZS5jcmVhdGVOYW1lc3BhY2Uob2JqT3JOYW1lc3BhY2UpO1xufTtcblxuLy8gQ3JlYXRlIGEgbmV3IG5hbWVzcGFjZS4gSWYgYG9wdFByb3BzYCBpcyBzcGVjaWZpZWQsIGFsbCBvZiBpdHMgcHJvcGVydGllc1xuLy8gd2lsbCBiZSBjb3BpZWQgdG8gdGhlIG5ldyBuYW1lc3BhY2UuXG5OYW1lc3BhY2UuY3JlYXRlTmFtZXNwYWNlID0gZnVuY3Rpb24ob3B0UHJvcHMpIHtcbiAgcmV0dXJuIE5hbWVzcGFjZS5leHRlbmQoTmFtZXNwYWNlLnByb3RvdHlwZSwgb3B0UHJvcHMpO1xufTtcblxuLy8gQ3JlYXRlIGEgbmV3IG5hbWVzcGFjZSB3aGljaCBleHRlbmRzIGFub3RoZXIgbmFtZXNwYWNlLiBJZiBgb3B0UHJvcHNgIGlzXG4vLyBzcGVjaWZpZWQsIGFsbCBvZiBpdHMgcHJvcGVydGllcyB3aWxsIGJlIGNvcGllZCB0byB0aGUgbmV3IG5hbWVzcGFjZS5cbk5hbWVzcGFjZS5leHRlbmQgPSBmdW5jdGlvbihuYW1lc3BhY2UsIG9wdFByb3BzKSB7XG4gIGlmIChuYW1lc3BhY2UgIT09IE5hbWVzcGFjZS5wcm90b3R5cGUgJiYgIShuYW1lc3BhY2UgaW5zdGFuY2VvZiBOYW1lc3BhY2UpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgTmFtZXNwYWNlIG9iamVjdDogJyArIG5hbWVzcGFjZSk7XG4gIH1cbiAgdmFyIG5zID0gT2JqZWN0LmNyZWF0ZShuYW1lc3BhY2UsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IE5hbWVzcGFjZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZXh0ZW5kKG5zLCBvcHRQcm9wcyk7XG59O1xuXG4vLyBUT0RPOiBTaG91bGQgdGhpcyBiZSBhIHJlZ3VsYXIgbWV0aG9kP1xuTmFtZXNwYWNlLnRvU3RyaW5nID0gZnVuY3Rpb24obnMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChucyk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBOYW1lc3BhY2U7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBQb3NJbmZvKHN0YXRlKSB7XG4gIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgdGhpcy5hcHBsaWNhdGlvbk1lbW9LZXlTdGFjayA9IFtdOyAgLy8gYSBzdGFjayBvZiBcIm1lbW8ga2V5c1wiIG9mIHRoZSBhY3RpdmUgYXBwbGljYXRpb25zXG4gIHRoaXMubWVtbyA9IHt9O1xuICB0aGlzLmN1cnJlbnRMZWZ0UmVjdXJzaW9uID0gdW5kZWZpbmVkO1xufVxuXG5Qb3NJbmZvLnByb3RvdHlwZSA9IHtcbiAgaXNBY3RpdmU6IGZ1bmN0aW9uKGFwcGxpY2F0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbGljYXRpb25NZW1vS2V5U3RhY2suaW5kZXhPZihhcHBsaWNhdGlvbi50b01lbW9LZXkoKSkgPj0gMDtcbiAgfSxcblxuICBlbnRlcjogZnVuY3Rpb24oYXBwbGljYXRpb24pIHtcbiAgICB0aGlzLnN0YXRlLmVudGVyKGFwcGxpY2F0aW9uKTtcbiAgICB0aGlzLmFwcGxpY2F0aW9uTWVtb0tleVN0YWNrLnB1c2goYXBwbGljYXRpb24udG9NZW1vS2V5KCkpO1xuICB9LFxuXG4gIGV4aXQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3RhdGUuZXhpdCgpO1xuICAgIHRoaXMuYXBwbGljYXRpb25NZW1vS2V5U3RhY2sucG9wKCk7XG4gIH0sXG5cbiAgc3RhcnRMZWZ0UmVjdXJzaW9uOiBmdW5jdGlvbihoZWFkQXBwbGljYXRpb24sIG1lbW9SZWMpIHtcbiAgICBtZW1vUmVjLmlzTGVmdFJlY3Vyc2lvbiA9IHRydWU7XG4gICAgbWVtb1JlYy5oZWFkQXBwbGljYXRpb24gPSBoZWFkQXBwbGljYXRpb247XG4gICAgbWVtb1JlYy5uZXh0TGVmdFJlY3Vyc2lvbiA9IHRoaXMuY3VycmVudExlZnRSZWN1cnNpb247XG4gICAgdGhpcy5jdXJyZW50TGVmdFJlY3Vyc2lvbiA9IG1lbW9SZWM7XG5cbiAgICB2YXIgYXBwbGljYXRpb25NZW1vS2V5U3RhY2sgPSB0aGlzLmFwcGxpY2F0aW9uTWVtb0tleVN0YWNrO1xuICAgIHZhciBpbmRleE9mRmlyc3RJbnZvbHZlZFJ1bGUgPSBhcHBsaWNhdGlvbk1lbW9LZXlTdGFjay5pbmRleE9mKGhlYWRBcHBsaWNhdGlvbi50b01lbW9LZXkoKSkgKyAxO1xuICAgIHZhciBpbnZvbHZlZEFwcGxpY2F0aW9uTWVtb0tleXMgPSBhcHBsaWNhdGlvbk1lbW9LZXlTdGFjay5zbGljZShpbmRleE9mRmlyc3RJbnZvbHZlZFJ1bGUpO1xuXG4gICAgbWVtb1JlYy5pc0ludm9sdmVkID0gZnVuY3Rpb24oYXBwbGljYXRpb25NZW1vS2V5KSB7XG4gICAgICByZXR1cm4gaW52b2x2ZWRBcHBsaWNhdGlvbk1lbW9LZXlzLmluZGV4T2YoYXBwbGljYXRpb25NZW1vS2V5KSA+PSAwO1xuICAgIH07XG5cbiAgICBtZW1vUmVjLnVwZGF0ZUludm9sdmVkQXBwbGljYXRpb25NZW1vS2V5cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaWR4ID0gaW5kZXhPZkZpcnN0SW52b2x2ZWRSdWxlOyBpZHggPCBhcHBsaWNhdGlvbk1lbW9LZXlTdGFjay5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgIHZhciBhcHBsaWNhdGlvbk1lbW9LZXkgPSBhcHBsaWNhdGlvbk1lbW9LZXlTdGFja1tpZHhdO1xuICAgICAgICBpZiAoIXRoaXMuaXNJbnZvbHZlZChhcHBsaWNhdGlvbk1lbW9LZXkpKSB7XG4gICAgICAgICAgaW52b2x2ZWRBcHBsaWNhdGlvbk1lbW9LZXlzLnB1c2goYXBwbGljYXRpb25NZW1vS2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgZW5kTGVmdFJlY3Vyc2lvbjogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jdXJyZW50TGVmdFJlY3Vyc2lvbiA9IHRoaXMuY3VycmVudExlZnRSZWN1cnNpb24ubmV4dExlZnRSZWN1cnNpb247XG4gIH0sXG5cbiAgLy8gTm90ZTogdGhpcyBtZXRob2QgZG9lc24ndCBnZXQgY2FsbGVkIGZvciB0aGUgXCJoZWFkXCIgb2YgYSBsZWZ0IHJlY3Vyc2lvbiAtLSBmb3IgTFIgaGVhZHMsXG4gIC8vIHRoZSBtZW1vaXplZCByZXN1bHQgKHdoaWNoIHN0YXJ0cyBvdXQgYmVpbmcgYSBmYWlsdXJlKSBpcyBhbHdheXMgdXNlZC5cbiAgc2hvdWxkVXNlTWVtb2l6ZWRSZXN1bHQ6IGZ1bmN0aW9uKG1lbW9SZWMpIHtcbiAgICBpZiAoIW1lbW9SZWMuaXNMZWZ0UmVjdXJzaW9uKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIGFwcGxpY2F0aW9uTWVtb0tleVN0YWNrID0gdGhpcy5hcHBsaWNhdGlvbk1lbW9LZXlTdGFjaztcbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBhcHBsaWNhdGlvbk1lbW9LZXlTdGFjay5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICB2YXIgYXBwbGljYXRpb25NZW1vS2V5ID0gYXBwbGljYXRpb25NZW1vS2V5U3RhY2tbaWR4XTtcbiAgICAgIGlmIChtZW1vUmVjLmlzSW52b2x2ZWQoYXBwbGljYXRpb25NZW1vS2V5KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBQb3NJbmZvO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIFN5bWJvbCA9IHJlcXVpcmUoJ2VzNi1zeW1ib2wnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbnZhciBpbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbnZhciBNYXRjaFJlc3VsdCA9IHJlcXVpcmUoJy4vTWF0Y2hSZXN1bHQnKTtcbnZhciBJdGVyYXRpb25Ob2RlID0gcmVxdWlyZSgnLi9ub2RlcycpLkl0ZXJhdGlvbk5vZGU7XG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIFdyYXBwZXJzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFdyYXBwZXJzIGRlY29yYXRlIENTVCBub2RlcyB3aXRoIGFsbCBvZiB0aGUgZnVuY3Rpb25hbGl0eSAoaS5lLiwgb3BlcmF0aW9ucyBhbmQgYXR0cmlidXRlcylcbi8vIHByb3ZpZGVkIGJ5IGEgU2VtYW50aWNzIChzZWUgYmVsb3cpLiBgV3JhcHBlcmAgaXMgdGhlIGFic3RyYWN0IHN1cGVyY2xhc3Mgb2YgYWxsIHdyYXBwZXJzLiBBXG4vLyBgV3JhcHBlcmAgbXVzdCBoYXZlIGBfbm9kZWAgYW5kIGBfc2VtYW50aWNzYCBpbnN0YW5jZSB2YXJpYWJsZXMsIHdoaWNoIHJlZmVyIHRvIHRoZSBDU1Qgbm9kZSBhbmRcbi8vIFNlbWFudGljcyAocmVzcC4pIGZvciB3aGljaCBpdCB3YXMgY3JlYXRlZCwgYW5kIGEgYF9jaGlsZFdyYXBwZXJzYCBpbnN0YW5jZSB2YXJpYWJsZSB3aGljaCBpc1xuLy8gdXNlZCB0byBjYWNoZSB0aGUgd3JhcHBlciBpbnN0YW5jZXMgdGhhdCBhcmUgY3JlYXRlZCBmb3IgaXRzIGNoaWxkIG5vZGVzLiBTZXR0aW5nIHRoZXNlIGluc3RhbmNlXG4vLyB2YXJpYWJsZXMgaXMgdGhlIHJlc3BvbnNpYmlsaXR5IG9mIHRoZSBjb25zdHJ1Y3RvciBvZiBlYWNoIFNlbWFudGljcy1zcGVjaWZpYyBzdWJjbGFzcyBvZlxuLy8gYFdyYXBwZXJgLlxuZnVuY3Rpb24gV3JhcHBlcigpIHt9XG5cbldyYXBwZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnW3NlbWFudGljcyB3cmFwcGVyIGZvciAnICsgdGhpcy5fbm9kZS5ncmFtbWFyLm5hbWUgKyAnXSc7XG59O1xuXG5XcmFwcGVyLnByb3RvdHlwZS5fZm9yZ2V0TWVtb2l6ZWRSZXN1bHRGb3IgPSBmdW5jdGlvbihhdHRyaWJ1dGVOYW1lKSB7XG4gIC8vIFJlbW92ZSB0aGUgbWVtb2l6ZWQgYXR0cmlidXRlIGZyb20gdGhlIGNzdE5vZGUgYW5kIGFsbCBpdHMgY2hpbGRyZW4uXG4gIGRlbGV0ZSB0aGlzLl9ub2RlW3RoaXMuX3NlbWFudGljcy5hdHRyaWJ1dGVLZXlzW2F0dHJpYnV0ZU5hbWVdXTtcbiAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgY2hpbGQuX2ZvcmdldE1lbW9pemVkUmVzdWx0Rm9yKGF0dHJpYnV0ZU5hbWUpO1xuICB9KTtcbn07XG5cbi8vIFJldHVybnMgdGhlIHdyYXBwZXIgb2YgdGhlIHNwZWNpZmllZCBjaGlsZCBub2RlLiBDaGlsZCB3cmFwcGVycyBhcmUgY3JlYXRlZCBsYXppbHkgYW5kIGNhY2hlZCBpblxuLy8gdGhlIHBhcmVudCB3cmFwcGVyJ3MgYF9jaGlsZFdyYXBwZXJzYCBpbnN0YW5jZSB2YXJpYWJsZS5cbldyYXBwZXIucHJvdG90eXBlLmNoaWxkID0gZnVuY3Rpb24oaWR4KSB7XG4gIGlmICghKDAgPD0gaWR4ICYmIGlkeCA8IHRoaXMuX25vZGUubnVtQ2hpbGRyZW4oKSkpIHtcbiAgICAvLyBUT0RPOiBDb25zaWRlciB0aHJvd2luZyBhbiBleGNlcHRpb24gaGVyZS5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHZhciBjaGlsZFdyYXBwZXIgPSB0aGlzLl9jaGlsZFdyYXBwZXJzW2lkeF07XG4gIGlmICghY2hpbGRXcmFwcGVyKSB7XG4gICAgY2hpbGRXcmFwcGVyID0gdGhpcy5fY2hpbGRXcmFwcGVyc1tpZHhdID0gdGhpcy5fc2VtYW50aWNzLndyYXAodGhpcy5fbm9kZS5jaGlsZEF0KGlkeCkpO1xuICB9XG4gIHJldHVybiBjaGlsZFdyYXBwZXI7XG59O1xuXG4vLyBSZXR1cm5zIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHdyYXBwZXJzIG9mIGFsbCBvZiB0aGUgY2hpbGRyZW4gb2YgdGhlIG5vZGUgYXNzb2NpYXRlZCB3aXRoIHRoaXNcbi8vIHdyYXBwZXIuXG5XcmFwcGVyLnByb3RvdHlwZS5fY2hpbGRyZW4gPSBmdW5jdGlvbigpIHtcbiAgLy8gRm9yY2UgdGhlIGNyZWF0aW9uIG9mIGFsbCBjaGlsZCB3cmFwcGVyc1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLl9ub2RlLm51bUNoaWxkcmVuKCk7IGlkeCsrKSB7XG4gICAgdGhpcy5jaGlsZChpZHgpO1xuICB9XG4gIHJldHVybiB0aGlzLl9jaGlsZFdyYXBwZXJzO1xufTtcblxuLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIENTVCBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHdyYXBwZXIgY29ycmVzcG9uZHMgdG8gYW4gaXRlcmF0aW9uXG4vLyBleHByZXNzaW9uLCBpLmUuLCBhIEtsZWVuZS0qLCBLbGVlbmUtKywgb3IgYW4gb3B0aW9uYWwuIFJldHVybnMgYGZhbHNlYCBvdGhlcndpc2UuXG5XcmFwcGVyLnByb3RvdHlwZS5pc0l0ZXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fbm9kZS5pc0l0ZXJhdGlvbigpO1xufTtcblxuLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIENTVCBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHdyYXBwZXIgaXMgYSB0ZXJtaW5hbCBub2RlLCBgZmFsc2VgXG4vLyBvdGhlcndpc2UuXG5XcmFwcGVyLnByb3RvdHlwZS5pc1Rlcm1pbmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9ub2RlLmlzVGVybWluYWwoKTtcbn07XG5cbi8vIFJldHVybnMgYHRydWVgIGlmIHRoZSBDU1Qgbm9kZSBhc3NvY2lhdGVkIHdpdGggdGhpcyB3cmFwcGVyIGlzIGEgbm9udGVybWluYWwgbm9kZSwgYGZhbHNlYFxuLy8gb3RoZXJ3aXNlLlxuV3JhcHBlci5wcm90b3R5cGUuaXNOb250ZXJtaW5hbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fbm9kZS5pc05vbnRlcm1pbmFsKCk7XG59O1xuXG4vLyBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgQ1NUIG5vZGUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgd3JhcHBlciBpcyBhIG5vbnRlcm1pbmFsIG5vZGVcbi8vIGNvcnJlc3BvbmRpbmcgdG8gYSBzeW50YWN0aWMgcnVsZSwgYGZhbHNlYCBvdGhlcndpc2UuXG5XcmFwcGVyLnByb3RvdHlwZS5pc1N5bnRhY3RpYyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5pc05vbnRlcm1pbmFsKCkgJiYgdGhpcy5fbm9kZS5pc1N5bnRhY3RpYygpO1xufTtcblxuLy8gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIENTVCBub2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHdyYXBwZXIgaXMgYSBub250ZXJtaW5hbCBub2RlXG4vLyBjb3JyZXNwb25kaW5nIHRvIGEgbGV4aWNhbCBydWxlLCBgZmFsc2VgIG90aGVyd2lzZS5cbldyYXBwZXIucHJvdG90eXBlLmlzTGV4aWNhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5pc05vbnRlcm1pbmFsKCkgJiYgdGhpcy5fbm9kZS5pc0xleGljYWwoKTtcbn07XG5cbi8vIFJldHVybnMgYHRydWVgIGlmIHRoZSBDU1Qgbm9kZSBhc3NvY2lhdGVkIHdpdGggdGhpcyB3cmFwcGVyIGlzIGFuIGl0ZXJhdG9yIG5vZGVcbi8vIGhhdmluZyBlaXRoZXIgb25lIG9yIG5vIGNoaWxkICg/IG9wZXJhdG9yKSwgYGZhbHNlYCBvdGhlcndpc2UuXG4vLyBPdGhlcndpc2UsIHRocm93cyBhbiBleGNlcHRpb24uXG5XcmFwcGVyLnByb3RvdHlwZS5pc09wdGlvbmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9ub2RlLmlzT3B0aW9uYWwoKTtcbn07XG5cbi8vIENyZWF0ZSBhIG5ldyBJdGVyYXRpb25Ob2RlIGluIHRoZSBzYW1lIHNlbWFudGljcyBhcyB0aGlzIHdyYXBwZXIuXG5XcmFwcGVyLnByb3RvdHlwZS5pdGVyYXRpb24gPSBmdW5jdGlvbihvcHRFbGVtZW50cykge1xuICB2YXIgaXRlciA9IG5ldyBJdGVyYXRpb25Ob2RlKHRoaXMuX25vZGUuZ3JhbW1hciwgb3B0RWxlbWVudHMgfHwgW10sIHRoaXMuc291cmNlLCBmYWxzZSk7XG4gIHJldHVybiB0aGlzLl9zZW1hbnRpY3Mud3JhcChpdGVyKTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKFdyYXBwZXIucHJvdG90eXBlLCB7XG4gIC8vIFJldHVybnMgYW4gYXJyYXkgY29udGFpbmluZyB0aGUgY2hpbGRyZW4gb2YgdGhpcyBDU1Qgbm9kZS5cbiAgY2hpbGRyZW46IHtnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fY2hpbGRyZW4oKTsgfX0sXG5cbiAgLy8gUmV0dXJucyB0aGUgbmFtZSBvZiBncmFtbWFyIHJ1bGUgdGhhdCBjcmVhdGVkIHRoaXMgQ1NUIG5vZGUuXG4gIGN0b3JOYW1lOiB7Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX25vZGUuY3Rvck5hbWU7IH19LFxuXG4gIC8vIFRPRE86IFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkgKGRlcHJlY2F0ZWQgaW4gdjAuMTIpLlxuICBpbnRlcnZhbDoge2dldDogZnVuY3Rpb24oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgYGludGVydmFsYCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkIC0tIHVzZSBgc291cmNlYCBpbnN0ZWFkJyk7XG4gIH19LFxuXG4gIC8vIFJldHVybnMgdGhlIGludGVydmFsIGNvbnN1bWVkIGJ5IHRoZSBDU1Qgbm9kZSBhc3NvY2lhdGVkIHdpdGggdGhpcyB3cmFwcGVyLlxuICBzb3VyY2U6IHtnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5fbm9kZS5zb3VyY2U7IH19LFxuXG4gIC8vIFJldHVybnMgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBvZiB0aGlzIENTVCBub2RlLlxuICBudW1DaGlsZHJlbjoge2dldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLl9ub2RlLm51bUNoaWxkcmVuKCk7IH19LFxuXG4gIC8vIFJldHVybnMgdGhlIHByaW1pdGl2ZSB2YWx1ZSBvZiB0aGlzIENTVCBub2RlLCBpZiBpdCdzIGEgdGVybWluYWwgbm9kZS4gT3RoZXJ3aXNlLFxuICAvLyB0aHJvd3MgYW4gZXhjZXB0aW9uLlxuICBwcmltaXRpdmVWYWx1ZToge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc1Rlcm1pbmFsKCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vZGUucHJpbWl0aXZlVmFsdWU7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwidHJpZWQgdG8gYWNjZXNzIHRoZSAncHJpbWl0aXZlVmFsdWUnIGF0dHJpYnV0ZSBvZiBhIG5vbi10ZXJtaW5hbCBDU1Qgbm9kZVwiKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gUmV0dXJucyB0aGUgY29udGVudHMgb2YgdGhlIGlucHV0IHN0cmVhbSBjb25zdW1lZCBieSB0aGlzIENTVCBub2RlLlxuICBzb3VyY2VTdHJpbmc6IHtnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5zb3VyY2UuY29udGVudHM7IH19XG59KTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gU2VtYW50aWNzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIEEgU2VtYW50aWNzIGlzIGEgY29udGFpbmVyIGZvciBhIGZhbWlseSBvZiBPcGVyYXRpb25zIGFuZCBBdHRyaWJ1dGVzIGZvciBhIGdpdmVuIGdyYW1tYXIuXG4vLyBTZW1hbnRpY3MgZW5hYmxlIG1vZHVsYXJpdHkgKGRpZmZlcmVudCBjbGllbnRzIG9mIGEgZ3JhbW1hciBjYW4gY3JlYXRlIHRoZWlyIHNldCBvZiBvcGVyYXRpb25zXG4vLyBhbmQgYXR0cmlidXRlcyBpbiBpc29sYXRpb24pIGFuZCBleHRlbnNpYmlsaXR5IGV2ZW4gd2hlbiBvcGVyYXRpb25zIGFuZCBhdHRyaWJ1dGVzIGFyZSBtdXR1YWxseS1cbi8vIHJlY3Vyc2l2ZS4gVGhpcyBjb25zdHJ1Y3RvciBzaG91bGQgbm90IGJlIGNhbGxlZCBkaXJlY3RseSBleGNlcHQgZnJvbVxuLy8gYFNlbWFudGljcy5jcmVhdGVTZW1hbnRpY3NgLiBUaGUgbm9ybWFsIHdheXMgdG8gY3JlYXRlIGEgU2VtYW50aWNzLCBnaXZlbiBhIGdyYW1tYXIgJ2cnLCBhcmVcbi8vIGBnLmNyZWF0ZVNlbWFudGljcygpYCBhbmQgYGcuZXh0ZW5kU2VtYW50aWNzKHBhcmVudFNlbWFudGljcylgLlxuZnVuY3Rpb24gU2VtYW50aWNzKGdyYW1tYXIsIHN1cGVyU2VtYW50aWNzKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5ncmFtbWFyID0gZ3JhbW1hcjtcbiAgdGhpcy5jaGVja2VkQWN0aW9uRGljdHMgPSBmYWxzZTtcblxuICAvLyBDb25zdHJ1Y3RvciBmb3Igd3JhcHBlciBpbnN0YW5jZXMsIHdoaWNoIGFyZSBwYXNzZWQgYXMgdGhlIGFyZ3VtZW50cyB0byB0aGUgc2VtYW50aWMgYWN0aW9uc1xuICAvLyBvZiBhbiBvcGVyYXRpb24gb3IgYXR0cmlidXRlLiBPcGVyYXRpb25zIGFuZCBhdHRyaWJ1dGVzIHJlcXVpcmUgZG91YmxlIGRpc3BhdGNoOiB0aGUgc2VtYW50aWNcbiAgLy8gYWN0aW9uIGlzIGNob3NlbiBiYXNlZCBvbiBib3RoIHRoZSBub2RlJ3MgdHlwZSBhbmQgdGhlIHNlbWFudGljcy4gV3JhcHBlcnMgZW5zdXJlIHRoYXRcbiAgLy8gdGhlIGBleGVjdXRlYCBtZXRob2QgaXMgY2FsbGVkIHdpdGggdGhlIGNvcnJlY3QgKG1vc3Qgc3BlY2lmaWMpIHNlbWFudGljcyBvYmplY3QgYXMgYW5cbiAgLy8gYXJndW1lbnQuXG4gIHRoaXMuV3JhcHBlciA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBzZWxmLmNoZWNrQWN0aW9uRGljdHNJZkhhdmVudEFscmVhZHkoKTtcbiAgICB0aGlzLl9zZW1hbnRpY3MgPSBzZWxmO1xuICAgIHRoaXMuX25vZGUgPSBub2RlO1xuICAgIHRoaXMuX2NoaWxkV3JhcHBlcnMgPSBbXTtcbiAgfTtcblxuICB0aGlzLnN1cGVyID0gc3VwZXJTZW1hbnRpY3M7XG4gIGlmIChzdXBlclNlbWFudGljcykge1xuICAgIGlmIChncmFtbWFyICE9PSB0aGlzLnN1cGVyLmdyYW1tYXIgJiYgIWdyYW1tYXIuX2luaGVyaXRzRnJvbSh0aGlzLnN1cGVyLmdyYW1tYXIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgXCJDYW5ub3QgZXh0ZW5kIGEgc2VtYW50aWNzIGZvciBncmFtbWFyICdcIiArIHRoaXMuc3VwZXIuZ3JhbW1hci5uYW1lICtcbiAgICAgICAgICBcIicgZm9yIHVzZSB3aXRoIGdyYW1tYXIgJ1wiICsgZ3JhbW1hci5uYW1lICsgXCInIChub3QgYSBzdWItZ3JhbW1hcilcIik7XG4gICAgfVxuICAgIGluaGVyaXRzKHRoaXMuV3JhcHBlciwgdGhpcy5zdXBlci5XcmFwcGVyKTtcbiAgICB0aGlzLm9wZXJhdGlvbnMgPSBPYmplY3QuY3JlYXRlKHRoaXMuc3VwZXIub3BlcmF0aW9ucyk7XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0gT2JqZWN0LmNyZWF0ZSh0aGlzLnN1cGVyLmF0dHJpYnV0ZXMpO1xuICAgIHRoaXMuYXR0cmlidXRlS2V5cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICAvLyBBc3NpZ24gdW5pcXVlIHN5bWJvbHMgZm9yIGVhY2ggb2YgdGhlIGF0dHJpYnV0ZXMgaW5oZXJpdGVkIGZyb20gdGhlIHN1cGVyLXNlbWFudGljcyBzbyB0aGF0XG4gICAgLy8gdGhleSBhcmUgbWVtb2l6ZWQgaW5kZXBlbmRlbnRseS5cbiAgICBmb3IgKHZhciBhdHRyaWJ1dGVOYW1lIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgdGhpcy5hdHRyaWJ1dGVLZXlzW2F0dHJpYnV0ZU5hbWVdID0gU3ltYm9sKCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGluaGVyaXRzKHRoaXMuV3JhcHBlciwgV3JhcHBlcik7XG4gICAgdGhpcy5vcGVyYXRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLmF0dHJpYnV0ZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuYXR0cmlidXRlS2V5cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cbn1cblxuU2VtYW50aWNzLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ1tzZW1hbnRpY3MgZm9yICcgKyB0aGlzLmdyYW1tYXIubmFtZSArICddJztcbn07XG5cblNlbWFudGljcy5wcm90b3R5cGUuY2hlY2tBY3Rpb25EaWN0c0lmSGF2ZW50QWxyZWFkeSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMuY2hlY2tlZEFjdGlvbkRpY3RzKSB7XG4gICAgdGhpcy5jaGVja0FjdGlvbkRpY3RzKCk7XG4gICAgdGhpcy5jaGVja2VkQWN0aW9uRGljdHMgPSB0cnVlO1xuICB9XG59O1xuXG4vLyBDaGVja3MgdGhhdCB0aGUgYWN0aW9uIGRpY3Rpb25hcmllcyBmb3IgYWxsIG9wZXJhdGlvbnMgYW5kIGF0dHJpYnV0ZXMgaW4gdGhpcyBzZW1hbnRpY3MsXG4vLyBpbmNsdWRpbmcgdGhlIG9uZXMgdGhhdCB3ZXJlIGluaGVyaXRlZCBmcm9tIHRoZSBzdXBlci1zZW1hbnRpY3MsIGFncmVlIHdpdGggdGhlIGdyYW1tYXIuXG4vLyBUaHJvd3MgYW4gZXhjZXB0aW9uIGlmIG9uZSBvciBtb3JlIG9mIHRoZW0gZG9lc24ndC5cblNlbWFudGljcy5wcm90b3R5cGUuY2hlY2tBY3Rpb25EaWN0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbmFtZTtcbiAgZm9yIChuYW1lIGluIHRoaXMub3BlcmF0aW9ucykge1xuICAgIHRoaXMub3BlcmF0aW9uc1tuYW1lXS5jaGVja0FjdGlvbkRpY3QodGhpcy5ncmFtbWFyKTtcbiAgfVxuICBmb3IgKG5hbWUgaW4gdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgdGhpcy5hdHRyaWJ1dGVzW25hbWVdLmNoZWNrQWN0aW9uRGljdCh0aGlzLmdyYW1tYXIpO1xuICB9XG59O1xuXG5TZW1hbnRpY3MucHJvdG90eXBlLnRvUmVjaXBlID0gZnVuY3Rpb24oc2VtYW50aWNzT25seSkge1xuICBmdW5jdGlvbiBoYXNTdXBlclNlbWFudGljcyhzKSB7XG4gICAgcmV0dXJuIHMuc3VwZXIgIT09IFNlbWFudGljcy5CdWlsdEluU2VtYW50aWNzLl9nZXRTZW1hbnRpY3MoKTtcbiAgfVxuXG4gIHZhciBzdHIgPSAnKGZ1bmN0aW9uKGcpIHtcXG4nO1xuICBpZiAoaGFzU3VwZXJTZW1hbnRpY3ModGhpcykpIHtcbiAgICBzdHIgKz0gJyAgdmFyIHNlbWFudGljcyA9ICcgKyB0aGlzLnN1cGVyLnRvUmVjaXBlKHRydWUpICsgJyhnJztcblxuICAgIHZhciBzdXBlclNlbWFudGljc0dyYW1tYXIgPSB0aGlzLnN1cGVyLmdyYW1tYXI7XG4gICAgdmFyIHJlbGF0ZWRHcmFtbWFyID0gdGhpcy5ncmFtbWFyO1xuICAgIHdoaWxlIChyZWxhdGVkR3JhbW1hciAhPT0gc3VwZXJTZW1hbnRpY3NHcmFtbWFyKSB7XG4gICAgICBzdHIgKz0gJy5zdXBlckdyYW1tYXInO1xuICAgICAgcmVsYXRlZEdyYW1tYXIgPSByZWxhdGVkR3JhbW1hci5zdXBlckdyYW1tYXI7XG4gICAgfVxuXG4gICAgc3RyICs9ICcpO1xcbic7XG4gICAgc3RyICs9ICcgIHJldHVybiBnLmV4dGVuZFNlbWFudGljcyhzZW1hbnRpY3MpJztcbiAgfSBlbHNlIHtcbiAgICBzdHIgKz0gJyAgcmV0dXJuIGcuY3JlYXRlU2VtYW50aWNzKCknO1xuICB9XG4gIFsnT3BlcmF0aW9uJywgJ0F0dHJpYnV0ZSddLmZvckVhY2goZnVuY3Rpb24odHlwZSkge1xuICAgIHZhciBzZW1hbnRpY09wZXJhdGlvbnMgPSB0aGlzW3R5cGUudG9Mb3dlckNhc2UoKSArICdzJ107XG4gICAgT2JqZWN0LmtleXMoc2VtYW50aWNPcGVyYXRpb25zKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBzaWduYXR1cmUgPSBuYW1lO1xuICAgICAgaWYgKHNlbWFudGljT3BlcmF0aW9uc1tuYW1lXS5mb3JtYWxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2lnbmF0dXJlICs9ICcoJyArIHNlbWFudGljT3BlcmF0aW9uc1tuYW1lXS5mb3JtYWxzLmpvaW4oJywgJykgKyAnKSc7XG4gICAgICB9XG5cbiAgICAgIHZhciBtZXRob2Q7XG4gICAgICBpZiAoaGFzU3VwZXJTZW1hbnRpY3ModGhpcykgJiYgdGhpcy5zdXBlclt0eXBlLnRvTG93ZXJDYXNlKCkgKyAncyddW25hbWVdKSB7XG4gICAgICAgIG1ldGhvZCA9ICdleHRlbmQnICsgdHlwZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1ldGhvZCA9ICdhZGQnICsgdHlwZTtcbiAgICAgIH1cbiAgICAgIHN0ciArPSAnXFxuICAgIC4nICsgbWV0aG9kICsgJygnICsgSlNPTi5zdHJpbmdpZnkoc2lnbmF0dXJlKSArICcsIHsnO1xuXG4gICAgICB2YXIgYWN0aW9ucyA9IHNlbWFudGljT3BlcmF0aW9uc1tuYW1lXS5hY3Rpb25EaWN0O1xuICAgICAgdmFyIHNyY0FycmF5ID0gW107XG4gICAgICBPYmplY3Qua2V5cyhhY3Rpb25zKS5mb3JFYWNoKGZ1bmN0aW9uKGFjdGlvbk5hbWUpIHtcbiAgICAgICAgaWYgKHNlbWFudGljT3BlcmF0aW9uc1tuYW1lXS5idWlsdEluRGVmYXVsdCAhPT0gYWN0aW9uc1thY3Rpb25OYW1lXSkge1xuICAgICAgICAgIHNyY0FycmF5LnB1c2goJ1xcbiAgICAgICcgKyBKU09OLnN0cmluZ2lmeShhY3Rpb25OYW1lKSArICc6ICcgK1xuICAgICAgICAgICAgYWN0aW9uc1thY3Rpb25OYW1lXS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzdHIgKz0gc3JjQXJyYXkuam9pbignLCcpO1xuXG4gICAgICBzdHIgKz0gJ1xcbiAgICB9KSc7XG4gICAgfSwgdGhpcyk7XG4gIH0sIHRoaXMpO1xuICBzdHIgKz0gJztcXG4gIH0pJztcblxuICBpZiAoIXNlbWFudGljc09ubHkpIHtcbiAgICBzdHIgPVxuICAgICAgJyhmdW5jdGlvbigpIHtcXG4nICtcbiAgICAgICcgIHZhciBncmFtbWFyID0gdGhpcy5mcm9tUmVjaXBlKCcgKyB0aGlzLmdyYW1tYXIudG9SZWNpcGUoKSArICcpO1xcbicgK1xuICAgICAgJyAgdmFyIHNlbWFudGljcyA9ICcgKyBzdHIgKyAnKGdyYW1tYXIpO1xcbicgK1xuICAgICAgJyAgcmV0dXJuIHNlbWFudGljcztcXG4nICtcbiAgICAgICd9KTtcXG4nO1xuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn07XG5cbnZhciBwcm90b3R5cGVHcmFtbWFyO1xudmFyIHByb3RvdHlwZUdyYW1tYXJTZW1hbnRpY3M7XG5cbi8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBmcm9tIG1haW4uanMgb25jZSBPaG0gaGFzIGxvYWRlZC5cblNlbWFudGljcy5pbml0UHJvdG90eXBlUGFyc2VyID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICBwcm90b3R5cGVHcmFtbWFyU2VtYW50aWNzID0gZ3JhbW1hci5jcmVhdGVTZW1hbnRpY3MoKS5hZGRPcGVyYXRpb24oJ3BhcnNlJywge1xuICAgIEF0dHJpYnV0ZVNpZ25hdHVyZTogZnVuY3Rpb24obmFtZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbmFtZS5wYXJzZSgpLFxuICAgICAgICBmb3JtYWxzOiBbXVxuICAgICAgfTtcbiAgICB9LFxuICAgIE9wZXJhdGlvblNpZ25hdHVyZTogZnVuY3Rpb24obmFtZSwgb3B0Rm9ybWFscykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbmFtZS5wYXJzZSgpLFxuICAgICAgICBmb3JtYWxzOiBvcHRGb3JtYWxzLnBhcnNlKClbMF0gfHwgW11cbiAgICAgIH07XG4gICAgfSxcbiAgICBGb3JtYWxzOiBmdW5jdGlvbihvcGFyZW4sIGZzLCBjcGFyZW4pIHtcbiAgICAgIHJldHVybiBmcy5hc0l0ZXJhdGlvbigpLnBhcnNlKCk7XG4gICAgfSxcbiAgICBuYW1lOiBmdW5jdGlvbihmaXJzdCwgcmVzdCkge1xuICAgICAgcmV0dXJuIHRoaXMuc291cmNlU3RyaW5nO1xuICAgIH1cbiAgfSk7XG4gIHByb3RvdHlwZUdyYW1tYXIgPSBncmFtbWFyO1xufTtcblxuZnVuY3Rpb24gcGFyc2VTaWduYXR1cmUoc2lnbmF0dXJlLCB0eXBlKSB7XG4gIGlmICghcHJvdG90eXBlR3JhbW1hcikge1xuICAgIC8vIFRoZSBPcGVyYXRpb25zIGFuZCBBdHRyaWJ1dGVzIGdyYW1tYXIgd29uJ3QgYmUgYXZhaWxhYmxlIHdoaWxlIE9obSBpcyBsb2FkaW5nLFxuICAgIC8vIGJ1dCB3ZSBjYW4gZ2V0IGF3YXkgdGhlIGZvbGxvd2luZyBzaW1wbGlmaWNhdGlvbiBiL2Mgbm9uZSBvZiB0aGUgb3BlcmF0aW9uc1xuICAgIC8vIHRoYXQgYXJlIHVzZWQgd2hpbGUgbG9hZGluZyB0YWtlIGFyZ3VtZW50cy5cbiAgICBjb21tb24uYXNzZXJ0KHNpZ25hdHVyZS5pbmRleE9mKCcoJykgPT09IC0xKTtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogc2lnbmF0dXJlLFxuICAgICAgZm9ybWFsczogW11cbiAgICB9O1xuICB9XG5cbiAgdmFyIHIgPSBwcm90b3R5cGVHcmFtbWFyLm1hdGNoKFxuICAgICAgc2lnbmF0dXJlLFxuICAgICAgdHlwZSA9PT0gJ29wZXJhdGlvbicgPyAnT3BlcmF0aW9uU2lnbmF0dXJlJyA6ICdBdHRyaWJ1dGVTaWduYXR1cmUnKTtcbiAgaWYgKHIuZmFpbGVkKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3Ioci5tZXNzYWdlKTtcbiAgfVxuXG4gIHJldHVybiBwcm90b3R5cGVHcmFtbWFyU2VtYW50aWNzKHIpLnBhcnNlKCk7XG59XG5cbmZ1bmN0aW9uIG5ld0RlZmF1bHRBY3Rpb24odHlwZSwgbmFtZSwgZG9JdCkge1xuICByZXR1cm4gZnVuY3Rpb24oY2hpbGRyZW4pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHRoaXNUaGluZyA9IHRoaXMuX3NlbWFudGljcy5vcGVyYXRpb25zW25hbWVdIHx8IHRoaXMuX3NlbWFudGljcy5hdHRyaWJ1dGVzW25hbWVdO1xuICAgIHZhciBhcmdzID0gdGhpc1RoaW5nLmZvcm1hbHMubWFwKGZ1bmN0aW9uKGZvcm1hbCkge1xuICAgICAgcmV0dXJuIHNlbGYuYXJnc1tmb3JtYWxdO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuaXNJdGVyYXRpb24oKSkge1xuICAgICAgLy8gVGhpcyBDU1Qgbm9kZSBjb3JyZXNwb25kcyB0byBhbiBpdGVyYXRpb24gZXhwcmVzc2lvbiBpbiB0aGUgZ3JhbW1hciAoKiwgKywgb3IgPykuIFRoZVxuICAgICAgLy8gZGVmYXVsdCBiZWhhdmlvciBpcyB0byBtYXAgdGhpcyBvcGVyYXRpb24gb3IgYXR0cmlidXRlIG92ZXIgYWxsIG9mIGl0cyBjaGlsZCBub2Rlcy5cbiAgICAgIHJldHVybiBjaGlsZHJlbi5tYXAoZnVuY3Rpb24oY2hpbGQpIHsgcmV0dXJuIGRvSXQuYXBwbHkoY2hpbGQsIGFyZ3MpOyB9KTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIENTVCBub2RlIGNvcnJlc3BvbmRzIHRvIGEgbm9uLXRlcm1pbmFsIGluIHRoZSBncmFtbWFyIChlLmcuLCBBZGRFeHByKS4gVGhlIGZhY3QgdGhhdFxuICAgIC8vIHdlIGdvdCBoZXJlIG1lYW5zIHRoYXQgdGhpcyBhY3Rpb24gZGljdGlvbmFyeSBkb2Vzbid0IGhhdmUgYW4gYWN0aW9uIGZvciB0aGlzIHBhcnRpY3VsYXJcbiAgICAvLyBub24tdGVybWluYWwgb3IgYSBnZW5lcmljIGBfbm9udGVybWluYWxgIGFjdGlvbi5cbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyBBcyBhIGNvbnZlbmllbmNlLCBpZiB0aGlzIG5vZGUgb25seSBoYXMgb25lIGNoaWxkLCB3ZSBqdXN0IHJldHVybiB0aGUgcmVzdWx0IG9mXG4gICAgICAvLyBhcHBseWluZyB0aGlzIG9wZXJhdGlvbiAvIGF0dHJpYnV0ZSB0byB0aGUgY2hpbGQgbm9kZS5cbiAgICAgIHJldHVybiBkb0l0LmFwcGx5KGNoaWxkcmVuWzBdLCBhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSB0aHJvdyBhbiBleGNlcHRpb24gdG8gbGV0IHRoZSBwcm9ncmFtbWVyIGtub3cgdGhhdCB3ZSBkb24ndCBrbm93IHdoYXRcbiAgICAgIC8vIHRvIGRvIHdpdGggdGhpcyBub2RlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdNaXNzaW5nIHNlbWFudGljIGFjdGlvbiBmb3IgJyArIHRoaXMuY3Rvck5hbWUgKyAnIGluICcgKyBuYW1lICsgJyAnICsgdHlwZSk7XG4gICAgfVxuICB9O1xufVxuXG5TZW1hbnRpY3MucHJvdG90eXBlLmFkZE9wZXJhdGlvbk9yQXR0cmlidXRlID0gZnVuY3Rpb24odHlwZSwgc2lnbmF0dXJlLCBhY3Rpb25EaWN0KSB7XG4gIHZhciB0eXBlUGx1cmFsID0gdHlwZSArICdzJztcblxuICB2YXIgcGFyc2VkTmFtZUFuZEZvcm1hbEFyZ3MgPSBwYXJzZVNpZ25hdHVyZShzaWduYXR1cmUsIHR5cGUpO1xuICB2YXIgbmFtZSA9IHBhcnNlZE5hbWVBbmRGb3JtYWxBcmdzLm5hbWU7XG4gIHZhciBmb3JtYWxzID0gcGFyc2VkTmFtZUFuZEZvcm1hbEFyZ3MuZm9ybWFscztcblxuICAvLyBUT0RPOiBjaGVjayB0aGF0IHRoZXJlIGFyZSBubyBkdXBsaWNhdGUgZm9ybWFsIGFyZ3VtZW50c1xuXG4gIHRoaXMuYXNzZXJ0TmV3TmFtZShuYW1lLCB0eXBlKTtcblxuICAvLyBDcmVhdGUgdGhlIGFjdGlvbiBkaWN0aW9uYXJ5IGZvciB0aGlzIG9wZXJhdGlvbiAvIGF0dHJpYnV0ZSB0aGF0IGNvbnRhaW5zIGEgYF9kZWZhdWx0YCBhY3Rpb25cbiAgLy8gd2hpY2ggZGVmaW5lcyB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiBpdGVyYXRpb24sIHRlcm1pbmFsLCBhbmQgbm9uLXRlcm1pbmFsIG5vZGVzLi4uXG4gIHZhciBidWlsdEluRGVmYXVsdCA9IG5ld0RlZmF1bHRBY3Rpb24odHlwZSwgbmFtZSwgZG9JdCk7XG4gIHZhciByZWFsQWN0aW9uRGljdCA9IHtfZGVmYXVsdDogYnVpbHRJbkRlZmF1bHR9O1xuICAvLyAuLi4gYW5kIGFkZCBpbiB0aGUgYWN0aW9ucyBzdXBwbGllZCBieSB0aGUgcHJvZ3JhbW1lciwgd2hpY2ggbWF5IG92ZXJyaWRlIHNvbWUgb3IgYWxsIG9mIHRoZVxuICAvLyBkZWZhdWx0IG9uZXMuXG4gIE9iamVjdC5rZXlzKGFjdGlvbkRpY3QpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgIHJlYWxBY3Rpb25EaWN0W25hbWVdID0gYWN0aW9uRGljdFtuYW1lXTtcbiAgfSk7XG5cbiAgdmFyIGVudHJ5ID0gdHlwZSA9PT0gJ29wZXJhdGlvbicgP1xuICAgICAgbmV3IE9wZXJhdGlvbihuYW1lLCBmb3JtYWxzLCByZWFsQWN0aW9uRGljdCwgYnVpbHRJbkRlZmF1bHQpIDpcbiAgICAgIG5ldyBBdHRyaWJ1dGUobmFtZSwgcmVhbEFjdGlvbkRpY3QsIGJ1aWx0SW5EZWZhdWx0KTtcblxuICAvLyBUaGUgZm9sbG93aW5nIGNoZWNrIGlzIG5vdCBzdHJpY3RseSBuZWNlc3NhcnkgKGl0IHdpbGwgaGFwcGVuIGxhdGVyIGFueXdheSkgYnV0IGl0J3MgYmV0dGVyIHRvXG4gIC8vIGNhdGNoIGVycm9ycyBlYXJseS5cbiAgZW50cnkuY2hlY2tBY3Rpb25EaWN0KHRoaXMuZ3JhbW1hcik7XG5cbiAgdGhpc1t0eXBlUGx1cmFsXVtuYW1lXSA9IGVudHJ5O1xuXG4gIGZ1bmN0aW9uIGRvSXQoKSB7XG4gICAgLy8gRGlzcGF0Y2ggdG8gbW9zdCBzcGVjaWZpYyB2ZXJzaW9uIG9mIHRoaXMgb3BlcmF0aW9uIC8gYXR0cmlidXRlIC0tIGl0IG1heSBoYXZlIGJlZW5cbiAgICAvLyBvdmVycmlkZGVuIGJ5IGEgc3ViLXNlbWFudGljcy5cbiAgICB2YXIgdGhpc1RoaW5nID0gdGhpcy5fc2VtYW50aWNzW3R5cGVQbHVyYWxdW25hbWVdO1xuXG4gICAgLy8gQ2hlY2sgdGhhdCB0aGUgY2FsbGVyIHBhc3NlZCB0aGUgY29ycmVjdCBudW1iZXIgb2YgYXJndW1lbnRzLlxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoICE9PSB0aGlzVGhpbmcuZm9ybWFscy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnSW52YWxpZCBudW1iZXIgb2YgYXJndW1lbnRzIHBhc3NlZCB0byAnICsgbmFtZSArICcgJyArIHR5cGUgKyAnIChleHBlY3RlZCAnICtcbiAgICAgICAgICB0aGlzVGhpbmcuZm9ybWFscy5sZW5ndGggKyAnLCBnb3QgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnKScpO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBhbiBcImFyZ3VtZW50cyBvYmplY3RcIiBmcm9tIHRoZSBhcmd1bWVudHMgdGhhdCB3ZXJlIHBhc3NlZCB0byB0aGlzXG4gICAgLy8gb3BlcmF0aW9uIC8gYXR0cmlidXRlLlxuICAgIHZhciBhcmdzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgdmFyIGZvcm1hbCA9IHRoaXNUaGluZy5mb3JtYWxzW2lkeF07XG4gICAgICBhcmdzW2Zvcm1hbF0gPSBhcmd1bWVudHNbaWR4XTtcbiAgICB9XG5cbiAgICB2YXIgb2xkQXJncyA9IHRoaXMuYXJncztcbiAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgIHZhciBhbnMgPSB0aGlzVGhpbmcuZXhlY3V0ZSh0aGlzLl9zZW1hbnRpY3MsIHRoaXMpO1xuICAgIHRoaXMuYXJncyA9IG9sZEFyZ3M7XG4gICAgcmV0dXJuIGFucztcbiAgfVxuXG4gIGlmICh0eXBlID09PSAnb3BlcmF0aW9uJykge1xuICAgIHRoaXMuV3JhcHBlci5wcm90b3R5cGVbbmFtZV0gPSBkb0l0O1xuICAgIHRoaXMuV3JhcHBlci5wcm90b3R5cGVbbmFtZV0udG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAnWycgKyBuYW1lICsgJyBvcGVyYXRpb25dJztcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLldyYXBwZXIucHJvdG90eXBlLCBuYW1lLCB7XG4gICAgICBnZXQ6IGRvSXQsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUgIC8vIFNvIHRoZSBwcm9wZXJ0eSBjYW4gYmUgZGVsZXRlZC5cbiAgICB9KTtcbiAgICB0aGlzLmF0dHJpYnV0ZUtleXNbbmFtZV0gPSBTeW1ib2woKTtcbiAgfVxufTtcblxuU2VtYW50aWNzLnByb3RvdHlwZS5leHRlbmRPcGVyYXRpb25PckF0dHJpYnV0ZSA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIGFjdGlvbkRpY3QpIHtcbiAgdmFyIHR5cGVQbHVyYWwgPSB0eXBlICsgJ3MnO1xuXG4gIC8vIE1ha2Ugc3VyZSB0aGF0IGBuYW1lYCByZWFsbHkgaXMganVzdCBhIG5hbWUsIGkuZS4sIHRoYXQgaXQgZG9lc24ndCBhbHNvIGNvbnRhaW4gZm9ybWFscy5cbiAgcGFyc2VTaWduYXR1cmUobmFtZSwgJ2F0dHJpYnV0ZScpO1xuXG4gIGlmICghKHRoaXMuc3VwZXIgJiYgbmFtZSBpbiB0aGlzLnN1cGVyW3R5cGVQbHVyYWxdKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGV4dGVuZCAnICsgdHlwZSArIFwiICdcIiArIG5hbWUgK1xuICAgICAgICBcIic6IGRpZCBub3QgaW5oZXJpdCBhbiBcIiArIHR5cGUgKyAnIHdpdGggdGhhdCBuYW1lJyk7XG4gIH1cbiAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzW3R5cGVQbHVyYWxdLCBuYW1lKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGV4dGVuZCAnICsgdHlwZSArIFwiICdcIiArIG5hbWUgKyBcIicgYWdhaW5cIik7XG4gIH1cblxuICAvLyBDcmVhdGUgYSBuZXcgb3BlcmF0aW9uIC8gYXR0cmlidXRlIHdob3NlIGFjdGlvbkRpY3QgZGVsZWdhdGVzIHRvIHRoZSBzdXBlciBvcGVyYXRpb24gL1xuICAvLyBhdHRyaWJ1dGUncyBhY3Rpb25EaWN0LCBhbmQgd2hpY2ggaGFzIGFsbCB0aGUga2V5cyBmcm9tIGBpbmhlcml0ZWRBY3Rpb25EaWN0YC5cbiAgdmFyIGluaGVyaXRlZEZvcm1hbHMgPSB0aGlzW3R5cGVQbHVyYWxdW25hbWVdLmZvcm1hbHM7XG4gIHZhciBpbmhlcml0ZWRBY3Rpb25EaWN0ID0gdGhpc1t0eXBlUGx1cmFsXVtuYW1lXS5hY3Rpb25EaWN0O1xuICB2YXIgbmV3QWN0aW9uRGljdCA9IE9iamVjdC5jcmVhdGUoaW5oZXJpdGVkQWN0aW9uRGljdCk7XG4gIE9iamVjdC5rZXlzKGFjdGlvbkRpY3QpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgIG5ld0FjdGlvbkRpY3RbbmFtZV0gPSBhY3Rpb25EaWN0W25hbWVdO1xuICB9KTtcblxuICB0aGlzW3R5cGVQbHVyYWxdW25hbWVdID0gdHlwZSA9PT0gJ29wZXJhdGlvbicgP1xuICAgICAgbmV3IE9wZXJhdGlvbihuYW1lLCBpbmhlcml0ZWRGb3JtYWxzLCBuZXdBY3Rpb25EaWN0KSA6XG4gICAgICBuZXcgQXR0cmlidXRlKG5hbWUsIG5ld0FjdGlvbkRpY3QpO1xuXG4gIC8vIFRoZSBmb2xsb3dpbmcgY2hlY2sgaXMgbm90IHN0cmljdGx5IG5lY2Vzc2FyeSAoaXQgd2lsbCBoYXBwZW4gbGF0ZXIgYW55d2F5KSBidXQgaXQncyBiZXR0ZXIgdG9cbiAgLy8gY2F0Y2ggZXJyb3JzIGVhcmx5LlxuICB0aGlzW3R5cGVQbHVyYWxdW25hbWVdLmNoZWNrQWN0aW9uRGljdCh0aGlzLmdyYW1tYXIpO1xufTtcblxuU2VtYW50aWNzLnByb3RvdHlwZS5hc3NlcnROZXdOYW1lID0gZnVuY3Rpb24obmFtZSwgdHlwZSkge1xuICBpZiAoV3JhcHBlci5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdDYW5ub3QgYWRkICcgKyB0eXBlICsgXCIgJ1wiICsgbmFtZSArIFwiJzogdGhhdCdzIGEgcmVzZXJ2ZWQgbmFtZVwiKTtcbiAgfVxuICBpZiAobmFtZSBpbiB0aGlzLm9wZXJhdGlvbnMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdDYW5ub3QgYWRkICcgKyB0eXBlICsgXCIgJ1wiICsgbmFtZSArIFwiJzogYW4gb3BlcmF0aW9uIHdpdGggdGhhdCBuYW1lIGFscmVhZHkgZXhpc3RzXCIpO1xuICB9XG4gIGlmIChuYW1lIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0Nhbm5vdCBhZGQgJyArIHR5cGUgKyBcIiAnXCIgKyBuYW1lICsgXCInOiBhbiBhdHRyaWJ1dGUgd2l0aCB0aGF0IG5hbWUgYWxyZWFkeSBleGlzdHNcIik7XG4gIH1cbn07XG5cbi8vIFJldHVybnMgYSB3cmFwcGVyIGZvciB0aGUgZ2l2ZW4gQ1NUIGBub2RlYCBpbiB0aGlzIHNlbWFudGljcy5cbi8vIElmIGBub2RlYCBpcyBhbHJlYWR5IGEgd3JhcHBlciwgcmV0dXJucyBgbm9kZWAgaXRzZWxmLiAgLy8gVE9ETzogd2h5IGlzIHRoaXMgbmVlZGVkP1xuU2VtYW50aWNzLnByb3RvdHlwZS53cmFwID0gZnVuY3Rpb24obm9kZSkge1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIHRoaXMuV3JhcHBlciA/IG5vZGUgOiBuZXcgdGhpcy5XcmFwcGVyKG5vZGUpO1xufTtcblxuLy8gQ3JlYXRlcyBhIG5ldyBTZW1hbnRpY3MgaW5zdGFuY2UgZm9yIGBncmFtbWFyYCwgaW5oZXJpdGluZyBvcGVyYXRpb25zIGFuZCBhdHRyaWJ1dGVzIGZyb21cbi8vIGBvcHRTdXBlclNlbWFudGljc2AsIGlmIGl0IGlzIHNwZWNpZmllZC4gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgYWN0cyBhcyBhIHByb3h5IGZvciB0aGUgbmV3XG4vLyBTZW1hbnRpY3MgaW5zdGFuY2UuIFdoZW4gdGhhdCBmdW5jdGlvbiBpcyBpbnZva2VkIHdpdGggYSBDU1Qgbm9kZSBhcyBhbiBhcmd1bWVudCwgaXQgcmV0dXJuc1xuLy8gYSB3cmFwcGVyIGZvciB0aGF0IG5vZGUgd2hpY2ggZ2l2ZXMgYWNjZXNzIHRvIHRoZSBvcGVyYXRpb25zIGFuZCBhdHRyaWJ1dGVzIHByb3ZpZGVkIGJ5IHRoaXNcbi8vIHNlbWFudGljcy5cblNlbWFudGljcy5jcmVhdGVTZW1hbnRpY3MgPSBmdW5jdGlvbihncmFtbWFyLCBvcHRTdXBlclNlbWFudGljcykge1xuICB2YXIgcyA9IG5ldyBTZW1hbnRpY3MoXG4gICAgICBncmFtbWFyLFxuICAgICAgb3B0U3VwZXJTZW1hbnRpY3MgIT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgb3B0U3VwZXJTZW1hbnRpY3MgOlxuICAgICAgICAgIFNlbWFudGljcy5CdWlsdEluU2VtYW50aWNzLl9nZXRTZW1hbnRpY3MoKSk7XG5cbiAgLy8gVG8gZW5hYmxlIGNsaWVudHMgdG8gaW52b2tlIGEgc2VtYW50aWNzIGxpa2UgYSBmdW5jdGlvbiwgcmV0dXJuIGEgZnVuY3Rpb24gdGhhdCBhY3RzIGFzIGEgcHJveHlcbiAgLy8gZm9yIGBzYCwgd2hpY2ggaXMgdGhlIHJlYWwgYFNlbWFudGljc2AgaW5zdGFuY2UuXG4gIHZhciBwcm94eSA9IGZ1bmN0aW9uIEFTZW1hbnRpY3MobWF0Y2hSZXN1bHQpIHtcbiAgICBpZiAoIShtYXRjaFJlc3VsdCBpbnN0YW5jZW9mIE1hdGNoUmVzdWx0KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAnU2VtYW50aWNzIGV4cGVjdGVkIGEgTWF0Y2hSZXN1bHQsIGJ1dCBnb3QgJyArIGNvbW1vbi51bmV4cGVjdGVkT2JqVG9TdHJpbmcobWF0Y2hSZXN1bHQpKTtcbiAgICB9XG4gICAgaWYgKCFtYXRjaFJlc3VsdC5zdWNjZWVkZWQoKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAnY2Fubm90IGFwcGx5IFNlbWFudGljcyB0byAnICsgbWF0Y2hSZXN1bHQudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgdmFyIGNzdCA9IG1hdGNoUmVzdWx0Ll9jc3Q7XG4gICAgaWYgKGNzdC5ncmFtbWFyICE9PSBncmFtbWFyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgXCJDYW5ub3QgdXNlIGEgTWF0Y2hSZXN1bHQgZnJvbSBncmFtbWFyICdcIiArIGNzdC5ncmFtbWFyLm5hbWUgK1xuICAgICAgICAgIFwiJyB3aXRoIGEgc2VtYW50aWNzIGZvciAnXCIgKyBncmFtbWFyLm5hbWUgKyBcIidcIik7XG4gICAgfVxuICAgIHJldHVybiBzLndyYXAoY3N0KTtcbiAgfTtcblxuICAvLyBGb3J3YXJkIHB1YmxpYyBtZXRob2RzIGZyb20gdGhlIHByb3h5IHRvIHRoZSBzZW1hbnRpY3MgaW5zdGFuY2UuXG4gIHByb3h5LmFkZE9wZXJhdGlvbiA9IGZ1bmN0aW9uKHNpZ25hdHVyZSwgYWN0aW9uRGljdCkge1xuICAgIHMuYWRkT3BlcmF0aW9uT3JBdHRyaWJ1dGUoJ29wZXJhdGlvbicsIHNpZ25hdHVyZSwgYWN0aW9uRGljdCk7XG4gICAgcmV0dXJuIHByb3h5O1xuICB9O1xuICBwcm94eS5leHRlbmRPcGVyYXRpb24gPSBmdW5jdGlvbihuYW1lLCBhY3Rpb25EaWN0KSB7XG4gICAgcy5leHRlbmRPcGVyYXRpb25PckF0dHJpYnV0ZSgnb3BlcmF0aW9uJywgbmFtZSwgYWN0aW9uRGljdCk7XG4gICAgcmV0dXJuIHByb3h5O1xuICB9O1xuICBwcm94eS5hZGRBdHRyaWJ1dGUgPSBmdW5jdGlvbihuYW1lLCBhY3Rpb25EaWN0KSB7XG4gICAgcy5hZGRPcGVyYXRpb25PckF0dHJpYnV0ZSgnYXR0cmlidXRlJywgbmFtZSwgYWN0aW9uRGljdCk7XG4gICAgcmV0dXJuIHByb3h5O1xuICB9O1xuICBwcm94eS5leHRlbmRBdHRyaWJ1dGUgPSBmdW5jdGlvbihuYW1lLCBhY3Rpb25EaWN0KSB7XG4gICAgcy5leHRlbmRPcGVyYXRpb25PckF0dHJpYnV0ZSgnYXR0cmlidXRlJywgbmFtZSwgYWN0aW9uRGljdCk7XG4gICAgcmV0dXJuIHByb3h5O1xuICB9O1xuICBwcm94eS5fZ2V0QWN0aW9uRGljdCA9IGZ1bmN0aW9uKG9wZXJhdGlvbk9yQXR0cmlidXRlTmFtZSkge1xuICAgIHZhciBhY3Rpb24gPSBzLm9wZXJhdGlvbnNbb3BlcmF0aW9uT3JBdHRyaWJ1dGVOYW1lXSB8fCBzLmF0dHJpYnV0ZXNbb3BlcmF0aW9uT3JBdHRyaWJ1dGVOYW1lXTtcbiAgICBpZiAoIWFjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdcIicgKyBvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWUgKyAnXCIgaXMgbm90IGEgdmFsaWQgb3BlcmF0aW9uIG9yIGF0dHJpYnV0ZSAnICtcbiAgICAgICAgJ25hbWUgaW4gdGhpcyBzZW1hbnRpY3MgZm9yIFwiJyArIGdyYW1tYXIubmFtZSArICdcIicpO1xuICAgIH1cbiAgICByZXR1cm4gYWN0aW9uLmFjdGlvbkRpY3Q7XG4gIH07XG4gIHByb3h5Ll9yZW1vdmUgPSBmdW5jdGlvbihvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWUpIHtcbiAgICB2YXIgc2VtYW50aWM7XG4gICAgaWYgKG9wZXJhdGlvbk9yQXR0cmlidXRlTmFtZSBpbiBzLm9wZXJhdGlvbnMpIHtcbiAgICAgIHNlbWFudGljID0gcy5vcGVyYXRpb25zW29wZXJhdGlvbk9yQXR0cmlidXRlTmFtZV07XG4gICAgICBkZWxldGUgcy5vcGVyYXRpb25zW29wZXJhdGlvbk9yQXR0cmlidXRlTmFtZV07XG4gICAgfSBlbHNlIGlmIChvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWUgaW4gcy5hdHRyaWJ1dGVzKSB7XG4gICAgICBzZW1hbnRpYyA9IHMuYXR0cmlidXRlc1tvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWVdO1xuICAgICAgZGVsZXRlIHMuYXR0cmlidXRlc1tvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWVdO1xuICAgIH1cbiAgICBkZWxldGUgcy5XcmFwcGVyLnByb3RvdHlwZVtvcGVyYXRpb25PckF0dHJpYnV0ZU5hbWVdO1xuICAgIHJldHVybiBzZW1hbnRpYztcbiAgfTtcbiAgcHJveHkuZ2V0T3BlcmF0aW9uTmFtZXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocy5vcGVyYXRpb25zKTtcbiAgfTtcbiAgcHJveHkuZ2V0QXR0cmlidXRlTmFtZXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocy5hdHRyaWJ1dGVzKTtcbiAgfTtcbiAgcHJveHkuZ2V0R3JhbW1hciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzLmdyYW1tYXI7XG4gIH07XG4gIHByb3h5LnRvUmVjaXBlID0gZnVuY3Rpb24oc2VtYW50aWNzT25seSkge1xuICAgIHJldHVybiBzLnRvUmVjaXBlKHNlbWFudGljc09ubHkpO1xuICB9O1xuXG4gIC8vIE1ha2UgdGhlIHByb3h5J3MgdG9TdHJpbmcoKSB3b3JrLlxuICBwcm94eS50b1N0cmluZyA9IHMudG9TdHJpbmcuYmluZChzKTtcblxuICAvLyBSZXR1cm5zIHRoZSBzZW1hbnRpY3MgZm9yIHRoZSBwcm94eS5cbiAgcHJveHkuX2dldFNlbWFudGljcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzO1xuICB9O1xuXG4gIHJldHVybiBwcm94eTtcbn07XG5cblNlbWFudGljcy5pbml0QnVpbHRJblNlbWFudGljcyA9IGZ1bmN0aW9uKGJ1aWx0SW5SdWxlcykge1xuICB2YXIgYWN0aW9ucyA9IHtcbiAgICBlbXB0eTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5pdGVyYXRpb24oKTtcbiAgICB9LFxuICAgIG5vbkVtcHR5OiBmdW5jdGlvbihmaXJzdCwgXywgcmVzdCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXRlcmF0aW9uKFtmaXJzdF0uY29uY2F0KHJlc3QuY2hpbGRyZW4pKTtcbiAgICB9XG4gIH07XG5cbiAgU2VtYW50aWNzLkJ1aWx0SW5TZW1hbnRpY3MgPSBTZW1hbnRpY3NcbiAgICAgIC5jcmVhdGVTZW1hbnRpY3MoYnVpbHRJblJ1bGVzLCBudWxsKVxuICAgICAgLmFkZE9wZXJhdGlvbignYXNJdGVyYXRpb24nLCB7XG4gICAgICAgIGVtcHR5TGlzdE9mOiBhY3Rpb25zLmVtcHR5LFxuICAgICAgICBub25lbXB0eUxpc3RPZjogYWN0aW9ucy5ub25FbXB0eSxcbiAgICAgICAgRW1wdHlMaXN0T2Y6IGFjdGlvbnMuZW1wdHksXG4gICAgICAgIE5vbmVtcHR5TGlzdE9mOiBhY3Rpb25zLm5vbkVtcHR5XG4gICAgICB9KTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIE9wZXJhdGlvbiAtLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBBbiBPcGVyYXRpb24gcmVwcmVzZW50cyBhIGZ1bmN0aW9uIHRvIGJlIGFwcGxpZWQgdG8gYSBjb25jcmV0ZSBzeW50YXggdHJlZSAoQ1NUKSAtLSBpdCdzIHZlcnlcbi8vIHNpbWlsYXIgdG8gYSBWaXNpdG9yIChodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1Zpc2l0b3JfcGF0dGVybikuIEFuIG9wZXJhdGlvbiBpcyBleGVjdXRlZCBieVxuLy8gcmVjdXJzaXZlbHkgd2Fsa2luZyB0aGUgQ1NULCBhbmQgYXQgZWFjaCBub2RlLCBpbnZva2luZyB0aGUgbWF0Y2hpbmcgc2VtYW50aWMgYWN0aW9uIGZyb21cbi8vIGBhY3Rpb25EaWN0YC4gU2VlIGBPcGVyYXRpb24ucHJvdG90eXBlLmV4ZWN1dGVgIGZvciBkZXRhaWxzIG9mIGhvdyBhIENTVCBub2RlJ3MgbWF0Y2hpbmcgc2VtYW50aWNcbi8vIGFjdGlvbiBpcyBmb3VuZC5cbmZ1bmN0aW9uIE9wZXJhdGlvbihuYW1lLCBmb3JtYWxzLCBhY3Rpb25EaWN0LCBidWlsdEluRGVmYXVsdCkge1xuICB0aGlzLm5hbWUgPSBuYW1lO1xuICB0aGlzLmZvcm1hbHMgPSBmb3JtYWxzO1xuICB0aGlzLmFjdGlvbkRpY3QgPSBhY3Rpb25EaWN0O1xuICB0aGlzLmJ1aWx0SW5EZWZhdWx0ID0gYnVpbHRJbkRlZmF1bHQ7XG59XG5cbk9wZXJhdGlvbi5wcm90b3R5cGUudHlwZU5hbWUgPSAnb3BlcmF0aW9uJztcblxuT3BlcmF0aW9uLnByb3RvdHlwZS5jaGVja0FjdGlvbkRpY3QgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIGdyYW1tYXIuX2NoZWNrVG9wRG93bkFjdGlvbkRpY3QodGhpcy50eXBlTmFtZSwgdGhpcy5uYW1lLCB0aGlzLmFjdGlvbkRpY3QpO1xufTtcblxuLy8gRXhlY3V0ZSB0aGlzIG9wZXJhdGlvbiBvbiB0aGUgQ1NUIG5vZGUgYXNzb2NpYXRlZCB3aXRoIGBub2RlV3JhcHBlcmAgaW4gdGhlIGNvbnRleHQgb2YgdGhlIGdpdmVuXG4vLyBTZW1hbnRpY3MgaW5zdGFuY2UuXG5PcGVyYXRpb24ucHJvdG90eXBlLmV4ZWN1dGUgPSBmdW5jdGlvbihzZW1hbnRpY3MsIG5vZGVXcmFwcGVyKSB7XG4gIC8vIExvb2sgZm9yIGEgc2VtYW50aWMgYWN0aW9uIHdob3NlIG5hbWUgbWF0Y2hlcyB0aGUgbm9kZSdzIGNvbnN0cnVjdG9yIG5hbWUsIHdoaWNoIGlzIGVpdGhlciB0aGVcbiAgLy8gbmFtZSBvZiBhIHJ1bGUgaW4gdGhlIGdyYW1tYXIsIG9yICdfdGVybWluYWwnIChmb3IgYSB0ZXJtaW5hbCBub2RlKSwgb3IgJ19pdGVyJyAoZm9yIGFuXG4gIC8vIGl0ZXJhdGlvbiBub2RlKS4gSW4gdGhlIGxhdHRlciBjYXNlLCB0aGUgYWN0aW9uIGZ1bmN0aW9uIHJlY2VpdmVzIGEgc2luZ2xlIGFyZ3VtZW50LCB3aGljaCBpc1xuICAvLyBhbiBhcnJheSBjb250YWluaW5nIGFsbCBvZiB0aGUgY2hpbGRyZW4gb2YgdGhlIENTVCBub2RlLlxuICB2YXIgYWN0aW9uRm4gPSB0aGlzLmFjdGlvbkRpY3Rbbm9kZVdyYXBwZXIuX25vZGUuY3Rvck5hbWVdO1xuICBpZiAoYWN0aW9uRm4pIHtcbiAgICByZXR1cm4gdGhpcy5kb0FjdGlvbihzZW1hbnRpY3MsIG5vZGVXcmFwcGVyLCBhY3Rpb25Gbiwgbm9kZVdyYXBwZXIuaXNJdGVyYXRpb24oKSk7XG4gIH1cblxuICAvLyBUaGUgYWN0aW9uIGRpY3Rpb25hcnkgZG9lcyBub3QgY29udGFpbiBhIHNlbWFudGljIGFjdGlvbiBmb3IgdGhpcyBzcGVjaWZpYyB0eXBlIG9mIG5vZGUuXG4gIC8vIElmIHRoaXMgaXMgYSBub250ZXJtaW5hbCBub2RlIGFuZCB0aGUgcHJvZ3JhbW1lciBoYXMgcHJvdmlkZWQgYSBgX25vbnRlcm1pbmFsYCBzZW1hbnRpY1xuICAvLyBhY3Rpb24sIHdlIGludm9rZSBpdDpcbiAgaWYgKG5vZGVXcmFwcGVyLmlzTm9udGVybWluYWwoKSkge1xuICAgIGFjdGlvbkZuID0gdGhpcy5hY3Rpb25EaWN0Ll9ub250ZXJtaW5hbDtcbiAgICBpZiAoYWN0aW9uRm4pIHtcbiAgICAgIHJldHVybiB0aGlzLmRvQWN0aW9uKHNlbWFudGljcywgbm9kZVdyYXBwZXIsIGFjdGlvbkZuLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvLyBPdGhlcndpc2UsIHdlIGludm9rZSB0aGUgJ19kZWZhdWx0JyBzZW1hbnRpYyBhY3Rpb24uXG4gIHJldHVybiB0aGlzLmRvQWN0aW9uKHNlbWFudGljcywgbm9kZVdyYXBwZXIsIHRoaXMuYWN0aW9uRGljdC5fZGVmYXVsdCwgdHJ1ZSk7XG59O1xuXG4vLyBJbnZva2UgYGFjdGlvbkZuYCBvbiB0aGUgQ1NUIG5vZGUgdGhhdCBjb3JyZXNwb25kcyB0byBgbm9kZVdyYXBwZXJgLCBpbiB0aGUgY29udGV4dCBvZlxuLy8gYHNlbWFudGljc2AuIElmIGBvcHRQYXNzQ2hpbGRyZW5Bc0FycmF5YCBpcyB0cnV0aHksIGBhY3Rpb25GbmAgd2lsbCBiZSBjYWxsZWQgd2l0aCBhIHNpbmdsZVxuLy8gYXJndW1lbnQsIHdoaWNoIGlzIGFuIGFycmF5IG9mIHdyYXBwZXJzLiBPdGhlcndpc2UsIHRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRvIGBhY3Rpb25GbmAgd2lsbFxuLy8gYmUgZXF1YWwgdG8gdGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGUgQ1NUIG5vZGUuXG5PcGVyYXRpb24ucHJvdG90eXBlLmRvQWN0aW9uID0gZnVuY3Rpb24oc2VtYW50aWNzLCBub2RlV3JhcHBlciwgYWN0aW9uRm4sIG9wdFBhc3NDaGlsZHJlbkFzQXJyYXkpIHtcbiAgcmV0dXJuIG9wdFBhc3NDaGlsZHJlbkFzQXJyYXkgP1xuICAgICAgYWN0aW9uRm4uY2FsbChub2RlV3JhcHBlciwgbm9kZVdyYXBwZXIuX2NoaWxkcmVuKCkpIDpcbiAgICAgIGFjdGlvbkZuLmFwcGx5KG5vZGVXcmFwcGVyLCBub2RlV3JhcHBlci5fY2hpbGRyZW4oKSk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBBdHRyaWJ1dGUgLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gQXR0cmlidXRlcyBhcmUgT3BlcmF0aW9ucyB3aG9zZSByZXN1bHRzIGFyZSBtZW1vaXplZC4gVGhpcyBtZWFucyB0aGF0LCBmb3IgYW55IGdpdmVuIHNlbWFudGljcyxcbi8vIHRoZSBzZW1hbnRpYyBhY3Rpb24gZm9yIGEgQ1NUIG5vZGUgd2lsbCBiZSBpbnZva2VkIG5vIG1vcmUgdGhhbiBvbmNlLlxuZnVuY3Rpb24gQXR0cmlidXRlKG5hbWUsIGFjdGlvbkRpY3QsIGJ1aWx0SW5EZWZhdWx0KSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuZm9ybWFscyA9IFtdO1xuICB0aGlzLmFjdGlvbkRpY3QgPSBhY3Rpb25EaWN0O1xuICB0aGlzLmJ1aWx0SW5EZWZhdWx0ID0gYnVpbHRJbkRlZmF1bHQ7XG59XG5pbmhlcml0cyhBdHRyaWJ1dGUsIE9wZXJhdGlvbik7XG5cbkF0dHJpYnV0ZS5wcm90b3R5cGUudHlwZU5hbWUgPSAnYXR0cmlidXRlJztcblxuQXR0cmlidXRlLnByb3RvdHlwZS5leGVjdXRlID0gZnVuY3Rpb24oc2VtYW50aWNzLCBub2RlV3JhcHBlcikge1xuICB2YXIgbm9kZSA9IG5vZGVXcmFwcGVyLl9ub2RlO1xuICB2YXIga2V5ID0gc2VtYW50aWNzLmF0dHJpYnV0ZUtleXNbdGhpcy5uYW1lXTtcbiAgaWYgKCFub2RlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAvLyBUaGUgZm9sbG93aW5nIGlzIGEgc3VwZXItc2VuZCAtLSBpc24ndCBKUyBiZWF1dGlmdWw/IDovXG4gICAgbm9kZVtrZXldID0gT3BlcmF0aW9uLnByb3RvdHlwZS5leGVjdXRlLmNhbGwodGhpcywgc2VtYW50aWNzLCBub2RlV3JhcHBlcik7XG4gIH1cbiAgcmV0dXJuIG5vZGVba2V5XTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbWFudGljcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBJbnB1dFN0cmVhbSA9IHJlcXVpcmUoJy4vSW5wdXRTdHJlYW0nKTtcbnZhciBQb3NJbmZvID0gcmVxdWlyZSgnLi9Qb3NJbmZvJyk7XG52YXIgVHJhY2UgPSByZXF1aXJlKCcuL1RyYWNlJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBSTV9SSUdIVE1PU1RfRkFJTFVSRV9QT1NJVElPTiA9IDA7XG52YXIgUk1fUklHSFRNT1NUX0ZBSUxVUkVTID0gMTtcblxudmFyIGFwcGx5U3BhY2VzID0gbmV3IHBleHBycy5BcHBseSgnc3BhY2VzJyk7XG5cbmZ1bmN0aW9uIFN0YXRlKGdyYW1tYXIsIGlucHV0LCBvcHRzKSB7XG4gIHRoaXMuZ3JhbW1hciA9IGdyYW1tYXI7XG4gIHRoaXMuc3RhcnRFeHByID0gdGhpcy5fZ2V0U3RhcnRFeHByKGdyYW1tYXIsIG9wdHMuc3RhcnRBcHBsaWNhdGlvbik7XG4gIHRoaXMuaW5wdXRTdHJlYW0gPSBuZXcgSW5wdXRTdHJlYW0oaW5wdXQpO1xuICB0aGlzLnRyYWNpbmdFbmFibGVkID0gb3B0cy50cmFjZSB8fCBmYWxzZTtcbiAgdGhpcy5pbml0KFJNX1JJR0hUTU9TVF9GQUlMVVJFX1BPU0lUSU9OKTtcbn1cblxuU3RhdGUucHJvdG90eXBlID0ge1xuICBpbml0OiBmdW5jdGlvbihyZWNvcmRpbmdNb2RlKSB7XG4gICAgdGhpcy5wb3NJbmZvcyA9IFtdO1xuICAgIHRoaXMuYmluZGluZ3MgPSBbXTtcbiAgICB0aGlzLmFwcGxpY2F0aW9uU3RhY2sgPSBbXTtcbiAgICB0aGlzLmluTGV4aWZpZWRDb250ZXh0U3RhY2sgPSBbZmFsc2VdO1xuXG4gICAgdGhpcy5yZWNvcmRpbmdNb2RlID0gcmVjb3JkaW5nTW9kZTtcbiAgICBpZiAocmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVfUE9TSVRJT04pIHtcbiAgICAgIHRoaXMucmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uID0gLTE7XG4gICAgfSBlbHNlIGlmIChyZWNvcmRpbmdNb2RlID09PSBSTV9SSUdIVE1PU1RfRkFJTFVSRVMpIHtcbiAgICAgIC8vIFdlIGFsd2F5cyBydW4gaW4gKnJpZ2h0bW9zdCBmYWlsdXJlIHBvc2l0aW9uKiByZWNvcmRpbmcgbW9kZSBiZWZvcmUgcnVubmluZyBpblxuICAgICAgLy8gKnJpZ2h0bW9zdCBmYWlsdXJlcyogcmVjb3JkaW5nIG1vZGUuIEFuZCBzaW5jZSB0aGUgdHJhY2VzIGdlbmVyYXRlZCBieSBlYWNoIG9mXG4gICAgICAvLyB0aGVzZSBwYXNzZXMgd291bGQgYmUgaWRlbnRpY2FsLCB0aGVyZSdzIG5vIG5lZWQgdG8gcmVjb3JkIGl0IG5vdyBpZiB3ZSBoYXZlXG4gICAgICAvLyBhbHJlYWR5IHJlY29yZGVkIGl0IGluIHRoZSBmaXJzdCBwYXNzLlxuICAgICAgdGhpcy50cmFjaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgcmVjb3JkaW5nIG1vZGU6ICcgKyByZWNvcmRpbmdNb2RlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc1RyYWNpbmcoKSkge1xuICAgICAgdGhpcy50cmFjZSA9IFtdO1xuICAgIH1cbiAgfSxcblxuICBlbnRlcjogZnVuY3Rpb24oYXBwKSB7XG4gICAgdGhpcy5hcHBsaWNhdGlvblN0YWNrLnB1c2goYXBwKTtcbiAgICB0aGlzLmluTGV4aWZpZWRDb250ZXh0U3RhY2sucHVzaChmYWxzZSk7XG4gIH0sXG5cbiAgZXhpdDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5hcHBsaWNhdGlvblN0YWNrLnBvcCgpO1xuICAgIHRoaXMuaW5MZXhpZmllZENvbnRleHRTdGFjay5wb3AoKTtcbiAgfSxcblxuICBlbnRlckxleGlmaWVkQ29udGV4dDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pbkxleGlmaWVkQ29udGV4dFN0YWNrLnB1c2godHJ1ZSk7XG4gIH0sXG5cbiAgZXhpdExleGlmaWVkQ29udGV4dDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pbkxleGlmaWVkQ29udGV4dFN0YWNrLnBvcCgpO1xuICB9LFxuXG4gIGN1cnJlbnRBcHBsaWNhdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBwbGljYXRpb25TdGFja1t0aGlzLmFwcGxpY2F0aW9uU3RhY2subGVuZ3RoIC0gMV07XG4gIH0sXG5cbiAgaW5TeW50YWN0aWNDb250ZXh0OiBmdW5jdGlvbigpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuaW5wdXRTdHJlYW0uc291cmNlICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgY3VycmVudEFwcGxpY2F0aW9uID0gdGhpcy5jdXJyZW50QXBwbGljYXRpb24oKTtcbiAgICBpZiAoY3VycmVudEFwcGxpY2F0aW9uKSB7XG4gICAgICByZXR1cm4gY3VycmVudEFwcGxpY2F0aW9uLmlzU3ludGFjdGljKCkgJiYgIXRoaXMuaW5MZXhpZmllZENvbnRleHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhlIHRvcC1sZXZlbCBjb250ZXh0IGlzIHN5bnRhY3RpYyBpZiB0aGUgc3RhcnQgYXBwbGljYXRpb24gaXMuXG4gICAgICByZXR1cm4gdGhpcy5zdGFydEV4cHIuZmFjdG9yc1swXS5pc1N5bnRhY3RpYygpO1xuICAgIH1cbiAgfSxcblxuICBpbkxleGlmaWVkQ29udGV4dDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5MZXhpZmllZENvbnRleHRTdGFja1t0aGlzLmluTGV4aWZpZWRDb250ZXh0U3RhY2subGVuZ3RoIC0gMV07XG4gIH0sXG5cbiAgc2tpcFNwYWNlczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9yaWdGYWlsdXJlc0luZm8gPSB0aGlzLmdldEZhaWx1cmVzSW5mbygpO1xuICAgIHRoaXMuZXZhbChhcHBseVNwYWNlcyk7XG4gICAgdGhpcy5iaW5kaW5ncy5wb3AoKTtcbiAgICB0aGlzLnJlc3RvcmVGYWlsdXJlc0luZm8ob3JpZ0ZhaWx1cmVzSW5mbyk7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRTdHJlYW0ucG9zO1xuICB9LFxuXG4gIHNraXBTcGFjZXNJZkluU3ludGFjdGljQ29udGV4dDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5TeW50YWN0aWNDb250ZXh0KCkgP1xuICAgICAgICB0aGlzLnNraXBTcGFjZXMoKSA6XG4gICAgICAgIHRoaXMuaW5wdXRTdHJlYW0ucG9zO1xuICB9LFxuXG4gIG1heWJlU2tpcFNwYWNlc0JlZm9yZTogZnVuY3Rpb24oZXhwcikge1xuICAgIGlmIChleHByIGluc3RhbmNlb2YgcGV4cHJzLkFwcGx5ICYmIGV4cHIuaXNTeW50YWN0aWMoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2tpcFNwYWNlcygpO1xuICAgIH0gZWxzZSBpZiAoZXhwci5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlKCkgJiYgZXhwciAhPT0gYXBwbHlTcGFjZXMpIHtcbiAgICAgIHJldHVybiB0aGlzLnNraXBTcGFjZXNJZkluU3ludGFjdGljQ29udGV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnB1dFN0cmVhbS5wb3M7XG4gICAgfVxuICB9LFxuXG4gIHRydW5jYXRlQmluZGluZ3M6IGZ1bmN0aW9uKG5ld0xlbmd0aCkge1xuICAgIC8vIFllcywgdGhpcyBpcyB0aGlzIHJlYWxseSBmYXN0ZXIgdGhhbiBzZXR0aW5nIHRoZSBgbGVuZ3RoYCBwcm9wZXJ0eSAodGVzdGVkIHdpdGhcbiAgICAvLyBiaW4vZXM1YmVuY2ggb24gTm9kZSB2Ni4xLjApLlxuICAgIHdoaWxlICh0aGlzLmJpbmRpbmdzLmxlbmd0aCA+IG5ld0xlbmd0aCkge1xuICAgICAgdGhpcy5iaW5kaW5ncy5wb3AoKTtcbiAgICB9XG4gIH0sXG5cbiAgZ2V0Q3VycmVudFBvc0luZm86IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdldFBvc0luZm8odGhpcy5pbnB1dFN0cmVhbS5wb3MpO1xuICB9LFxuXG4gIGdldFBvc0luZm86IGZ1bmN0aW9uKHBvcykge1xuICAgIHZhciBwb3NJbmZvID0gdGhpcy5wb3NJbmZvc1twb3NdO1xuICAgIGlmICghcG9zSW5mbykge1xuICAgICAgcG9zSW5mbyA9IHRoaXMucG9zSW5mb3NbcG9zXSA9IG5ldyBQb3NJbmZvKHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gcG9zSW5mbztcbiAgfSxcblxuICBwcm9jZXNzRmFpbHVyZTogZnVuY3Rpb24ocG9zLCBleHByKSB7XG4gICAgaWYgKHRoaXMucmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVfUE9TSVRJT04pIHtcbiAgICAgIGlmIChwb3MgPiB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbikge1xuICAgICAgICB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbiA9IHBvcztcbiAgICAgIH1cbiAgICB9IGVsc2UgLyogaWYgKHRoaXMucmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVTKSAqL1xuICAgICAgICBpZiAocG9zID09PSB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbikge1xuICAgICAgICAgIC8vIFdlJ3JlIG9ubHkgaW50ZXJlc3RlZCBpbiBmYWlsdXJlcyBhdCB0aGUgcmlnaHRtb3N0IGZhaWx1cmUgcG9zaXRpb24gdGhhdCBoYXZlbid0XG4gICAgICAgICAgLy8gYWxyZWFkeSBiZWVuIHJlY29yZGVkLlxuXG4gICAgICAgICAgdmFyIGFwcCA9IHRoaXMuY3VycmVudEFwcGxpY2F0aW9uKCk7XG4gICAgICAgICAgaWYgKGFwcCkge1xuICAgICAgICAgICAgLy8gU3Vic3RpdHV0ZSBwYXJhbWV0ZXJzIHdpdGggdGhlIGFjdHVhbCBwZXhwcnMgdGhhdCB3ZXJlIHBhc3NlZCB0b1xuICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgcnVsZS5cbiAgICAgICAgICAgIGV4cHIgPSBleHByLnN1YnN0aXR1dGVQYXJhbXMoYXBwLmFyZ3MpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGlzIGJyYW5jaCBpcyBvbmx5IHJlYWNoZWQgZm9yIHRoZSBcImVuZC1jaGVja1wiIHRoYXQgaXNcbiAgICAgICAgICAgIC8vIHBlcmZvcm1lZCBhZnRlciB0aGUgdG9wLWxldmVsIGFwcGxpY2F0aW9uLiBJbiB0aGF0IGNhc2UsXG4gICAgICAgICAgICAvLyBleHByID09PSBwZXhwcnMuZW5kIHNvIHRoZXJlIGlzIG5vIG5lZWQgdG8gc3Vic3RpdHV0ZVxuICAgICAgICAgICAgLy8gcGFyYW1ldGVycy5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmFkZFJpZ2h0bW9zdEZhaWx1cmUoZXhwci50b0ZhaWx1cmUodGhpcy5ncmFtbWFyKSwgZmFsc2UpO1xuICAgICAgICB9XG4gIH0sXG5cbiAgZW5zdXJlUmlnaHRtb3N0RmFpbHVyZXM6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5yaWdodG1vc3RGYWlsdXJlcykge1xuICAgICAgdGhpcy5yaWdodG1vc3RGYWlsdXJlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICB9LFxuXG4gIGFkZFJpZ2h0bW9zdEZhaWx1cmU6IGZ1bmN0aW9uKGZhaWx1cmUsIHNob3VsZENsb25lSWZOZXcpIHtcbiAgICB0aGlzLmVuc3VyZVJpZ2h0bW9zdEZhaWx1cmVzKCk7XG4gICAgdmFyIGtleSA9IGZhaWx1cmUudG9LZXkoKTtcbiAgICBpZiAoIXRoaXMucmlnaHRtb3N0RmFpbHVyZXNba2V5XSkge1xuICAgICAgdGhpcy5yaWdodG1vc3RGYWlsdXJlc1trZXldID0gc2hvdWxkQ2xvbmVJZk5ldyA/IGZhaWx1cmUuY2xvbmUoKSA6IGZhaWx1cmU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnJpZ2h0bW9zdEZhaWx1cmVzW2tleV0uaXNGbHVmZnkoKSAmJiAhZmFpbHVyZS5pc0ZsdWZmeSgpKSB7XG4gICAgICB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVzW2tleV0uY2xlYXJGbHVmZnkoKTtcbiAgICB9XG4gIH0sXG5cbiAgYWRkUmlnaHRtb3N0RmFpbHVyZXM6IGZ1bmN0aW9uKGZhaWx1cmVzLCBzaG91bGRDbG9uZUlmTmV3KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIE9iamVjdC5rZXlzKGZhaWx1cmVzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgc2VsZi5hZGRSaWdodG1vc3RGYWlsdXJlKGZhaWx1cmVzW2tleV0sIHNob3VsZENsb25lSWZOZXcpO1xuICAgIH0pO1xuICB9LFxuXG4gIGNsb25lUmlnaHRtb3N0RmFpbHVyZXM6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5yaWdodG1vc3RGYWlsdXJlcykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB2YXIgYW5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgT2JqZWN0LmtleXModGhpcy5yaWdodG1vc3RGYWlsdXJlcykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgIGFuc1trZXldID0gc2VsZi5yaWdodG1vc3RGYWlsdXJlc1trZXldLmNsb25lKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGFucztcbiAgfSxcblxuICBnZXRSaWdodG1vc3RGYWlsdXJlUG9zaXRpb246IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbjtcbiAgfSxcblxuICBnZXRGYWlsdXJlczogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVfUE9TSVRJT04pIHtcbiAgICAgIC8vIFJld2luZCwgdGhlbiB0cnkgdG8gbWF0Y2ggdGhlIGlucHV0IGFnYWluLCByZWNvcmRpbmcgZmFpbHVyZXMuXG4gICAgICB0aGlzLmluaXQoUk1fUklHSFRNT1NUX0ZBSUxVUkVTKTtcbiAgICAgIHRoaXMuZXZhbEZyb21TdGFydCgpO1xuICAgIH1cblxuICAgIHRoaXMuZW5zdXJlUmlnaHRtb3N0RmFpbHVyZXMoKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMucmlnaHRtb3N0RmFpbHVyZXMpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBzZWxmLnJpZ2h0bW9zdEZhaWx1cmVzW2tleV07XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gUmV0dXJucyB0aGUgbWVtb2l6ZWQgdHJhY2UgZW50cnkgZm9yIGBleHByYCBhdCBgcG9zYCwgaWYgb25lIGV4aXN0cywgYG51bGxgIG90aGVyd2lzZS5cbiAgZ2V0TWVtb2l6ZWRUcmFjZUVudHJ5OiBmdW5jdGlvbihwb3MsIGV4cHIpIHtcbiAgICB2YXIgcG9zSW5mbyA9IHRoaXMucG9zSW5mb3NbcG9zXTtcbiAgICBpZiAocG9zSW5mbyAmJiBleHByLnJ1bGVOYW1lKSB7XG4gICAgICB2YXIgbWVtb1JlYyA9IHBvc0luZm8ubWVtb1tleHByLnRvTWVtb0tleSgpXTtcbiAgICAgIGlmIChtZW1vUmVjICYmIG1lbW9SZWMudHJhY2VFbnRyeSkge1xuICAgICAgICB2YXIgZW50cnkgPSBtZW1vUmVjLnRyYWNlRW50cnkuY2xvbmVXaXRoRXhwcihleHByKTtcbiAgICAgICAgZW50cnkuaXNNZW1vaXplZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBlbnRyeTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgLy8gUmV0dXJucyBhIG5ldyB0cmFjZSBlbnRyeSwgd2l0aCB0aGUgY3VycmVudGx5IGFjdGl2ZSB0cmFjZSBhcnJheSBhcyBpdHMgY2hpbGRyZW4uXG4gIGdldFRyYWNlRW50cnk6IGZ1bmN0aW9uKHBvcywgZXhwciwgc3VjY2VlZGVkLCBiaW5kaW5ncykge1xuICAgIHJldHVybiB0aGlzLmdldE1lbW9pemVkVHJhY2VFbnRyeShwb3MsIGV4cHIpIHx8XG4gICAgICAgICAgIG5ldyBUcmFjZSh0aGlzLmlucHV0U3RyZWFtLCBwb3MsIGV4cHIsIHN1Y2NlZWRlZCwgYmluZGluZ3MsIHRoaXMudHJhY2UpO1xuICB9LFxuXG4gIGlzVHJhY2luZzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhY2luZ0VuYWJsZWQ7XG4gIH0sXG5cbiAgdXNlTWVtb2l6ZWRSZXN1bHQ6IGZ1bmN0aW9uKG1lbW9SZWMpIHtcbiAgICBpZiAodGhpcy5pc1RyYWNpbmcoKSkge1xuICAgICAgdGhpcy50cmFjZS5wdXNoKG1lbW9SZWMudHJhY2VFbnRyeSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVTICYmIG1lbW9SZWMuZmFpbHVyZXNBdFJpZ2h0bW9zdFBvc2l0aW9uKSB7XG4gICAgICB0aGlzLmFkZFJpZ2h0bW9zdEZhaWx1cmVzKG1lbW9SZWMuZmFpbHVyZXNBdFJpZ2h0bW9zdFBvc2l0aW9uLCB0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAobWVtb1JlYy52YWx1ZSkge1xuICAgICAgdGhpcy5pbnB1dFN0cmVhbS5wb3MgPSBtZW1vUmVjLnBvcztcbiAgICAgIHRoaXMuYmluZGluZ3MucHVzaChtZW1vUmVjLnZhbHVlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLy8gRXZhbHVhdGUgYGV4cHJgIGFuZCByZXR1cm4gYHRydWVgIGlmIGl0IHN1Y2NlZWRlZCwgYGZhbHNlYCBvdGhlcndpc2UuIE9uIHN1Y2Nlc3MsIGBiaW5kaW5nc2BcbiAgLy8gd2lsbCBoYXZlIGBleHByLmdldEFyaXR5KClgIG1vcmUgZWxlbWVudHMgdGhhbiBiZWZvcmUsIGFuZCB0aGUgaW5wdXQgc3RyZWFtJ3MgcG9zaXRpb24gbWF5XG4gIC8vIGhhdmUgaW5jcmVhc2VkLiBPbiBmYWlsdXJlLCBgYmluZGluZ3NgIGFuZCBwb3NpdGlvbiB3aWxsIGJlIHVuY2hhbmdlZC5cbiAgZXZhbDogZnVuY3Rpb24oZXhwcikge1xuICAgIHZhciBpbnB1dFN0cmVhbSA9IHRoaXMuaW5wdXRTdHJlYW07XG4gICAgdmFyIG9yaWdOdW1CaW5kaW5ncyA9IHRoaXMuYmluZGluZ3MubGVuZ3RoO1xuXG4gICAgdmFyIG9yaWdGYWlsdXJlcztcbiAgICBpZiAodGhpcy5yZWNvcmRpbmdNb2RlID09PSBSTV9SSUdIVE1PU1RfRkFJTFVSRVMpIHtcbiAgICAgIG9yaWdGYWlsdXJlcyA9IHRoaXMucmlnaHRtb3N0RmFpbHVyZXM7XG4gICAgICB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVzID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICAgIHZhciBtZW1vUG9zID0gdGhpcy5tYXliZVNraXBTcGFjZXNCZWZvcmUoZXhwcik7XG5cbiAgICB2YXIgb3JpZ1RyYWNlO1xuICAgIGlmICh0aGlzLmlzVHJhY2luZygpKSB7XG4gICAgICBvcmlnVHJhY2UgPSB0aGlzLnRyYWNlO1xuICAgICAgdGhpcy50cmFjZSA9IFtdO1xuICAgIH1cblxuICAgIC8vIERvIHRoZSBhY3R1YWwgZXZhbHVhdGlvbi5cbiAgICB2YXIgYW5zID0gZXhwci5ldmFsKHRoaXMpO1xuXG4gICAgaWYgKHRoaXMuaXNUcmFjaW5nKCkpIHtcbiAgICAgIHZhciBiaW5kaW5ncyA9IHRoaXMuYmluZGluZ3Muc2xpY2Uob3JpZ051bUJpbmRpbmdzKTtcbiAgICAgIHZhciB0cmFjZUVudHJ5ID0gdGhpcy5nZXRUcmFjZUVudHJ5KG1lbW9Qb3MsIGV4cHIsIGFucywgYmluZGluZ3MpO1xuICAgICAgdHJhY2VFbnRyeS5pc0ltcGxpY2l0U3BhY2VzID0gZXhwciA9PT0gYXBwbHlTcGFjZXM7XG4gICAgICB0cmFjZUVudHJ5LmlzUm9vdE5vZGUgPSBleHByID09PSB0aGlzLnN0YXJ0RXhwcjtcbiAgICAgIG9yaWdUcmFjZS5wdXNoKHRyYWNlRW50cnkpO1xuICAgICAgdGhpcy50cmFjZSA9IG9yaWdUcmFjZTtcbiAgICB9XG5cbiAgICBpZiAoYW5zKSB7XG4gICAgICBpZiAodGhpcy5yaWdodG1vc3RGYWlsdXJlcyAmJlxuICAgICAgICAoaW5wdXRTdHJlYW0ucG9zID09PSB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbiB8fFxuICAgICAgICAgdGhpcy5za2lwU3BhY2VzSWZJblN5bnRhY3RpY0NvbnRleHQoKSA9PT0gdGhpcy5yaWdodG1vc3RGYWlsdXJlUG9zaXRpb24pKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5yaWdodG1vc3RGYWlsdXJlcykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICBzZWxmLnJpZ2h0bW9zdEZhaWx1cmVzW2tleV0ubWFrZUZsdWZmeSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmVzZXQgdGhlIHBvc2l0aW9uIGFuZCB0aGUgYmluZGluZ3MuXG4gICAgICBpbnB1dFN0cmVhbS5wb3MgPSBvcmlnUG9zO1xuICAgICAgdGhpcy50cnVuY2F0ZUJpbmRpbmdzKG9yaWdOdW1CaW5kaW5ncyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVTICYmIG9yaWdGYWlsdXJlcykge1xuICAgICAgdGhpcy5hZGRSaWdodG1vc3RGYWlsdXJlcyhvcmlnRmFpbHVyZXMsIGZhbHNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYW5zO1xuICB9LFxuXG4gIC8vIFJldHVybiB0aGUgc3RhcnRpbmcgZXhwcmVzc2lvbiBmb3IgdGhpcyBncmFtbWFyLiBJZiBgb3B0U3RhcnRBcHBsaWNhdGlvbmAgaXMgc3BlY2lmaWVkLCBpdFxuICAvLyBpcyBhIHN0cmluZyBleHByZXNzaW5nIGEgcnVsZSBhcHBsaWNhdGlvbiBpbiB0aGUgZ3JhbW1hci4gSWYgbm90IHNwZWNpZmllZCwgdGhlIGdyYW1tYXInc1xuICAvLyBkZWZhdWx0IHN0YXJ0IHJ1bGUgd2lsbCBiZSB1c2VkLlxuICBfZ2V0U3RhcnRFeHByOiBmdW5jdGlvbihncmFtbWFyLCBvcHRTdGFydEFwcGxpY2F0aW9uKSB7XG4gICAgdmFyIGFwcGxpY2F0aW9uU3RyID0gb3B0U3RhcnRBcHBsaWNhdGlvbiB8fCBncmFtbWFyLmRlZmF1bHRTdGFydFJ1bGU7XG4gICAgaWYgKCFhcHBsaWNhdGlvblN0cikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIHN0YXJ0IHJ1bGUgYXJndW1lbnQgLS0gdGhlIGdyYW1tYXIgaGFzIG5vIGRlZmF1bHQgc3RhcnQgcnVsZS4nKTtcbiAgICB9XG5cbiAgICB2YXIgc3RhcnRBcHAgPSBncmFtbWFyLnBhcnNlQXBwbGljYXRpb24oYXBwbGljYXRpb25TdHIpO1xuICAgIHJldHVybiBuZXcgcGV4cHJzLlNlcShbc3RhcnRBcHAsIHBleHBycy5lbmRdKTtcbiAgfSxcblxuICBldmFsRnJvbVN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmV2YWwodGhpcy5zdGFydEV4cHIpO1xuICB9LFxuXG4gIGdldEZhaWx1cmVzSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVfUE9TSVRJT04pIHtcbiAgICAgIHJldHVybiB0aGlzLnJpZ2h0bW9zdEZhaWx1cmVQb3NpdGlvbjtcbiAgICB9IGVsc2UgLyogaWYgKHRoaXMucmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVTKSAqLyB7XG4gICAgICByZXR1cm4gdGhpcy5yaWdodG1vc3RGYWlsdXJlcztcbiAgICB9XG4gIH0sXG5cbiAgcmVzdG9yZUZhaWx1cmVzSW5mbzogZnVuY3Rpb24oZmFpbHVyZXNJbmZvKSB7XG4gICAgaWYgKHRoaXMucmVjb3JkaW5nTW9kZSA9PT0gUk1fUklHSFRNT1NUX0ZBSUxVUkVfUE9TSVRJT04pIHtcbiAgICAgIHRoaXMucmlnaHRtb3N0RmFpbHVyZVBvc2l0aW9uID0gZmFpbHVyZXNJbmZvO1xuICAgIH0gZWxzZSAvKiBpZiAodGhpcy5yZWNvcmRpbmdNb2RlID09PSBSTV9SSUdIVE1PU1RfRkFJTFVSRVMpICovIHtcbiAgICAgIHRoaXMucmlnaHRtb3N0RmFpbHVyZXMgPSBmYWlsdXJlc0luZm87XG4gICAgfVxuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBJbnRlcnZhbCA9IHJlcXVpcmUoJy4vSW50ZXJ2YWwnKTtcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gVW5pY29kZSBjaGFyYWN0ZXJzIHRoYXQgYXJlIHVzZWQgaW4gdGhlIGB0b1N0cmluZ2Agb3V0cHV0LlxudmFyIEJBTExPVF9YID0gJ1xcdTI3MTcnO1xudmFyIENIRUNLX01BUksgPSAnXFx1MjcxMyc7XG52YXIgRE9UX09QRVJBVE9SID0gJ1xcdTIyQzUnO1xudmFyIFJJR0hUV0FSRFNfRE9VQkxFX0FSUk9XID0gJ1xcdTIxRDInO1xudmFyIFNZTUJPTF9GT1JfSE9SSVpPTlRBTF9UQUJVTEFUSU9OID0gJ1xcdTI0MDknO1xudmFyIFNZTUJPTF9GT1JfTElORV9GRUVEID0gJ1xcdTI0MEEnO1xudmFyIFNZTUJPTF9GT1JfQ0FSUklBR0VfUkVUVVJOID0gJ1xcdTI0MEQnO1xuXG5mdW5jdGlvbiBzcGFjZXMobikge1xuICByZXR1cm4gY29tbW9uLnJlcGVhdCgnICcsIG4pLmpvaW4oJycpO1xufVxuXG4vLyBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBwb3J0aW9uIG9mIGBpbnB1dFN0cmVhbWAgYXQgb2Zmc2V0IGBwb3NgLlxuLy8gVGhlIHJlc3VsdCB3aWxsIGNvbnRhaW4gZXhhY3RseSBgbGVuYCBjaGFyYWN0ZXJzLlxuZnVuY3Rpb24gZ2V0SW5wdXRFeGNlcnB0KGlucHV0U3RyZWFtLCBwb3MsIGxlbikge1xuICB2YXIgZXhjZXJwdCA9IGFzRXNjYXBlZFN0cmluZyhpbnB1dFN0cmVhbS5zb3VyY2VTbGljZShwb3MsIHBvcyArIGxlbikpO1xuXG4gIC8vIFBhZCB0aGUgb3V0cHV0IGlmIG5lY2Vzc2FyeS5cbiAgaWYgKGV4Y2VycHQubGVuZ3RoIDwgbGVuKSB7XG4gICAgcmV0dXJuIGV4Y2VycHQgKyBjb21tb24ucmVwZWF0KCcgJywgbGVuIC0gZXhjZXJwdC5sZW5ndGgpLmpvaW4oJycpO1xuICB9XG4gIHJldHVybiBleGNlcnB0O1xufVxuXG5mdW5jdGlvbiBhc0VzY2FwZWRTdHJpbmcob2JqKSB7XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgIC8vIFJlcGxhY2Ugbm9uLXByaW50YWJsZSBjaGFyYWN0ZXJzIHdpdGggdmlzaWJsZSBzeW1ib2xzLlxuICAgIHJldHVybiBvYmpcbiAgICAgICAgLnJlcGxhY2UoLyAvZywgRE9UX09QRVJBVE9SKVxuICAgICAgICAucmVwbGFjZSgvXFx0L2csIFNZTUJPTF9GT1JfSE9SSVpPTlRBTF9UQUJVTEFUSU9OKVxuICAgICAgICAucmVwbGFjZSgvXFxuL2csIFNZTUJPTF9GT1JfTElORV9GRUVEKVxuICAgICAgICAucmVwbGFjZSgvXFxyL2csIFNZTUJPTF9GT1JfQ0FSUklBR0VfUkVUVVJOKTtcbiAgfVxuICByZXR1cm4gU3RyaW5nKG9iaik7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIFRyYWNlIC0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIFRyYWNlKGlucHV0U3RyZWFtLCBwb3MsIGV4cHIsIHN1Y2NlZWRlZCwgYmluZGluZ3MsIG9wdENoaWxkcmVuKSB7XG4gIHRoaXMuaW5wdXRTdHJlYW0gPSBpbnB1dFN0cmVhbTtcbiAgdGhpcy5wb3MgPSBwb3M7XG4gIHRoaXMuc291cmNlID0gbmV3IEludGVydmFsKGlucHV0U3RyZWFtLCBwb3MsIGlucHV0U3RyZWFtLnBvcyk7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG4gIHRoaXMuc3VjY2VlZGVkID0gc3VjY2VlZGVkO1xuICB0aGlzLmJpbmRpbmdzID0gYmluZGluZ3M7XG4gIHRoaXMuY2hpbGRyZW4gPSBvcHRDaGlsZHJlbiB8fCBbXTtcblxuICB0aGlzLmlzSGVhZE9mTGVmdFJlY3Vyc2lvbiA9IGZhbHNlOyAgLy8gSXMgdGhpcyB0aGUgb3V0ZXJtb3N0IExSIGFwcGxpY2F0aW9uP1xuICB0aGlzLmlzSW1wbGljaXRTcGFjZXMgPSBmYWxzZTtcbiAgdGhpcy5pc01lbW9pemVkID0gZmFsc2U7XG4gIHRoaXMuaXNSb290Tm9kZSA9IGZhbHNlO1xuICB0aGlzLnRlcm1pbmF0ZXNMUiA9IGZhbHNlO1xuICB0aGlzLnRlcm1pbmF0aW5nTFJFbnRyeSA9IG51bGw7XG59XG5cbi8vIEEgdmFsdWUgdGhhdCBjYW4gYmUgcmV0dXJuZWQgZnJvbSB2aXNpdG9yIGZ1bmN0aW9ucyB0byBpbmRpY2F0ZSB0aGF0IGFcbi8vIG5vZGUgc2hvdWxkIG5vdCBiZSByZWN1cnNlZCBpbnRvLlxuVHJhY2UucHJvdG90eXBlLlNLSVAgPSB7fTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRyYWNlLnByb3RvdHlwZSwgJ2Rpc3BsYXlTdHJpbmcnLCB7XG4gIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmV4cHIudG9EaXNwbGF5U3RyaW5nKCk7IH1cbn0pO1xuXG5UcmFjZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2xvbmVXaXRoRXhwcih0aGlzLmV4cHIpO1xufTtcblxuVHJhY2UucHJvdG90eXBlLmNsb25lV2l0aEV4cHIgPSBmdW5jdGlvbihleHByKSB7XG4gIHZhciBhbnMgPSBuZXcgVHJhY2UoXG4gICAgICB0aGlzLmlucHV0U3RyZWFtLCB0aGlzLnBvcywgZXhwciwgdGhpcy5zdWNjZWVkZWQsIHRoaXMuYmluZGluZ3MsIHRoaXMuY2hpbGRyZW4pO1xuXG4gIGFucy5pc0hlYWRPZkxlZnRSZWN1cnNpb24gPSB0aGlzLmlzSGVhZE9mTGVmdFJlY3Vyc2lvbjtcbiAgYW5zLmlzSW1wbGljaXRTcGFjZXMgPSB0aGlzLmlzSW1wbGljaXRTcGFjZXM7XG4gIGFucy5pc01lbW9pemVkID0gdGhpcy5pc01lbW9pemVkO1xuICBhbnMuaXNSb290Tm9kZSA9IHRoaXMuaXNSb290Tm9kZTtcbiAgYW5zLnRlcm1pbmF0ZXNMUiA9IHRoaXMudGVybWluYXRlc0xSO1xuICBhbnMudGVybWluYXRpbmdMUkVudHJ5ID0gdGhpcy50ZXJtaW5hdGluZ0xSRW50cnk7XG4gIHJldHVybiBhbnM7XG59O1xuXG4vLyBSZWNvcmQgdGhlIHRyYWNlIGluZm9ybWF0aW9uIGZvciB0aGUgdGVybWluYXRpbmcgY29uZGl0aW9uIG9mIHRoZSBMUiBsb29wLlxuVHJhY2UucHJvdG90eXBlLnJlY29yZExSVGVybWluYXRpb24gPSBmdW5jdGlvbihydWxlQm9keVRyYWNlLCB2YWx1ZSkge1xuICB0aGlzLnRlcm1pbmF0aW5nTFJFbnRyeSA9XG4gICAgICBuZXcgVHJhY2UodGhpcy5pbnB1dFN0cmVhbSwgdGhpcy5wb3MsIHRoaXMuZXhwciwgZmFsc2UsIFt2YWx1ZV0sIFtydWxlQm9keVRyYWNlXSk7XG4gIHRoaXMudGVybWluYXRpbmdMUkVudHJ5LnRlcm1pbmF0ZXNMUiA9IHRydWU7XG59O1xuXG4vLyBSZWN1cnNpdmVseSB0cmF2ZXJzZSB0aGlzIHRyYWNlIG5vZGUgYW5kIGFsbCBpdHMgZGVzY2VuZGVudHMsIGNhbGxpbmcgYSB2aXNpdG9yIGZ1bmN0aW9uXG4vLyBmb3IgZWFjaCBub2RlIHRoYXQgaXMgdmlzaXRlZC4gSWYgYHZpc3Rvck9iak9yRm5gIGlzIGFuIG9iamVjdCwgdGhlbiBpdHMgJ2VudGVyJyBwcm9wZXJ0eVxuLy8gaXMgYSBmdW5jdGlvbiB0byBjYWxsIGJlZm9yZSB2aXNpdGluZyB0aGUgY2hpbGRyZW4gb2YgYSBub2RlLCBhbmQgaXRzICdleGl0JyBwcm9wZXJ0eSBpc1xuLy8gYSBmdW5jdGlvbiB0byBjYWxsIGFmdGVyd2FyZHMuIElmIGB2aXNpdG9yT2JqT3JGbmAgaXMgYSBmdW5jdGlvbiwgaXQgcmVwcmVzZW50cyB0aGUgJ2VudGVyJ1xuLy8gZnVuY3Rpb24uXG4vL1xuLy8gVGhlIGZ1bmN0aW9ucyBhcmUgY2FsbGVkIHdpdGggdGhyZWUgYXJndW1lbnRzOiB0aGUgVHJhY2Ugbm9kZSwgaXRzIHBhcmVudCBUcmFjZSwgYW5kIGEgbnVtYmVyXG4vLyByZXByZXNlbnRpbmcgdGhlIGRlcHRoIG9mIHRoZSBub2RlIGluIHRoZSB0cmVlLiAoVGhlIHJvb3Qgbm9kZSBoYXMgZGVwdGggMC4pIGBvcHRUaGlzQXJnYCwgaWZcbi8vIHNwZWNpZmllZCwgaXMgdGhlIHZhbHVlIHRvIHVzZSBmb3IgYHRoaXNgIHdoZW4gZXhlY3V0aW5nIHRoZSB2aXNpdG9yIGZ1bmN0aW9ucy5cblRyYWNlLnByb3RvdHlwZS53YWxrID0gZnVuY3Rpb24odmlzaXRvck9iak9yRm4sIG9wdFRoaXNBcmcpIHtcbiAgdmFyIHZpc2l0b3IgPSB2aXNpdG9yT2JqT3JGbjtcbiAgaWYgKHR5cGVvZiB2aXNpdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmlzaXRvciA9IHtlbnRlcjogdmlzaXRvcn07XG4gIH1cblxuICBmdW5jdGlvbiBfd2Fsayhub2RlLCBwYXJlbnQsIGRlcHRoKSB7XG4gICAgdmFyIHJlY3Vyc2UgPSB0cnVlO1xuICAgIGlmICh2aXNpdG9yLmVudGVyKSB7XG4gICAgICBpZiAodmlzaXRvci5lbnRlci5jYWxsKG9wdFRoaXNBcmcsIG5vZGUsIHBhcmVudCwgZGVwdGgpID09PSBUcmFjZS5wcm90b3R5cGUuU0tJUCkge1xuICAgICAgICByZWN1cnNlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyZWN1cnNlKSB7XG4gICAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgX3dhbGsoY2hpbGQsIG5vZGUsIGRlcHRoICsgMSk7XG4gICAgICB9KTtcbiAgICAgIGlmICh2aXNpdG9yLmV4aXQpIHtcbiAgICAgICAgdmlzaXRvci5leGl0LmNhbGwob3B0VGhpc0FyZywgbm9kZSwgcGFyZW50LCBkZXB0aCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmICh0aGlzLmlzUm9vdE5vZGUpIHtcbiAgICAvLyBEb24ndCB2aXNpdCB0aGUgcm9vdCBub2RlIGl0c2VsZiwgb25seSBpdHMgY2hpbGRyZW4uXG4gICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGMpIHsgX3dhbGsoYywgbnVsbCwgMCk7IH0pO1xuICB9IGVsc2Uge1xuICAgIF93YWxrKHRoaXMsIG51bGwsIDApO1xuICB9XG59O1xuXG4vLyBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRyYWNlLlxuLy8gU2FtcGxlOlxuLy8gICAgIDEy4ouFK+KLhTLii4Uq4ouFMyDinJMgZXhwIOKHkiAgXCIxMlwiXG4vLyAgICAgMTLii4Ur4ouFMuKLhSrii4UzICAg4pyTIGFkZEV4cCAoTFIpIOKHkiAgXCIxMlwiXG4vLyAgICAgMTLii4Ur4ouFMuKLhSrii4UzICAgICAgIOKclyBhZGRFeHBfcGx1c1xuVHJhY2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzYiA9IG5ldyBjb21tb24uU3RyaW5nQnVmZmVyKCk7XG4gIHRoaXMud2FsayhmdW5jdGlvbihub2RlLCBwYXJlbnQsIGRlcHRoKSB7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm4gdGhpcy5TS0lQO1xuICAgIH1cbiAgICB2YXIgY3Rvck5hbWUgPSBub2RlLmV4cHIuY29uc3RydWN0b3IubmFtZTtcbiAgICAvLyBEb24ndCBwcmludCBhbnl0aGluZyBmb3IgQWx0IG5vZGVzLlxuICAgIGlmIChjdG9yTmFtZSA9PT0gJ0FsdCcpIHtcbiAgICAgIHJldHVybjsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgICB9XG4gICAgc2IuYXBwZW5kKGdldElucHV0RXhjZXJwdChub2RlLmlucHV0U3RyZWFtLCBub2RlLnBvcywgMTApICsgc3BhY2VzKGRlcHRoICogMiArIDEpKTtcbiAgICBzYi5hcHBlbmQoKG5vZGUuc3VjY2VlZGVkID8gQ0hFQ0tfTUFSSyA6IEJBTExPVF9YKSArICcgJyArIG5vZGUuZGlzcGxheVN0cmluZyk7XG4gICAgaWYgKG5vZGUuaXNIZWFkT2ZMZWZ0UmVjdXJzaW9uKSB7XG4gICAgICBzYi5hcHBlbmQoJyAoTFIpJyk7XG4gICAgfVxuICAgIGlmIChub2RlLnN1Y2NlZWRlZCkge1xuICAgICAgdmFyIGNvbnRlbnRzID0gYXNFc2NhcGVkU3RyaW5nKG5vZGUuc291cmNlLmNvbnRlbnRzKTtcbiAgICAgIHNiLmFwcGVuZCgnICcgKyBSSUdIVFdBUkRTX0RPVUJMRV9BUlJPVyArICcgICcpO1xuICAgICAgc2IuYXBwZW5kKHR5cGVvZiBjb250ZW50cyA9PT0gJ3N0cmluZycgPyAnXCInICsgY29udGVudHMgKyAnXCInIDogY29udGVudHMpO1xuICAgIH1cbiAgICBzYi5hcHBlbmQoJ1xcbicpO1xuICB9LmJpbmQodGhpcykpO1xuICByZXR1cm4gc2IuY29udGVudHMoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGFzc2VydCA9IHJlcXVpcmUoJy4vY29tbW9uJykuYXNzZXJ0O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gSGVscGVyc1xuXG5mdW5jdGlvbiBnZXRQcm9wKG5hbWUsIHRoaW5nLCBmbikge1xuICByZXR1cm4gZm4odGhpbmdbbmFtZV0pO1xufVxuXG5mdW5jdGlvbiBtYXBQcm9wKG5hbWUsIHRoaW5nLCBmbikge1xuICByZXR1cm4gdGhpbmdbbmFtZV0ubWFwKGZuKTtcbn1cblxuLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCB3YWxrIGEgc2luZ2xlIHByb3BlcnR5IG9mIGEgbm9kZS5cbi8vIGBkZXNjcmlwdG9yYCBpcyBhIHN0cmluZyBpbmRpY2F0aW5nIHRoZSBwcm9wZXJ0eSBuYW1lLCBvcHRpb25hbGx5IGVuZGluZ1xuLy8gd2l0aCAnW10nIChlLmcuLCAnY2hpbGRyZW5bXScpLlxuZnVuY3Rpb24gZ2V0UHJvcFdhbGtGbihkZXNjcmlwdG9yKSB7XG4gIHZhciBwYXJ0cyA9IGRlc2NyaXB0b3Iuc3BsaXQoLyA/XFxbXFxdLyk7XG4gIGlmIChwYXJ0cy5sZW5ndGggPT09IDIpIHtcbiAgICByZXR1cm4gbWFwUHJvcC5iaW5kKG51bGwsIHBhcnRzWzBdKTtcbiAgfVxuICByZXR1cm4gZ2V0UHJvcC5iaW5kKG51bGwsIGRlc2NyaXB0b3IpO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wcyh3YWxrRm5zLCB0aGluZywgZm4pIHtcbiAgcmV0dXJuIHdhbGtGbnMubWFwKGZ1bmN0aW9uKHdhbGtGbikge1xuICAgIHJldHVybiB3YWxrRm4odGhpbmcsIGZuKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFdhbGtGbihzaGFwZSkge1xuICBpZiAodHlwZW9mIHNoYXBlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBnZXRQcm9wcy5iaW5kKG51bGwsIFtnZXRQcm9wV2Fsa0ZuKHNoYXBlKV0pO1xuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc2hhcGUpKSB7XG4gICAgcmV0dXJuIGdldFByb3BzLmJpbmQobnVsbCwgc2hhcGUubWFwKGdldFByb3BXYWxrRm4pKTtcbiAgfSBlbHNlIHtcbiAgICBhc3NlcnQodHlwZW9mIHNoYXBlID09PSAnZnVuY3Rpb24nLCAnRXhwZWN0ZWQgYSBzdHJpbmcsIEFycmF5LCBvciBmdW5jdGlvbicpO1xuICAgIGFzc2VydChzaGFwZS5sZW5ndGggPT09IDIsICdFeHBlY3RlZCBhIGZ1bmN0aW9uIG9mIGFyaXR5IDIsIGdvdCAnICsgc2hhcGUubGVuZ3RoKTtcbiAgICByZXR1cm4gc2hhcGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNSZXN0cmljdGVkSWRlbnRpZmllcihzdHIpIHtcbiAgcmV0dXJuIC9eW2EtekEtWl9dWzAtOWEtekEtWl9dKiQvLnRlc3Qoc3RyKTtcbn1cblxuZnVuY3Rpb24gdHJpbShzKSB7XG4gIHJldHVybiBzLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VTaWduYXR1cmUoc2lnKSB7XG4gIHZhciBpZFBhdHRlcm4gPSAvW2EtekEtWl1bYS16QS1aMC05X10rLztcbiAgdmFyIHBhcnRzID0gc2lnLnNwbGl0KC9bKCldLykubWFwKHRyaW0pO1xuICBpZiAocGFydHMubGVuZ3RoID09PSAzICYmIHBhcnRzWzJdID09PSAnJykge1xuICAgIHZhciBuYW1lID0gcGFydHNbMF07XG4gICAgdmFyIHBhcmFtcyA9IFtdO1xuICAgIGlmIChwYXJ0c1sxXS5sZW5ndGggPiAwKSB7XG4gICAgICBwYXJhbXMgPSBwYXJ0c1sxXS5zcGxpdCgnLCcpLm1hcCh0cmltKTtcbiAgICB9XG4gICAgaWYgKGlzUmVzdHJpY3RlZElkZW50aWZpZXIobmFtZSkgJiYgcGFyYW1zLmV2ZXJ5KGlzUmVzdHJpY3RlZElkZW50aWZpZXIpKSB7XG4gICAgICByZXR1cm4ge25hbWU6IG5hbWUsIGZvcm1hbHM6IHBhcmFtc307XG4gICAgfVxuICB9XG4gIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBvcGVyYXRpb24gc2lnbmF0dXJlOiAnICsgc2lnKTtcbn1cblxuLypcbiAgQSBWaXNpdG9yRmFtaWx5IGNvbnRhaW5zIGEgc2V0IG9mIHJlY3Vyc2l2ZSBvcGVyYXRpb25zIHRoYXQgYXJlIGRlZmluZWQgb3ZlciBzb21lIGtpbmQgb2ZcbiAgdHJlZSBzdHJ1Y3R1cmUuIFRoZSBgY29uZmlnYCBwYXJhbWV0ZXIgc3BlY2lmaWVzIGhvdyB0byB3YWxrIHRoZSB0cmVlOlxuICAtICdnZXRUYWcnIGlzIGZ1bmN0aW9uIHdoaWNoLCBnaXZlbiBhIG5vZGUgaW4gdGhlIHRyZWUsIHJldHVybnMgdGhlIG5vZGUncyAndGFnJyAodHlwZSlcbiAgLSAnc2hhcGVzJyBhbiBvYmplY3QgdGhhdCBtYXBzIGZyb20gYSB0YWcgdG8gYSB2YWx1ZSB0aGF0IGRlc2NyaWJlcyBob3cgdG8gcmVjdXJzaXZlbHlcbiAgICBldmFsdWF0ZSB0aGUgb3BlcmF0aW9uIGZvciBub2RlcyBvZiB0aGF0IHR5cGUuIFRoZSB2YWx1ZSBjYW4gYmU6XG4gICAgKiBhIHN0cmluZyBpbmRpY2F0aW5nIHRoZSBwcm9wZXJ0eSBuYW1lIHRoYXQgaG9sZHMgdGhhdCBub2RlJ3Mgb25seSBjaGlsZFxuICAgICogYW4gQXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgKG9yIGFuIGVtcHR5IGFycmF5IGluZGljYXRpbmcgYSBsZWFmIHR5cGUpLCBvclxuICAgICogYSBmdW5jdGlvbiB0YWtpbmcgdHdvIGFyZ3VtZW50cyAobm9kZSwgZm4pLCBhbmQgcmV0dXJuaW5nIGFuIEFycmF5IHdoaWNoIGlzIHRoZSByZXN1bHRcbiAgICAgIG9mIGFwcGx5IGBmbmAgdG8gZWFjaCBvZiB0aGUgbm9kZSdzIGNoaWxkcmVuLlxuICovXG5mdW5jdGlvbiBWaXNpdG9yRmFtaWx5KGNvbmZpZykge1xuICB0aGlzLl9zaGFwZXMgPSBjb25maWcuc2hhcGVzO1xuICB0aGlzLl9nZXRUYWcgPSBjb25maWcuZ2V0VGFnO1xuXG4gIHRoaXMuQWRhcHRlciA9IGZ1bmN0aW9uKHRoaW5nLCBmYW1pbHkpIHtcbiAgICB0aGlzLl9hZGFwdGVlID0gdGhpbmc7XG4gICAgdGhpcy5fZmFtaWx5ID0gZmFtaWx5O1xuICB9O1xuICB0aGlzLkFkYXB0ZXIucHJvdG90eXBlLnZhbHVlT2YgPSBmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2hlZWV5IScpO1xuICB9O1xuICB0aGlzLm9wZXJhdGlvbnMgPSB7fTtcblxuICB0aGlzLl9hcml0aWVzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdGhpcy5fZ2V0Q2hpbGRyZW4gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIHZhciBzZWxmID0gdGhpcztcbiAgT2JqZWN0LmtleXModGhpcy5fc2hhcGVzKS5mb3JFYWNoKGZ1bmN0aW9uKGspIHtcbiAgICB2YXIgc2hhcGUgPSBzZWxmLl9zaGFwZXNba107XG4gICAgc2VsZi5fZ2V0Q2hpbGRyZW5ba10gPSBnZXRXYWxrRm4oc2hhcGUpO1xuXG4gICAgLy8gQSBmdW5jdGlvbiBtZWFucyB0aGUgYXJpdHkgaXNuJ3QgZml4ZWQsIHNvIGRvbid0IHB1dCBhbiBlbnRyeSBpbiB0aGUgYXJpdHkgbWFwLlxuICAgIGlmICh0eXBlb2Ygc2hhcGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHNlbGYuX2FyaXRpZXNba10gPSBBcnJheS5pc0FycmF5KHNoYXBlKSA/IHNoYXBlLmxlbmd0aCA6IDE7XG4gICAgfVxuICB9KTtcbiAgdGhpcy5fd3JhcCA9IGZ1bmN0aW9uKHRoaW5nKSB7IHJldHVybiBuZXcgc2VsZi5BZGFwdGVyKHRoaW5nLCBzZWxmKTsgfTtcbn1cblxuVmlzaXRvckZhbWlseS5wcm90b3R5cGUud3JhcCA9IGZ1bmN0aW9uKHRoaW5nKSB7XG4gIHJldHVybiB0aGlzLl93cmFwKHRoaW5nKTtcbn07XG5cblZpc2l0b3JGYW1pbHkucHJvdG90eXBlLl9jaGVja0FjdGlvbkRpY3QgPSBmdW5jdGlvbihkaWN0KSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgT2JqZWN0LmtleXMoZGljdCkuZm9yRWFjaChmdW5jdGlvbihrKSB7XG4gICAgYXNzZXJ0KGsgaW4gc2VsZi5fZ2V0Q2hpbGRyZW4sIFwiVW5yZWNvZ25pemVkIGFjdGlvbiBuYW1lICdcIiArIGsgKyBcIidcIik7XG4gICAgdmFyIGFjdGlvbiA9IGRpY3Rba107XG4gICAgYXNzZXJ0KHR5cGVvZiBhY3Rpb24gPT09ICdmdW5jdGlvbicsIFwiS2V5ICdcIiArIGsgKyBcIic6IGV4cGVjdGVkIGZ1bmN0aW9uLCBnb3QgXCIgKyBhY3Rpb24pO1xuICAgIGlmIChrIGluIHNlbGYuX2FyaXRpZXMpIHtcbiAgICAgIHZhciBleHBlY3RlZCA9IHNlbGYuX2FyaXRpZXNba107XG4gICAgICB2YXIgYWN0dWFsID0gZGljdFtrXS5sZW5ndGg7XG4gICAgICBhc3NlcnQoYWN0dWFsID09PSBleHBlY3RlZCxcbiAgICAgICAgICAgICBcIkFjdGlvbiAnXCIgKyBrICsgXCInIGhhcyB0aGUgd3JvbmcgYXJpdHk6IGV4cGVjdGVkIFwiICsgZXhwZWN0ZWQgKyAnLCBnb3QgJyArIGFjdHVhbCk7XG4gICAgfVxuICB9KTtcbn07XG5cblZpc2l0b3JGYW1pbHkucHJvdG90eXBlLmFkZE9wZXJhdGlvbiA9IGZ1bmN0aW9uKHNpZ25hdHVyZSwgYWN0aW9ucykge1xuICB2YXIgc2lnID0gcGFyc2VTaWduYXR1cmUoc2lnbmF0dXJlKTtcbiAgdmFyIG5hbWUgPSBzaWcubmFtZTtcbiAgdGhpcy5fY2hlY2tBY3Rpb25EaWN0KGFjdGlvbnMpO1xuICB0aGlzLm9wZXJhdGlvbnNbbmFtZV0gPSB7XG4gICAgbmFtZTogbmFtZSxcbiAgICBmb3JtYWxzOiBzaWcuZm9ybWFscyxcbiAgICBhY3Rpb25zOiBhY3Rpb25zXG4gIH07XG5cbiAgdmFyIGZhbWlseSA9IHRoaXM7XG4gIHRoaXMuQWRhcHRlci5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGFnID0gZmFtaWx5Ll9nZXRUYWcodGhpcy5fYWRhcHRlZSk7XG4gICAgYXNzZXJ0KHRhZyBpbiBmYW1pbHkuX2dldENoaWxkcmVuLCBcImdldFRhZyByZXR1cm5lZCB1bnJlY29nbml6ZWQgdGFnICdcIiArIHRhZyArIFwiJ1wiKTtcbiAgICBhc3NlcnQodGFnIGluIGFjdGlvbnMsIFwiTm8gYWN0aW9uIGZvciAnXCIgKyB0YWcgKyBcIicgaW4gb3BlcmF0aW9uICdcIiArIG5hbWUgKyBcIidcIik7XG5cbiAgICAvLyBDcmVhdGUgYW4gXCJhcmd1bWVudHMgb2JqZWN0XCIgZnJvbSB0aGUgYXJndW1lbnRzIHRoYXQgd2VyZSBwYXNzZWQgdG8gdGhpc1xuICAgIC8vIG9wZXJhdGlvbiAvIGF0dHJpYnV0ZS5cbiAgICB2YXIgYXJncyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3Nbc2lnLmZvcm1hbHNbaV1dID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIHZhciBvbGRBcmdzID0gdGhpcy5hcmdzO1xuICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgdmFyIGFucyA9IGFjdGlvbnNbdGFnXS5hcHBseSh0aGlzLCBmYW1pbHkuX2dldENoaWxkcmVuW3RhZ10odGhpcy5fYWRhcHRlZSwgZmFtaWx5Ll93cmFwKSk7XG4gICAgdGhpcy5hcmdzID0gb2xkQXJncztcbiAgICByZXR1cm4gYW5zO1xuICB9O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZpc2l0b3JGYW1pbHk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgZXh0ZW5kID0gcmVxdWlyZSgndXRpbC1leHRlbmQnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgU3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIEhlbHBlcnNcblxudmFyIGVzY2FwZVN0cmluZ0ZvciA9IHt9O1xuZm9yICh2YXIgYyA9IDA7IGMgPCAxMjg7IGMrKykge1xuICBlc2NhcGVTdHJpbmdGb3JbY10gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xufVxuZXNjYXBlU3RyaW5nRm9yW1wiJ1wiLmNoYXJDb2RlQXQoMCldID0gXCJcXFxcJ1wiO1xuZXNjYXBlU3RyaW5nRm9yWydcIicuY2hhckNvZGVBdCgwKV0gPSAnXFxcXFwiJztcbmVzY2FwZVN0cmluZ0ZvclsnXFxcXCcuY2hhckNvZGVBdCgwKV0gPSAnXFxcXFxcXFwnO1xuZXNjYXBlU3RyaW5nRm9yWydcXGInLmNoYXJDb2RlQXQoMCldID0gJ1xcXFxiJztcbmVzY2FwZVN0cmluZ0ZvclsnXFxmJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcZic7XG5lc2NhcGVTdHJpbmdGb3JbJ1xcbicuY2hhckNvZGVBdCgwKV0gPSAnXFxcXG4nO1xuZXNjYXBlU3RyaW5nRm9yWydcXHInLmNoYXJDb2RlQXQoMCldID0gJ1xcXFxyJztcbmVzY2FwZVN0cmluZ0ZvclsnXFx0Jy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcdCc7XG5lc2NhcGVTdHJpbmdGb3JbJ1xcdTAwMGInLmNoYXJDb2RlQXQoMCldID0gJ1xcXFx2JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydHMuYWJzdHJhY3QgPSBmdW5jdGlvbihvcHRNZXRob2ROYW1lKSB7XG4gIHZhciBtZXRob2ROYW1lID0gb3B0TWV0aG9kTmFtZSB8fCAnJztcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICd0aGlzIG1ldGhvZCAnICsgbWV0aG9kTmFtZSArICcgaXMgYWJzdHJhY3QhICcgK1xuICAgICAgJyhpdCBoYXMgbm8gaW1wbGVtZW50YXRpb24gaW4gY2xhc3MgJyArIHRoaXMuY29uc3RydWN0b3IubmFtZSArICcpJyk7XG4gIH07XG59O1xuXG5leHBvcnRzLmFzc2VydCA9IGZ1bmN0aW9uKGNvbmQsIG1lc3NhZ2UpIHtcbiAgaWYgKCFjb25kKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9XG59O1xuXG4vLyBEZWZpbmUgYSBsYXppbHktY29tcHV0ZWQsIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVkIGBwcm9wTmFtZWBcbi8vIG9uIHRoZSBvYmplY3QgYG9iamAuIGBnZXR0ZXJGbmAgd2lsbCBiZSBjYWxsZWQgdG8gY29tcHV0ZSB0aGUgdmFsdWUgdGhlXG4vLyBmaXJzdCB0aW1lIHRoZSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZC5cbmV4cG9ydHMuZGVmaW5lTGF6eVByb3BlcnR5ID0gZnVuY3Rpb24ob2JqLCBwcm9wTmFtZSwgZ2V0dGVyRm4pIHtcbiAgdmFyIG1lbW87XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3BOYW1lLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghbWVtbykge1xuICAgICAgICBtZW1vID0gZ2V0dGVyRm4uY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnRzLmNsb25lID0gZnVuY3Rpb24ob2JqKSB7XG4gIGlmIChvYmopIHtcbiAgICByZXR1cm4gZXh0ZW5kKHt9LCBvYmopO1xuICB9XG4gIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnRzLmV4dGVuZCA9IGV4dGVuZDtcblxuZXhwb3J0cy5yZXBlYXRGbiA9IGZ1bmN0aW9uKGZuLCBuKSB7XG4gIHZhciBhcnIgPSBbXTtcbiAgd2hpbGUgKG4tLSA+IDApIHtcbiAgICBhcnIucHVzaChmbigpKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufTtcblxuZXhwb3J0cy5yZXBlYXRTdHIgPSBmdW5jdGlvbihzdHIsIG4pIHtcbiAgcmV0dXJuIG5ldyBBcnJheShuICsgMSkuam9pbihzdHIpO1xufTtcblxuZXhwb3J0cy5yZXBlYXQgPSBmdW5jdGlvbih4LCBuKSB7XG4gIHJldHVybiBleHBvcnRzLnJlcGVhdEZuKGZ1bmN0aW9uKCkgeyByZXR1cm4geDsgfSwgbik7XG59O1xuXG5leHBvcnRzLmdldER1cGxpY2F0ZXMgPSBmdW5jdGlvbihhcnJheSkge1xuICB2YXIgZHVwbGljYXRlcyA9IFtdO1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBhcnJheS5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdmFyIHggPSBhcnJheVtpZHhdO1xuICAgIGlmIChhcnJheS5sYXN0SW5kZXhPZih4KSAhPT0gaWR4ICYmIGR1cGxpY2F0ZXMuaW5kZXhPZih4KSA8IDApIHtcbiAgICAgIGR1cGxpY2F0ZXMucHVzaCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGR1cGxpY2F0ZXM7XG59O1xuXG5leHBvcnRzLmNvcHlXaXRob3V0RHVwbGljYXRlcyA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gIHZhciBub0R1cGxpY2F0ZXMgPSBbXTtcbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgIGlmIChub0R1cGxpY2F0ZXMuaW5kZXhPZihlbnRyeSkgPCAwKSB7XG4gICAgICBub0R1cGxpY2F0ZXMucHVzaChlbnRyeSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG5vRHVwbGljYXRlcztcbn07XG5cbmV4cG9ydHMuaXNTeW50YWN0aWMgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB2YXIgZmlyc3RDaGFyID0gcnVsZU5hbWVbMF07XG4gIHJldHVybiBmaXJzdENoYXIgPT09IGZpcnN0Q2hhci50b1VwcGVyQ2FzZSgpO1xufTtcblxuZXhwb3J0cy5pc0xleGljYWwgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICByZXR1cm4gIWV4cG9ydHMuaXNTeW50YWN0aWMocnVsZU5hbWUpO1xufTtcblxuZXhwb3J0cy5wYWRMZWZ0ID0gZnVuY3Rpb24oc3RyLCBsZW4sIG9wdENoYXIpIHtcbiAgdmFyIGNoID0gb3B0Q2hhciB8fCAnICc7XG4gIGlmIChzdHIubGVuZ3RoIDwgbGVuKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMucmVwZWF0U3RyKGNoLCBsZW4gLSBzdHIubGVuZ3RoKSArIHN0cjtcbiAgfVxuICByZXR1cm4gc3RyO1xufTtcblxuLy8gU3RyaW5nQnVmZmVyXG5cbmV4cG9ydHMuU3RyaW5nQnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc3RyaW5ncyA9IFtdO1xufTtcblxuZXhwb3J0cy5TdHJpbmdCdWZmZXIucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKHN0cikge1xuICB0aGlzLnN0cmluZ3MucHVzaChzdHIpO1xufTtcblxuZXhwb3J0cy5TdHJpbmdCdWZmZXIucHJvdG90eXBlLmNvbnRlbnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnN0cmluZ3Muam9pbignJyk7XG59O1xuXG4vLyBDaGFyYWN0ZXIgZXNjYXBpbmcgYW5kIHVuZXNjYXBpbmdcblxuZXhwb3J0cy5lc2NhcGVDaGFyID0gZnVuY3Rpb24oYywgb3B0RGVsaW0pIHtcbiAgdmFyIGNoYXJDb2RlID0gYy5jaGFyQ29kZUF0KDApO1xuICBpZiAoKGMgPT09ICdcIicgfHwgYyA9PT0gXCInXCIpICYmIG9wdERlbGltICYmIGMgIT09IG9wdERlbGltKSB7XG4gICAgcmV0dXJuIGM7XG4gIH0gZWxzZSBpZiAoY2hhckNvZGUgPCAxMjgpIHtcbiAgICByZXR1cm4gZXNjYXBlU3RyaW5nRm9yW2NoYXJDb2RlXTtcbiAgfSBlbHNlIGlmICgxMjggPD0gY2hhckNvZGUgJiYgY2hhckNvZGUgPCAyNTYpIHtcbiAgICByZXR1cm4gJ1xcXFx4JyArIGV4cG9ydHMucGFkTGVmdChjaGFyQ29kZS50b1N0cmluZygxNiksIDIsICcwJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICdcXFxcdScgKyBleHBvcnRzLnBhZExlZnQoY2hhckNvZGUudG9TdHJpbmcoMTYpLCA0LCAnMCcpO1xuICB9XG59O1xuXG5leHBvcnRzLnVuZXNjYXBlQ2hhciA9IGZ1bmN0aW9uKHMpIHtcbiAgaWYgKHMuY2hhckF0KDApID09PSAnXFxcXCcpIHtcbiAgICBzd2l0Y2ggKHMuY2hhckF0KDEpKSB7XG4gICAgICBjYXNlICdiJzogcmV0dXJuICdcXGInO1xuICAgICAgY2FzZSAnZic6IHJldHVybiAnXFxmJztcbiAgICAgIGNhc2UgJ24nOiByZXR1cm4gJ1xcbic7XG4gICAgICBjYXNlICdyJzogcmV0dXJuICdcXHInO1xuICAgICAgY2FzZSAndCc6IHJldHVybiAnXFx0JztcbiAgICAgIGNhc2UgJ3YnOiByZXR1cm4gJ1xcdic7XG4gICAgICBjYXNlICd4JzogcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQocy5zdWJzdHJpbmcoMiwgNCksIDE2KSk7XG4gICAgICBjYXNlICd1JzogcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQocy5zdWJzdHJpbmcoMiwgNiksIDE2KSk7XG4gICAgICBkZWZhdWx0OiByZXR1cm4gcy5jaGFyQXQoMSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBzO1xuICB9XG59O1xuXG4vLyBIZWxwZXIgZm9yIHByb2R1Y2luZyBhIGRlc2NyaXB0aW9uIG9mIGFuIHVua25vd24gb2JqZWN0IGluIGEgc2FmZSB3YXkuXG4vLyBFc3BlY2lhbGx5IHVzZWZ1bCBmb3IgZXJyb3IgbWVzc2FnZXMgd2hlcmUgYW4gdW5leHBlY3RlZCB0eXBlIG9mIG9iamVjdCB3YXMgZW5jb3VudGVyZWQuXG5leHBvcnRzLnVuZXhwZWN0ZWRPYmpUb1N0cmluZyA9IGZ1bmN0aW9uKG9iaikge1xuICBpZiAob2JqID09IG51bGwpIHtcbiAgICByZXR1cm4gU3RyaW5nKG9iaik7XG4gIH1cbiAgdmFyIGJhc2VUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopO1xuICB0cnkge1xuICAgIHZhciB0eXBlTmFtZTtcbiAgICBpZiAob2JqLmNvbnN0cnVjdG9yICYmIG9iai5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICB0eXBlTmFtZSA9IG9iai5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIH0gZWxzZSBpZiAoYmFzZVRvU3RyaW5nLmluZGV4T2YoJ1tvYmplY3QgJykgPT09IDApIHtcbiAgICAgIHR5cGVOYW1lID0gYmFzZVRvU3RyaW5nLnNsaWNlKDgsIC0xKTsgIC8vIEV4dHJhY3QgZS5nLiBcIkFycmF5XCIgZnJvbSBcIltvYmplY3QgQXJyYXldXCIuXG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGVOYW1lID0gdHlwZW9mIG9iajtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVOYW1lICsgJzogJyArIEpTT04uc3RyaW5naWZ5KFN0cmluZyhvYmopKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBiYXNlVG9TdHJpbmc7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgTmFtZXNwYWNlID0gcmVxdWlyZSgnLi9OYW1lc3BhY2UnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIG9wdEludGVydmFsKSB7XG4gIHZhciBlO1xuICBpZiAob3B0SW50ZXJ2YWwpIHtcbiAgICBlID0gbmV3IEVycm9yKG9wdEludGVydmFsLmdldExpbmVBbmRDb2x1bW5NZXNzYWdlKCkgKyBtZXNzYWdlKTtcbiAgICBlLnNob3J0TWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgZS5pbnRlcnZhbCA9IG9wdEludGVydmFsO1xuICB9IGVsc2Uge1xuICAgIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH1cbiAgcmV0dXJuIGU7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIGVycm9ycyBhYm91dCBpbnRlcnZhbHMgLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gaW50ZXJ2YWxTb3VyY2VzRG9udE1hdGNoKCkge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXCJJbnRlcnZhbCBzb3VyY2VzIGRvbid0IG1hdGNoXCIpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBlcnJvcnMgYWJvdXQgZ3JhbW1hcnMgLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gR3JhbW1hciBzeW50YXggZXJyb3JcblxuZnVuY3Rpb24gZ3JhbW1hclN5bnRheEVycm9yKG1hdGNoRmFpbHVyZSkge1xuICB2YXIgZSA9IG5ldyBFcnJvcigpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgJ21lc3NhZ2UnLCB7Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1hdGNoRmFpbHVyZS5tZXNzYWdlOyB9fSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCAnc2hvcnRNZXNzYWdlJywge2dldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICdFeHBlY3RlZCAnICsgbWF0Y2hGYWlsdXJlLmdldEV4cGVjdGVkVGV4dCgpO1xuICB9fSk7XG4gIGUuaW50ZXJ2YWwgPSBtYXRjaEZhaWx1cmUuZ2V0SW50ZXJ2YWwoKTtcbiAgcmV0dXJuIGU7XG59XG5cbi8vIFVuZGVjbGFyZWQgZ3JhbW1hclxuXG5mdW5jdGlvbiB1bmRlY2xhcmVkR3JhbW1hcihncmFtbWFyTmFtZSwgbmFtZXNwYWNlLCBpbnRlcnZhbCkge1xuICB2YXIgbWVzc2FnZSA9IG5hbWVzcGFjZSA/XG4gICAgICAnR3JhbW1hciAnICsgZ3JhbW1hck5hbWUgKyAnIGlzIG5vdCBkZWNsYXJlZCBpbiBuYW1lc3BhY2UgJyArIE5hbWVzcGFjZS50b1N0cmluZyhuYW1lc3BhY2UpIDpcbiAgICAgICdVbmRlY2xhcmVkIGdyYW1tYXIgJyArIGdyYW1tYXJOYW1lO1xuICByZXR1cm4gY3JlYXRlRXJyb3IobWVzc2FnZSwgaW50ZXJ2YWwpO1xufVxuXG4vLyBEdXBsaWNhdGUgZ3JhbW1hciBkZWNsYXJhdGlvblxuXG5mdW5jdGlvbiBkdXBsaWNhdGVHcmFtbWFyRGVjbGFyYXRpb24oZ3JhbW1hciwgbmFtZXNwYWNlKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcignR3JhbW1hciAnICsgZ3JhbW1hci5uYW1lICsgJyBpcyBhbHJlYWR5IGRlY2xhcmVkIGluIHRoaXMgbmFtZXNwYWNlJyk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIHJ1bGVzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFVuZGVjbGFyZWQgcnVsZVxuXG5mdW5jdGlvbiB1bmRlY2xhcmVkUnVsZShydWxlTmFtZSwgZ3JhbW1hck5hbWUsIG9wdEludGVydmFsKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdSdWxlICcgKyBydWxlTmFtZSArICcgaXMgbm90IGRlY2xhcmVkIGluIGdyYW1tYXIgJyArIGdyYW1tYXJOYW1lLFxuICAgICAgb3B0SW50ZXJ2YWwpO1xufVxuXG4vLyBDYW5ub3Qgb3ZlcnJpZGUgdW5kZWNsYXJlZCBydWxlXG5cbmZ1bmN0aW9uIGNhbm5vdE92ZXJyaWRlVW5kZWNsYXJlZFJ1bGUocnVsZU5hbWUsIGdyYW1tYXJOYW1lLCBvcHRTb3VyY2UpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKFxuICAgICAgJ0Nhbm5vdCBvdmVycmlkZSBydWxlICcgKyBydWxlTmFtZSArICcgYmVjYXVzZSBpdCBpcyBub3QgZGVjbGFyZWQgaW4gJyArIGdyYW1tYXJOYW1lLFxuICAgICAgb3B0U291cmNlKTtcbn1cblxuLy8gQ2Fubm90IGV4dGVuZCB1bmRlY2xhcmVkIHJ1bGVcblxuZnVuY3Rpb24gY2Fubm90RXh0ZW5kVW5kZWNsYXJlZFJ1bGUocnVsZU5hbWUsIGdyYW1tYXJOYW1lLCBvcHRTb3VyY2UpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKFxuICAgICAgJ0Nhbm5vdCBleHRlbmQgcnVsZSAnICsgcnVsZU5hbWUgKyAnIGJlY2F1c2UgaXQgaXMgbm90IGRlY2xhcmVkIGluICcgKyBncmFtbWFyTmFtZSxcbiAgICAgIG9wdFNvdXJjZSk7XG59XG5cbi8vIER1cGxpY2F0ZSBydWxlIGRlY2xhcmF0aW9uXG5cbmZ1bmN0aW9uIGR1cGxpY2F0ZVJ1bGVEZWNsYXJhdGlvbihydWxlTmFtZSwgZ3JhbW1hck5hbWUsIGRlY2xHcmFtbWFyTmFtZSwgYm9keSwgb3B0U291cmNlKSB7XG4gIHZhciBtZXNzYWdlID0gXCJEdXBsaWNhdGUgZGVjbGFyYXRpb24gZm9yIHJ1bGUgJ1wiICsgcnVsZU5hbWUgK1xuICAgICAgXCInIGluIGdyYW1tYXIgJ1wiICsgZ3JhbW1hck5hbWUgKyBcIidcIjtcbiAgaWYgKGdyYW1tYXJOYW1lICE9PSBkZWNsR3JhbW1hck5hbWUpIHtcbiAgICBtZXNzYWdlICs9IFwiIChvcmlnaW5hbGx5IGRlY2xhcmVkIGluICdcIiArIGRlY2xHcmFtbWFyTmFtZSArIFwiJylcIjtcbiAgfVxuICByZXR1cm4gY3JlYXRlRXJyb3IobWVzc2FnZSwgb3B0U291cmNlKTtcbn1cblxuLy8gV3JvbmcgbnVtYmVyIG9mIHBhcmFtZXRlcnNcblxuZnVuY3Rpb24gd3JvbmdOdW1iZXJPZlBhcmFtZXRlcnMocnVsZU5hbWUsIGV4cGVjdGVkLCBhY3R1YWwsIGJvZHksIHNvdXJjZSkge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXG4gICAgICAnV3JvbmcgbnVtYmVyIG9mIHBhcmFtZXRlcnMgZm9yIHJ1bGUgJyArIHJ1bGVOYW1lICtcbiAgICAgICAgICAnIChleHBlY3RlZCAnICsgZXhwZWN0ZWQgKyAnLCBnb3QgJyArIGFjdHVhbCArICcpJyxcbiAgICAgIHNvdXJjZSk7XG59XG5cbi8vIFdyb25nIG51bWJlciBvZiBhcmd1bWVudHNcblxuZnVuY3Rpb24gd3JvbmdOdW1iZXJPZkFyZ3VtZW50cyhydWxlTmFtZSwgZXhwZWN0ZWQsIGFjdHVhbCwgZXhwcikge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXG4gICAgICAnV3JvbmcgbnVtYmVyIG9mIGFyZ3VtZW50cyBmb3IgcnVsZSAnICsgcnVsZU5hbWUgK1xuICAgICAgICAgICcgKGV4cGVjdGVkICcgKyBleHBlY3RlZCArICcsIGdvdCAnICsgYWN0dWFsICsgJyknLFxuICAgICAgZXhwci5zb3VyY2UpO1xufVxuXG4vLyBEdXBsaWNhdGUgcGFyYW1ldGVyIG5hbWVzXG5cbmZ1bmN0aW9uIGR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzKHJ1bGVOYW1lLCBkdXBsaWNhdGVzLCBib2R5LCBzb3VyY2UpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKFxuICAgICAgJ0R1cGxpY2F0ZSBwYXJhbWV0ZXIgbmFtZXMgaW4gcnVsZSAnICsgcnVsZU5hbWUgKyAnOiAnICsgZHVwbGljYXRlcy5qb2luKCcsJyksXG4gICAgICBzb3VyY2UpO1xufVxuXG4vLyBJbnZhbGlkIHBhcmFtZXRlciBleHByZXNzaW9uXG5cbmZ1bmN0aW9uIGludmFsaWRQYXJhbWV0ZXIocnVsZU5hbWUsIGV4cHIpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKFxuICAgICAgJ0ludmFsaWQgcGFyYW1ldGVyIHRvIHJ1bGUgJyArIHJ1bGVOYW1lICsgJzogJyArIGV4cHIgKyAnIGhhcyBhcml0eSAnICsgZXhwci5nZXRBcml0eSgpICtcbiAgICAgICAgICcsIGJ1dCBwYXJhbWV0ZXIgZXhwcmVzc2lvbnMgbXVzdCBoYXZlIGFyaXR5IDEnLFxuICAgICAgZXhwci5zb3VyY2UpO1xufVxuXG4vLyBBcHBsaWNhdGlvbiBvZiBzeW50YWN0aWMgcnVsZSBmcm9tIGxleGljYWwgcnVsZVxuXG5mdW5jdGlvbiBhcHBsaWNhdGlvbk9mU3ludGFjdGljUnVsZUZyb21MZXhpY2FsQ29udGV4dChydWxlTmFtZSwgYXBwbHlFeHByKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdDYW5ub3QgYXBwbHkgc3ludGFjdGljIHJ1bGUgJyArIHJ1bGVOYW1lICsgJyBmcm9tIGhlcmUgKGluc2lkZSBhIGxleGljYWwgY29udGV4dCknLFxuICAgICAgYXBwbHlFeHByLnNvdXJjZSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tIEtsZWVuZSBvcGVyYXRvcnMgLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24ga2xlZW5lRXhwckhhc051bGxhYmxlT3BlcmFuZChrbGVlbmVFeHByKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdOdWxsYWJsZSBleHByZXNzaW9uICcgKyBrbGVlbmVFeHByLmV4cHIuc291cmNlLmNvbnRlbnRzICsgXCIgaXMgbm90IGFsbG93ZWQgaW5zaWRlICdcIiArXG4gICAgICAgICAga2xlZW5lRXhwci5vcGVyYXRvciArIFwiJyAocG9zc2libGUgaW5maW5pdGUgbG9vcClcIixcbiAgICAgIGtsZWVuZUV4cHIuZXhwci5zb3VyY2UpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBhcml0eSAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBpbmNvbnNpc3RlbnRBcml0eShydWxlTmFtZSwgZXhwZWN0ZWQsIGFjdHVhbCwgZXhwcikge1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXG4gICAgICAnUnVsZSAnICsgcnVsZU5hbWUgKyAnIGludm9sdmVzIGFuIGFsdGVybmF0aW9uIHdoaWNoIGhhcyBpbmNvbnNpc3RlbnQgYXJpdHkgJyArXG4gICAgICAgICAgJyhleHBlY3RlZCAnICsgZXhwZWN0ZWQgKyAnLCBnb3QgJyArIGFjdHVhbCArICcpJyxcbiAgICAgIGV4cHIuc291cmNlKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gcHJvcGVydGllcyAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBkdXBsaWNhdGVQcm9wZXJ0eU5hbWVzKGR1cGxpY2F0ZXMpIHtcbiAgcmV0dXJuIGNyZWF0ZUVycm9yKCdPYmplY3QgcGF0dGVybiBoYXMgZHVwbGljYXRlIHByb3BlcnR5IG5hbWVzOiAnICsgZHVwbGljYXRlcy5qb2luKCcsICcpKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gY29uc3RydWN0b3JzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGludmFsaWRDb25zdHJ1Y3RvckNhbGwoZ3JhbW1hciwgY3Rvck5hbWUsIGNoaWxkcmVuKSB7XG4gIHJldHVybiBjcmVhdGVFcnJvcihcbiAgICAgICdBdHRlbXB0IHRvIGludm9rZSBjb25zdHJ1Y3RvciAnICsgY3Rvck5hbWUgKyAnIHdpdGggaW52YWxpZCBvciB1bmV4cGVjdGVkIGFyZ3VtZW50cycpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBjb252ZW5pZW5jZSAtLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBtdWx0aXBsZUVycm9ycyhlcnJvcnMpIHtcbiAgdmFyIG1lc3NhZ2VzID0gZXJyb3JzLm1hcChmdW5jdGlvbihlKSB7IHJldHVybiBlLm1lc3NhZ2U7IH0pO1xuICByZXR1cm4gY3JlYXRlRXJyb3IoXG4gICAgICBbJ0Vycm9yczonXS5jb25jYXQobWVzc2FnZXMpLmpvaW4oJ1xcbi0gJyksXG4gICAgICBlcnJvcnNbMF0uaW50ZXJ2YWwpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFwcGxpY2F0aW9uT2ZTeW50YWN0aWNSdWxlRnJvbUxleGljYWxDb250ZXh0OiBhcHBsaWNhdGlvbk9mU3ludGFjdGljUnVsZUZyb21MZXhpY2FsQ29udGV4dCxcbiAgY2Fubm90RXh0ZW5kVW5kZWNsYXJlZFJ1bGU6IGNhbm5vdEV4dGVuZFVuZGVjbGFyZWRSdWxlLFxuICBjYW5ub3RPdmVycmlkZVVuZGVjbGFyZWRSdWxlOiBjYW5ub3RPdmVycmlkZVVuZGVjbGFyZWRSdWxlLFxuICBkdXBsaWNhdGVHcmFtbWFyRGVjbGFyYXRpb246IGR1cGxpY2F0ZUdyYW1tYXJEZWNsYXJhdGlvbixcbiAgZHVwbGljYXRlUGFyYW1ldGVyTmFtZXM6IGR1cGxpY2F0ZVBhcmFtZXRlck5hbWVzLFxuICBkdXBsaWNhdGVQcm9wZXJ0eU5hbWVzOiBkdXBsaWNhdGVQcm9wZXJ0eU5hbWVzLFxuICBkdXBsaWNhdGVSdWxlRGVjbGFyYXRpb246IGR1cGxpY2F0ZVJ1bGVEZWNsYXJhdGlvbixcbiAgaW5jb25zaXN0ZW50QXJpdHk6IGluY29uc2lzdGVudEFyaXR5LFxuICBpbnRlcnZhbFNvdXJjZXNEb250TWF0Y2g6IGludGVydmFsU291cmNlc0RvbnRNYXRjaCxcbiAgaW52YWxpZENvbnN0cnVjdG9yQ2FsbDogaW52YWxpZENvbnN0cnVjdG9yQ2FsbCxcbiAgaW52YWxpZFBhcmFtZXRlcjogaW52YWxpZFBhcmFtZXRlcixcbiAgZ3JhbW1hclN5bnRheEVycm9yOiBncmFtbWFyU3ludGF4RXJyb3IsXG4gIGtsZWVuZUV4cHJIYXNOdWxsYWJsZU9wZXJhbmQ6IGtsZWVuZUV4cHJIYXNOdWxsYWJsZU9wZXJhbmQsXG4gIHVuZGVjbGFyZWRHcmFtbWFyOiB1bmRlY2xhcmVkR3JhbW1hcixcbiAgdW5kZWNsYXJlZFJ1bGU6IHVuZGVjbGFyZWRSdWxlLFxuICB3cm9uZ051bWJlck9mQXJndW1lbnRzOiB3cm9uZ051bWJlck9mQXJndW1lbnRzLFxuICB3cm9uZ051bWJlck9mUGFyYW1ldGVyczogd3JvbmdOdW1iZXJPZlBhcmFtZXRlcnMsXG5cbiAgdGhyb3dFcnJvcnM6IGZ1bmN0aW9uKGVycm9ycykge1xuICAgIGlmIChlcnJvcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aHJvdyBlcnJvcnNbMF07XG4gICAgfVxuICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbXVsdGlwbGVFcnJvcnMoZXJyb3JzKTtcbiAgICB9XG4gIH1cbn07XG4iLCIvKiBnbG9iYWwgZG9jdW1lbnQsIFhNTEh0dHBSZXF1ZXN0ICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBCdWlsZGVyID0gcmVxdWlyZSgnLi9CdWlsZGVyJyk7XG52YXIgR3JhbW1hciA9IHJlcXVpcmUoJy4vR3JhbW1hcicpO1xudmFyIE5hbWVzcGFjZSA9IHJlcXVpcmUoJy4vTmFtZXNwYWNlJyk7XG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFRoZSBtZXRhZ3JhbW1hciwgaS5lLiB0aGUgZ3JhbW1hciBmb3IgT2htIGdyYW1tYXJzLiBJbml0aWFsaXplZCBhdCB0aGVcbi8vIGJvdHRvbSBvZiB0aGlzIGZpbGUgYmVjYXVzZSBsb2FkaW5nIHRoZSBncmFtbWFyIHJlcXVpcmVzIE9obSBpdHNlbGYuXG52YXIgb2htR3JhbW1hcjtcblxuLy8gQW4gb2JqZWN0IHdoaWNoIG1ha2VzIGl0IHBvc3NpYmxlIHRvIHN0dWIgb3V0IHRoZSBkb2N1bWVudCBBUEkgZm9yIHRlc3RpbmcuXG52YXIgZG9jdW1lbnRJbnRlcmZhY2UgPSB7XG4gIHF1ZXJ5U2VsZWN0b3I6IGZ1bmN0aW9uKHNlbCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWwpOyB9LFxuICBxdWVyeVNlbGVjdG9yQWxsOiBmdW5jdGlvbihzZWwpIHsgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsKTsgfVxufTtcblxuLy8gQ2hlY2sgaWYgYG9iamAgaXMgYSBET00gZWxlbWVudC5cbmZ1bmN0aW9uIGlzRWxlbWVudChvYmopIHtcbiAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT09IDEpO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gdm9pZCAwOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby12b2lkXG59XG5cbnZhciBNQVhfQVJSQVlfSU5ERVggPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuXG5mdW5jdGlvbiBpc0FycmF5TGlrZShvYmopIHtcbiAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsZW5ndGggPSBvYmoubGVuZ3RoO1xuICByZXR1cm4gdHlwZW9mIGxlbmd0aCA9PT0gJ251bWJlcicgJiYgbGVuZ3RoID49IDAgJiYgbGVuZ3RoIDw9IE1BWF9BUlJBWV9JTkRFWDtcbn1cblxuLy8gVE9ETzoganVzdCB1c2UgdGhlIGpRdWVyeSB0aGluZ1xuZnVuY3Rpb24gbG9hZCh1cmwpIHtcbiAgdmFyIHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICByZXEub3BlbignR0VUJywgdXJsLCBmYWxzZSk7XG4gIHRyeSB7XG4gICAgcmVxLnNlbmQoKTtcbiAgICBpZiAocmVxLnN0YXR1cyA9PT0gMCB8fCByZXEuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIHJldHVybiByZXEucmVzcG9uc2VUZXh0O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge31cbiAgdGhyb3cgbmV3IEVycm9yKCd1bmFibGUgdG8gbG9hZCB1cmwgJyArIHVybCk7XG59XG5cbi8vIFJldHVybnMgYSBHcmFtbWFyIGluc3RhbmNlIChpLmUuLCBhbiBvYmplY3Qgd2l0aCBhIGBtYXRjaGAgbWV0aG9kKSBmb3Jcbi8vIGB0cmVlYCwgd2hpY2ggaXMgdGhlIGNvbmNyZXRlIHN5bnRheCB0cmVlIG9mIGEgdXNlci13cml0dGVuIGdyYW1tYXIuXG4vLyBUaGUgZ3JhbW1hciB3aWxsIGJlIGFzc2lnbmVkIGludG8gYG5hbWVzcGFjZWAgdW5kZXIgdGhlIG5hbWUgb2YgdGhlIGdyYW1tYXJcbi8vIGFzIHNwZWNpZmllZCBpbiB0aGUgc291cmNlLlxuZnVuY3Rpb24gYnVpbGRHcmFtbWFyKG1hdGNoLCBuYW1lc3BhY2UsIG9wdE9obUdyYW1tYXJGb3JUZXN0aW5nKSB7XG4gIHZhciBidWlsZGVyID0gbmV3IEJ1aWxkZXIoKTtcbiAgdmFyIGRlY2w7XG4gIHZhciBjdXJyZW50UnVsZU5hbWU7XG4gIHZhciBjdXJyZW50UnVsZUZvcm1hbHM7XG4gIHZhciBvdmVycmlkaW5nID0gZmFsc2U7XG4gIHZhciBtZXRhR3JhbW1hciA9IG9wdE9obUdyYW1tYXJGb3JUZXN0aW5nIHx8IG9obUdyYW1tYXI7XG5cbiAgLy8gQSB2aXNpdG9yIHRoYXQgcHJvZHVjZXMgYSBHcmFtbWFyIGluc3RhbmNlIGZyb20gdGhlIENTVC5cbiAgdmFyIGhlbHBlcnMgPSBtZXRhR3JhbW1hci5jcmVhdGVTZW1hbnRpY3MoKS5hZGRPcGVyYXRpb24oJ3Zpc2l0Jywge1xuICAgIEdyYW1tYXI6IGZ1bmN0aW9uKG4sIHMsIG9wZW4sIHJzLCBjbG9zZSkge1xuICAgICAgdmFyIGdyYW1tYXJOYW1lID0gbi52aXNpdCgpO1xuICAgICAgZGVjbCA9IGJ1aWxkZXIubmV3R3JhbW1hcihncmFtbWFyTmFtZSwgbmFtZXNwYWNlKTtcbiAgICAgIHMudmlzaXQoKTtcbiAgICAgIHJzLnZpc2l0KCk7XG4gICAgICB2YXIgZyA9IGRlY2wuYnVpbGQoKTtcbiAgICAgIGcuc291cmNlID0gdGhpcy5zb3VyY2UudHJpbW1lZCgpO1xuICAgICAgaWYgKGdyYW1tYXJOYW1lIGluIG5hbWVzcGFjZSkge1xuICAgICAgICB0aHJvdyBlcnJvcnMuZHVwbGljYXRlR3JhbW1hckRlY2xhcmF0aW9uKGcsIG5hbWVzcGFjZSk7XG4gICAgICB9XG4gICAgICBuYW1lc3BhY2VbZ3JhbW1hck5hbWVdID0gZztcbiAgICAgIHJldHVybiBnO1xuICAgIH0sXG5cbiAgICBTdXBlckdyYW1tYXI6IGZ1bmN0aW9uKF8sIG4pIHtcbiAgICAgIHZhciBzdXBlckdyYW1tYXJOYW1lID0gbi52aXNpdCgpO1xuICAgICAgaWYgKHN1cGVyR3JhbW1hck5hbWUgPT09ICdudWxsJykge1xuICAgICAgICBkZWNsLndpdGhTdXBlckdyYW1tYXIobnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIW5hbWVzcGFjZSB8fCAhKHN1cGVyR3JhbW1hck5hbWUgaW4gbmFtZXNwYWNlKSkge1xuICAgICAgICAgIHRocm93IGVycm9ycy51bmRlY2xhcmVkR3JhbW1hcihzdXBlckdyYW1tYXJOYW1lLCBuYW1lc3BhY2UsIG4uc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICBkZWNsLndpdGhTdXBlckdyYW1tYXIobmFtZXNwYWNlW3N1cGVyR3JhbW1hck5hbWVdKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgUnVsZV9kZWZpbmU6IGZ1bmN0aW9uKG4sIGZzLCBkLCBfLCBiKSB7XG4gICAgICBjdXJyZW50UnVsZU5hbWUgPSBuLnZpc2l0KCk7XG4gICAgICBjdXJyZW50UnVsZUZvcm1hbHMgPSBmcy52aXNpdCgpWzBdIHx8IFtdO1xuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gZGVmYXVsdCBzdGFydCBydWxlIHlldCwgc2V0IGl0IG5vdy4gVGhpcyBtdXN0IGJlIGRvbmUgYmVmb3JlIHZpc2l0aW5nXG4gICAgICAvLyB0aGUgYm9keSwgYmVjYXVzZSBpdCBtaWdodCBjb250YWluIGFuIGlubGluZSBydWxlIGRlZmluaXRpb24uXG4gICAgICBpZiAoIWRlY2wuZGVmYXVsdFN0YXJ0UnVsZSAmJiBkZWNsLmVuc3VyZVN1cGVyR3JhbW1hcigpICE9PSBHcmFtbWFyLlByb3RvQnVpbHRJblJ1bGVzKSB7XG4gICAgICAgIGRlY2wud2l0aERlZmF1bHRTdGFydFJ1bGUoY3VycmVudFJ1bGVOYW1lKTtcbiAgICAgIH1cbiAgICAgIHZhciBib2R5ID0gYi52aXNpdCgpO1xuICAgICAgdmFyIGRlc2NyaXB0aW9uID0gZC52aXNpdCgpWzBdO1xuICAgICAgdmFyIHNvdXJjZSA9IHRoaXMuc291cmNlLnRyaW1tZWQoKTtcbiAgICAgIHJldHVybiBkZWNsLmRlZmluZShjdXJyZW50UnVsZU5hbWUsIGN1cnJlbnRSdWxlRm9ybWFscywgYm9keSwgZGVzY3JpcHRpb24sIHNvdXJjZSk7XG4gICAgfSxcbiAgICBSdWxlX292ZXJyaWRlOiBmdW5jdGlvbihuLCBmcywgXywgYikge1xuICAgICAgY3VycmVudFJ1bGVOYW1lID0gbi52aXNpdCgpO1xuICAgICAgY3VycmVudFJ1bGVGb3JtYWxzID0gZnMudmlzaXQoKVswXSB8fCBbXTtcbiAgICAgIG92ZXJyaWRpbmcgPSB0cnVlO1xuICAgICAgdmFyIGJvZHkgPSBiLnZpc2l0KCk7XG4gICAgICB2YXIgc291cmNlID0gdGhpcy5zb3VyY2UudHJpbW1lZCgpO1xuICAgICAgdmFyIGFucyA9IGRlY2wub3ZlcnJpZGUoY3VycmVudFJ1bGVOYW1lLCBjdXJyZW50UnVsZUZvcm1hbHMsIGJvZHksIG51bGwsIHNvdXJjZSk7XG4gICAgICBvdmVycmlkaW5nID0gZmFsc2U7XG4gICAgICByZXR1cm4gYW5zO1xuICAgIH0sXG4gICAgUnVsZV9leHRlbmQ6IGZ1bmN0aW9uKG4sIGZzLCBfLCBiKSB7XG4gICAgICBjdXJyZW50UnVsZU5hbWUgPSBuLnZpc2l0KCk7XG4gICAgICBjdXJyZW50UnVsZUZvcm1hbHMgPSBmcy52aXNpdCgpWzBdIHx8IFtdO1xuICAgICAgdmFyIGJvZHkgPSBiLnZpc2l0KCk7XG4gICAgICB2YXIgc291cmNlID0gdGhpcy5zb3VyY2UudHJpbW1lZCgpO1xuICAgICAgdmFyIGFucyA9IGRlY2wuZXh0ZW5kKGN1cnJlbnRSdWxlTmFtZSwgY3VycmVudFJ1bGVGb3JtYWxzLCBib2R5LCBudWxsLCBzb3VyY2UpO1xuICAgICAgcmV0dXJuIGFucztcbiAgICB9LFxuICAgIFJ1bGVCb2R5OiBmdW5jdGlvbihfLCB0ZXJtcykge1xuICAgICAgdmFyIGFyZ3MgPSB0ZXJtcy52aXNpdCgpO1xuICAgICAgcmV0dXJuIGJ1aWxkZXIuYWx0LmFwcGx5KGJ1aWxkZXIsIGFyZ3MpLndpdGhTb3VyY2UodGhpcy5zb3VyY2UpO1xuICAgIH0sXG5cbiAgICBGb3JtYWxzOiBmdW5jdGlvbihvcG9pbnR5LCBmcywgY3BvaW50eSkge1xuICAgICAgcmV0dXJuIGZzLnZpc2l0KCk7XG4gICAgfSxcblxuICAgIFBhcmFtczogZnVuY3Rpb24ob3BvaW50eSwgcHMsIGNwb2ludHkpIHtcbiAgICAgIHJldHVybiBwcy52aXNpdCgpO1xuICAgIH0sXG5cbiAgICBBbHQ6IGZ1bmN0aW9uKHNlcXMpIHtcbiAgICAgIHZhciBhcmdzID0gc2Vxcy52aXNpdCgpO1xuICAgICAgcmV0dXJuIGJ1aWxkZXIuYWx0LmFwcGx5KGJ1aWxkZXIsIGFyZ3MpLndpdGhTb3VyY2UodGhpcy5zb3VyY2UpO1xuICAgIH0sXG5cbiAgICBUb3BMZXZlbFRlcm1faW5saW5lOiBmdW5jdGlvbihiLCBuKSB7XG4gICAgICB2YXIgaW5saW5lUnVsZU5hbWUgPSBjdXJyZW50UnVsZU5hbWUgKyAnXycgKyBuLnZpc2l0KCk7XG4gICAgICB2YXIgYm9keSA9IGIudmlzaXQoKTtcbiAgICAgIHZhciBzb3VyY2UgPSB0aGlzLnNvdXJjZS50cmltbWVkKCk7XG4gICAgICB2YXIgaXNOZXdSdWxlRGVjbGFyYXRpb24gPVxuICAgICAgICAgICEoZGVjbC5zdXBlckdyYW1tYXIgJiYgZGVjbC5zdXBlckdyYW1tYXIucnVsZXNbaW5saW5lUnVsZU5hbWVdKTtcbiAgICAgIGlmIChvdmVycmlkaW5nICYmICFpc05ld1J1bGVEZWNsYXJhdGlvbikge1xuICAgICAgICBkZWNsLm92ZXJyaWRlKGlubGluZVJ1bGVOYW1lLCBjdXJyZW50UnVsZUZvcm1hbHMsIGJvZHksIG51bGwsIHNvdXJjZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWNsLmRlZmluZShpbmxpbmVSdWxlTmFtZSwgY3VycmVudFJ1bGVGb3JtYWxzLCBib2R5LCBudWxsLCBzb3VyY2UpO1xuICAgICAgfVxuICAgICAgdmFyIHBhcmFtcyA9IGN1cnJlbnRSdWxlRm9ybWFscy5tYXAoZnVuY3Rpb24oZm9ybWFsKSB7IHJldHVybiBidWlsZGVyLmFwcChmb3JtYWwpOyB9KTtcbiAgICAgIHJldHVybiBidWlsZGVyLmFwcChpbmxpbmVSdWxlTmFtZSwgcGFyYW1zKS53aXRoU291cmNlKGJvZHkuc291cmNlKTtcbiAgICB9LFxuXG4gICAgU2VxOiBmdW5jdGlvbihleHByKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5zZXEuYXBwbHkoYnVpbGRlciwgZXhwci52aXNpdCgpKS53aXRoU291cmNlKHRoaXMuc291cmNlKTtcbiAgICB9LFxuXG4gICAgSXRlcl9zdGFyOiBmdW5jdGlvbih4LCBfKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5zdGFyKHgudmlzaXQoKSkud2l0aFNvdXJjZSh0aGlzLnNvdXJjZSk7XG4gICAgfSxcbiAgICBJdGVyX3BsdXM6IGZ1bmN0aW9uKHgsIF8pIHtcbiAgICAgIHJldHVybiBidWlsZGVyLnBsdXMoeC52aXNpdCgpKS53aXRoU291cmNlKHRoaXMuc291cmNlKTtcbiAgICB9LFxuICAgIEl0ZXJfb3B0OiBmdW5jdGlvbih4LCBfKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5vcHQoeC52aXNpdCgpKS53aXRoU291cmNlKHRoaXMuc291cmNlKTtcbiAgICB9LFxuXG4gICAgUHJlZF9ub3Q6IGZ1bmN0aW9uKF8sIHgpIHtcbiAgICAgIHJldHVybiBidWlsZGVyLm5vdCh4LnZpc2l0KCkpLndpdGhTb3VyY2UodGhpcy5zb3VyY2UpO1xuICAgIH0sXG4gICAgUHJlZF9sb29rYWhlYWQ6IGZ1bmN0aW9uKF8sIHgpIHtcbiAgICAgIHJldHVybiBidWlsZGVyLmxvb2thaGVhZCh4LnZpc2l0KCkpLndpdGhTb3VyY2UodGhpcy5zb3VyY2UpO1xuICAgIH0sXG5cbiAgICBMZXhfbGV4OiBmdW5jdGlvbihfLCB4KSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5sZXgoeC52aXNpdCgpKS53aXRoU291cmNlKHRoaXMuc291cmNlKTtcbiAgICB9LFxuXG4gICAgQmFzZV9hcHBsaWNhdGlvbjogZnVuY3Rpb24ocnVsZSwgcHMpIHtcbiAgICAgIHJldHVybiBidWlsZGVyLmFwcChydWxlLnZpc2l0KCksIHBzLnZpc2l0KClbMF0gfHwgW10pLndpdGhTb3VyY2UodGhpcy5zb3VyY2UpO1xuICAgIH0sXG4gICAgQmFzZV9yYW5nZTogZnVuY3Rpb24oZnJvbSwgXywgdG8pIHtcbiAgICAgIHJldHVybiBidWlsZGVyLnJhbmdlKGZyb20udmlzaXQoKSwgdG8udmlzaXQoKSkud2l0aFNvdXJjZSh0aGlzLnNvdXJjZSk7XG4gICAgfSxcbiAgICBCYXNlX3Rlcm1pbmFsOiBmdW5jdGlvbihleHByKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci50ZXJtaW5hbChleHByLnZpc2l0KCkpLndpdGhTb3VyY2UodGhpcy5zb3VyY2UpO1xuICAgIH0sXG4gICAgQmFzZV9wYXJlbjogZnVuY3Rpb24ob3BlbiwgeCwgY2xvc2UpIHtcbiAgICAgIHJldHVybiB4LnZpc2l0KCk7XG4gICAgfSxcblxuICAgIHJ1bGVEZXNjcjogZnVuY3Rpb24ob3BlbiwgdCwgY2xvc2UpIHtcbiAgICAgIHJldHVybiB0LnZpc2l0KCk7XG4gICAgfSxcbiAgICBydWxlRGVzY3JUZXh0OiBmdW5jdGlvbihfKSB7XG4gICAgICByZXR1cm4gdGhpcy5zb3VyY2VTdHJpbmcudHJpbSgpO1xuICAgIH0sXG5cbiAgICBjYXNlTmFtZTogZnVuY3Rpb24oXywgc3BhY2UxLCBuLCBzcGFjZTIsIGVuZCkge1xuICAgICAgcmV0dXJuIG4udmlzaXQoKTtcbiAgICB9LFxuXG4gICAgbmFtZTogZnVuY3Rpb24oZmlyc3QsIHJlc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnNvdXJjZVN0cmluZztcbiAgICB9LFxuICAgIG5hbWVGaXJzdDogZnVuY3Rpb24oZXhwcikge30sXG4gICAgbmFtZVJlc3Q6IGZ1bmN0aW9uKGV4cHIpIHt9LFxuXG4gICAgdGVybWluYWw6IGZ1bmN0aW9uKG9wZW4sIGNzLCBjbG9zZSkge1xuICAgICAgcmV0dXJuIGNzLnZpc2l0KCkubWFwKGZ1bmN0aW9uKGMpIHsgcmV0dXJuIGNvbW1vbi51bmVzY2FwZUNoYXIoYyk7IH0pLmpvaW4oJycpO1xuICAgIH0sXG5cbiAgICB0ZXJtaW5hbENoYXI6IGZ1bmN0aW9uKF8pIHtcbiAgICAgIHJldHVybiB0aGlzLnNvdXJjZVN0cmluZztcbiAgICB9LFxuXG4gICAgZXNjYXBlQ2hhcjogZnVuY3Rpb24oXykge1xuICAgICAgcmV0dXJuIHRoaXMuc291cmNlU3RyaW5nO1xuICAgIH0sXG5cbiAgICBOb25lbXB0eUxpc3RPZjogZnVuY3Rpb24oeCwgXywgeHMpIHtcbiAgICAgIHJldHVybiBbeC52aXNpdCgpXS5jb25jYXQoeHMudmlzaXQoKSk7XG4gICAgfSxcbiAgICBFbXB0eUxpc3RPZjogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfSxcblxuICAgIF90ZXJtaW5hbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcmltaXRpdmVWYWx1ZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gaGVscGVycyhtYXRjaCkudmlzaXQoKTtcbn1cblxuZnVuY3Rpb24gY29tcGlsZUFuZExvYWQoc291cmNlLCBuYW1lc3BhY2UpIHtcbiAgdmFyIG0gPSBvaG1HcmFtbWFyLm1hdGNoKHNvdXJjZSwgJ0dyYW1tYXJzJyk7XG4gIGlmIChtLmZhaWxlZCgpKSB7XG4gICAgdGhyb3cgZXJyb3JzLmdyYW1tYXJTeW50YXhFcnJvcihtKTtcbiAgfVxuICByZXR1cm4gYnVpbGRHcmFtbWFyKG0sIG5hbWVzcGFjZSk7XG59XG5cbi8vIFJldHVybiB0aGUgY29udGVudHMgb2YgYSBzY3JpcHQgZWxlbWVudCwgZmV0Y2hpbmcgaXQgdmlhIFhIUiBpZiBuZWNlc3NhcnkuXG5mdW5jdGlvbiBnZXRTY3JpcHRFbGVtZW50Q29udGVudHMoZWwpIHtcbiAgaWYgKCFpc0VsZW1lbnQoZWwpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBET00gTm9kZSwgZ290ICcgKyBjb21tb24udW5leHBlY3RlZE9ialRvU3RyaW5nKGVsKSk7XG4gIH1cbiAgaWYgKGVsLnR5cGUgIT09ICd0ZXh0L29obS1qcycpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGEgc2NyaXB0IHRhZyB3aXRoIHR5cGU9XCJ0ZXh0L29obS1qc1wiLCBnb3QgJyArIGVsKTtcbiAgfVxuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCdzcmMnKSA/IGxvYWQoZWwuZ2V0QXR0cmlidXRlKCdzcmMnKSkgOiBlbC5pbm5lckhUTUw7XG59XG5cbmZ1bmN0aW9uIGdyYW1tYXIoc291cmNlLCBvcHROYW1lc3BhY2UpIHtcbiAgdmFyIG5zID0gZ3JhbW1hcnMoc291cmNlLCBvcHROYW1lc3BhY2UpO1xuXG4gIC8vIEVuc3VyZSB0aGF0IHRoZSBzb3VyY2UgY29udGFpbmVkIG5vIG1vcmUgdGhhbiBvbmUgZ3JhbW1hciBkZWZpbml0aW9uLlxuICB2YXIgZ3JhbW1hck5hbWVzID0gT2JqZWN0LmtleXMobnMpO1xuICBpZiAoZ3JhbW1hck5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBncmFtbWFyIGRlZmluaXRpb24nKTtcbiAgfSBlbHNlIGlmIChncmFtbWFyTmFtZXMubGVuZ3RoID4gMSkge1xuICAgIHZhciBzZWNvbmRHcmFtbWFyID0gbnNbZ3JhbW1hck5hbWVzWzFdXTtcbiAgICB2YXIgaW50ZXJ2YWwgPSBzZWNvbmRHcmFtbWFyLnNvdXJjZTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIHV0aWwuZ2V0TGluZUFuZENvbHVtbk1lc3NhZ2UoaW50ZXJ2YWwuaW5wdXRTdHJlYW0uc291cmNlLCBpbnRlcnZhbC5zdGFydElkeCkgK1xuICAgICAgICAnRm91bmQgbW9yZSB0aGFuIG9uZSBncmFtbWFyIGRlZmluaXRpb24gLS0gdXNlIG9obS5ncmFtbWFycygpIGluc3RlYWQuJyk7XG4gIH1cbiAgcmV0dXJuIG5zW2dyYW1tYXJOYW1lc1swXV07ICAvLyBSZXR1cm4gdGhlIG9uZSBhbmQgb25seSBncmFtbWFyLlxufVxuXG5mdW5jdGlvbiBncmFtbWFycyhzb3VyY2UsIG9wdE5hbWVzcGFjZSkge1xuICB2YXIgbnMgPSBOYW1lc3BhY2UuZXh0ZW5kKE5hbWVzcGFjZS5hc05hbWVzcGFjZShvcHROYW1lc3BhY2UpKTtcbiAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gRm9yIGNvbnZlbmllbmNlLCBkZXRlY3QgTm9kZS5qcyBCdWZmZXIgb2JqZWN0cyBhbmQgYXV0b21hdGljYWxseSBjYWxsIHRvU3RyaW5nKCkuXG4gICAgaWYgKGlzQnVmZmVyKHNvdXJjZSkpIHtcbiAgICAgIHNvdXJjZSA9IHNvdXJjZS50b1N0cmluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICdFeHBlY3RlZCBzdHJpbmcgYXMgZmlyc3QgYXJndW1lbnQsIGdvdCAnICsgY29tbW9uLnVuZXhwZWN0ZWRPYmpUb1N0cmluZyhzb3VyY2UpKTtcbiAgICB9XG4gIH1cbiAgY29tcGlsZUFuZExvYWQoc291cmNlLCBucyk7XG4gIHJldHVybiBucztcbn1cblxuZnVuY3Rpb24gZ3JhbW1hckZyb21TY3JpcHRFbGVtZW50KG9wdE5vZGUpIHtcbiAgdmFyIG5vZGUgPSBvcHROb2RlO1xuICBpZiAoaXNVbmRlZmluZWQobm9kZSkpIHtcbiAgICB2YXIgbm9kZUxpc3QgPSBkb2N1bWVudEludGVyZmFjZS5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHRbdHlwZT1cInRleHQvb2htLWpzXCJdJyk7XG4gICAgaWYgKG5vZGVMaXN0Lmxlbmd0aCAhPT0gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdFeHBlY3RlZCBleGFjdGx5IG9uZSBzY3JpcHQgdGFnIHdpdGggdHlwZT1cInRleHQvb2htLWpzXCIsIGZvdW5kICcgKyBub2RlTGlzdC5sZW5ndGgpO1xuICAgIH1cbiAgICBub2RlID0gbm9kZUxpc3RbMF07XG4gIH1cbiAgcmV0dXJuIGdyYW1tYXIoZ2V0U2NyaXB0RWxlbWVudENvbnRlbnRzKG5vZGUpKTtcbn1cblxuZnVuY3Rpb24gZ3JhbW1hcnNGcm9tU2NyaXB0RWxlbWVudHMob3B0Tm9kZU9yTm9kZUxpc3QpIHtcbiAgLy8gU2ltcGxlIGNhc2U6IHRoZSBhcmd1bWVudCBpcyBhIERPTSBub2RlLlxuICBpZiAoaXNFbGVtZW50KG9wdE5vZGVPck5vZGVMaXN0KSkge1xuICAgIHJldHVybiBncmFtbWFycyhvcHROb2RlT3JOb2RlTGlzdCk7XG4gIH1cbiAgLy8gT3RoZXJ3aXNlLCBpdCBtdXN0IGJlIGVpdGhlciB1bmRlZmluZWQgb3IgYSBOb2RlTGlzdC5cbiAgdmFyIG5vZGVMaXN0ID0gb3B0Tm9kZU9yTm9kZUxpc3Q7XG4gIGlmIChpc1VuZGVmaW5lZChub2RlTGlzdCkpIHtcbiAgICAvLyBGaW5kIGFsbCBzY3JpcHQgZWxlbWVudHMgd2l0aCB0eXBlPVwidGV4dC9vaG0tanNcIi5cbiAgICBub2RlTGlzdCA9IGRvY3VtZW50SW50ZXJmYWNlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdFt0eXBlPVwidGV4dC9vaG0tanNcIl0nKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygbm9kZUxpc3QgPT09ICdzdHJpbmcnIHx8ICghaXNFbGVtZW50KG5vZGVMaXN0KSAmJiAhaXNBcnJheUxpa2Uobm9kZUxpc3QpKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIGEgTm9kZSwgTm9kZUxpc3QsIG9yIEFycmF5LCBidXQgZ290ICcgKyBub2RlTGlzdCk7XG4gIH1cbiAgdmFyIG5zID0gTmFtZXNwYWNlLmNyZWF0ZU5hbWVzcGFjZSgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgLy8gQ29weSB0aGUgbmV3IGdyYW1tYXJzIGludG8gYG5zYCB0byBrZWVwIHRoZSBuYW1lc3BhY2UgZmxhdC5cbiAgICBjb21tb24uZXh0ZW5kKG5zLCBncmFtbWFycyhnZXRTY3JpcHRFbGVtZW50Q29udGVudHMobm9kZUxpc3RbaV0pLCBucykpO1xuICB9XG4gIHJldHVybiBucztcbn1cblxuZnVuY3Rpb24gbWFrZVJlY2lwZShyZWNpcGUpIHtcbiAgaWYgKHR5cGVvZiByZWNpcGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gcmVjaXBlLmNhbGwobmV3IEJ1aWxkZXIoKSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiByZWNpcGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBzdHJpbmdpZmllZCBKU09OIHJlY2lwZVxuICAgICAgcmVjaXBlID0gSlNPTi5wYXJzZShyZWNpcGUpO1xuICAgIH1cbiAgICByZXR1cm4gKG5ldyBCdWlsZGVyKCkpLmZyb21SZWNpcGUocmVjaXBlKTtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gU3R1ZmYgdGhhdCB1c2VycyBzaG91bGQga25vdyBhYm91dFxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZU5hbWVzcGFjZTogTmFtZXNwYWNlLmNyZWF0ZU5hbWVzcGFjZSxcbiAgZ3JhbW1hcjogZ3JhbW1hcixcbiAgZ3JhbW1hcnM6IGdyYW1tYXJzLFxuICBncmFtbWFyRnJvbVNjcmlwdEVsZW1lbnQ6IGdyYW1tYXJGcm9tU2NyaXB0RWxlbWVudCxcbiAgZ3JhbW1hcnNGcm9tU2NyaXB0RWxlbWVudHM6IGdyYW1tYXJzRnJvbVNjcmlwdEVsZW1lbnRzLFxuICBtYWtlUmVjaXBlOiBtYWtlUmVjaXBlLFxuICBvaG1HcmFtbWFyOiBudWxsLCAgLy8gSW5pdGlhbGl6ZWQgYmVsb3csIGFmdGVyIEdyYW1tYXIuQnVpbHRJblJ1bGVzLlxuICBwZXhwcnM6IHBleHBycyxcbiAgdXRpbDogdXRpbCxcbiAgZXh0cmFzOiByZXF1aXJlKCcuLi9leHRyYXMnKVxufTtcblxuLy8gU3R1ZmYgZm9yIHRlc3RpbmcsIGV0Yy5cbm1vZHVsZS5leHBvcnRzLl9idWlsZEdyYW1tYXIgPSBidWlsZEdyYW1tYXI7XG5tb2R1bGUuZXhwb3J0cy5fc2V0RG9jdW1lbnRJbnRlcmZhY2VGb3JUZXN0aW5nID0gZnVuY3Rpb24oZG9jKSB7IGRvY3VtZW50SW50ZXJmYWNlID0gZG9jOyB9O1xuXG4vLyBMYXRlIGluaXRpYWxpemF0aW9uIGZvciBzdHVmZiB0aGF0IGlzIGJvb3RzdHJhcHBlZC5cblxuR3JhbW1hci5CdWlsdEluUnVsZXMgPSByZXF1aXJlKCcuLi9kaXN0L2J1aWx0LWluLXJ1bGVzJyk7XG5cbnZhciBTZW1hbnRpY3MgPSByZXF1aXJlKCcuL1NlbWFudGljcycpO1xudmFyIG9wZXJhdGlvbnNBbmRBdHRyaWJ1dGVzR3JhbW1hciA9IHJlcXVpcmUoJy4uL2Rpc3Qvb3BlcmF0aW9ucy1hbmQtYXR0cmlidXRlcycpO1xuU2VtYW50aWNzLmluaXRCdWlsdEluU2VtYW50aWNzKEdyYW1tYXIuQnVpbHRJblJ1bGVzKTtcblNlbWFudGljcy5pbml0UHJvdG90eXBlUGFyc2VyKG9wZXJhdGlvbnNBbmRBdHRyaWJ1dGVzR3JhbW1hcik7ICAvLyByZXF1aXJlcyBCdWlsdEluU2VtYW50aWNzXG5cbm1vZHVsZS5leHBvcnRzLm9obUdyYW1tYXIgPSBvaG1HcmFtbWFyID0gcmVxdWlyZSgnLi4vZGlzdC9vaG0tZ3JhbW1hcicpO1xuR3JhbW1hci5pbml0QXBwbGljYXRpb25QYXJzZXIob2htR3JhbW1hciwgYnVpbGRHcmFtbWFyKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBOb2RlKGdyYW1tYXIsIGN0b3JOYW1lLCBjaGlsZHJlbiwgc291cmNlKSB7XG4gIHRoaXMuZ3JhbW1hciA9IGdyYW1tYXI7XG4gIHRoaXMuY3Rvck5hbWUgPSBjdG9yTmFtZTtcbiAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB0aGlzLnNvdXJjZSA9IHNvdXJjZTtcbn1cblxuTm9kZS5wcm90b3R5cGUubnVtQ2hpbGRyZW4gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoO1xufTtcblxuTm9kZS5wcm90b3R5cGUuY2hpbGRBdCA9IGZ1bmN0aW9uKGlkeCkge1xuICByZXR1cm4gdGhpcy5jaGlsZHJlbltpZHhdO1xufTtcblxuTm9kZS5wcm90b3R5cGUuaW5kZXhPZkNoaWxkID0gZnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0aGlzLmNoaWxkcmVuLmluZGV4T2YoYXJnKTtcbn07XG5cbk5vZGUucHJvdG90eXBlLmhhc0NoaWxkcmVuID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDA7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5oYXNOb0NoaWxkcmVuID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAhdGhpcy5oYXNDaGlsZHJlbigpO1xufTtcblxuTm9kZS5wcm90b3R5cGUub25seUNoaWxkID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCAhPT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2Nhbm5vdCBnZXQgb25seSBjaGlsZCBvZiBhIG5vZGUgb2YgdHlwZSAnICsgdGhpcy5jdG9yTmFtZSArXG4gICAgICAgICcgKGl0IGhhcyAnICsgdGhpcy5udW1DaGlsZHJlbigpICsgJyBjaGlsZHJlbiknKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5maXJzdENoaWxkKCk7XG4gIH1cbn07XG5cbk5vZGUucHJvdG90eXBlLmZpcnN0Q2hpbGQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuaGFzTm9DaGlsZHJlbigpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnY2Fubm90IGdldCBmaXJzdCBjaGlsZCBvZiBhICcgKyB0aGlzLmN0b3JOYW1lICsgJyBub2RlLCB3aGljaCBoYXMgbm8gY2hpbGRyZW4nKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZEF0KDApO1xuICB9XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5sYXN0Q2hpbGQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuaGFzTm9DaGlsZHJlbigpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnY2Fubm90IGdldCBsYXN0IGNoaWxkIG9mIGEgJyArIHRoaXMuY3Rvck5hbWUgKyAnIG5vZGUsIHdoaWNoIGhhcyBubyBjaGlsZHJlbicpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmNoaWxkQXQodGhpcy5udW1DaGlsZHJlbigpIC0gMSk7XG4gIH1cbn07XG5cbk5vZGUucHJvdG90eXBlLmNoaWxkQmVmb3JlID0gZnVuY3Rpb24oY2hpbGQpIHtcbiAgdmFyIGNoaWxkSWR4ID0gdGhpcy5pbmRleE9mQ2hpbGQoY2hpbGQpO1xuICBpZiAoY2hpbGRJZHggPCAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlLmNoaWxkQmVmb3JlKCkgY2FsbGVkIHcvIGFuIGFyZ3VtZW50IHRoYXQgaXMgbm90IGEgY2hpbGQnKTtcbiAgfSBlbHNlIGlmIChjaGlsZElkeCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGdldCBjaGlsZCBiZWZvcmUgZmlyc3QgY2hpbGQnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5jaGlsZEF0KGNoaWxkSWR4IC0gMSk7XG4gIH1cbn07XG5cbk5vZGUucHJvdG90eXBlLmNoaWxkQWZ0ZXIgPSBmdW5jdGlvbihjaGlsZCkge1xuICB2YXIgY2hpbGRJZHggPSB0aGlzLmluZGV4T2ZDaGlsZChjaGlsZCk7XG4gIGlmIChjaGlsZElkeCA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vZGUuY2hpbGRBZnRlcigpIGNhbGxlZCB3LyBhbiBhcmd1bWVudCB0aGF0IGlzIG5vdCBhIGNoaWxkJyk7XG4gIH0gZWxzZSBpZiAoY2hpbGRJZHggPT09IHRoaXMubnVtQ2hpbGRyZW4oKSAtIDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBnZXQgY2hpbGQgYWZ0ZXIgbGFzdCBjaGlsZCcpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmNoaWxkQXQoY2hpbGRJZHggKyAxKTtcbiAgfVxufTtcblxuTm9kZS5wcm90b3R5cGUuaXNUZXJtaW5hbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5Ob2RlLnByb3RvdHlwZS5pc05vbnRlcm1pbmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbk5vZGUucHJvdG90eXBlLmlzSXRlcmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbk5vZGUucHJvdG90eXBlLmlzT3B0aW9uYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuTm9kZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIHZhciByID0ge307XG4gIHJbdGhpcy5jdG9yTmFtZV0gPSB0aGlzLmNoaWxkcmVuO1xuICByZXR1cm4gcjtcbn07XG5cbi8vIFRlcm1pbmFsc1xuXG5mdW5jdGlvbiBUZXJtaW5hbE5vZGUoZ3JhbW1hciwgdmFsdWUsIHNvdXJjZSkge1xuICBOb2RlLmNhbGwodGhpcywgZ3JhbW1hciwgJ190ZXJtaW5hbCcsIFtdLCBzb3VyY2UpO1xuICB0aGlzLnByaW1pdGl2ZVZhbHVlID0gdmFsdWU7XG59XG5pbmhlcml0cyhUZXJtaW5hbE5vZGUsIE5vZGUpO1xuXG5UZXJtaW5hbE5vZGUucHJvdG90eXBlLmlzVGVybWluYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vLyBOb250ZXJtaW5hbHNcblxuZnVuY3Rpb24gTm9udGVybWluYWxOb2RlKGdyYW1tYXIsIHJ1bGVOYW1lLCBjaGlsZHJlbiwgc291cmNlKSB7XG4gIE5vZGUuY2FsbCh0aGlzLCBncmFtbWFyLCBydWxlTmFtZSwgY2hpbGRyZW4sIHNvdXJjZSk7XG59XG5pbmhlcml0cyhOb250ZXJtaW5hbE5vZGUsIE5vZGUpO1xuXG5Ob250ZXJtaW5hbE5vZGUucHJvdG90eXBlLmlzTm9udGVybWluYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5Ob250ZXJtaW5hbE5vZGUucHJvdG90eXBlLmlzTGV4aWNhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gY29tbW9uLmlzTGV4aWNhbCh0aGlzLmN0b3JOYW1lKTtcbn07XG5cbk5vbnRlcm1pbmFsTm9kZS5wcm90b3R5cGUuaXNTeW50YWN0aWMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGNvbW1vbi5pc1N5bnRhY3RpYyh0aGlzLmN0b3JOYW1lKTtcbn07XG5cbi8vIEl0ZXJhdGlvbnNcblxuZnVuY3Rpb24gSXRlcmF0aW9uTm9kZShncmFtbWFyLCBjaGlsZHJlbiwgc291cmNlLCBvcHRpb25hbCkge1xuICBOb2RlLmNhbGwodGhpcywgZ3JhbW1hciwgJ19pdGVyJywgY2hpbGRyZW4sIHNvdXJjZSk7XG4gIHRoaXMub3B0aW9uYWwgPSBvcHRpb25hbDtcbn1cbmluaGVyaXRzKEl0ZXJhdGlvbk5vZGUsIE5vZGUpO1xuXG5JdGVyYXRpb25Ob2RlLnByb3RvdHlwZS5pc0l0ZXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkl0ZXJhdGlvbk5vZGUucHJvdG90eXBlLmlzT3B0aW9uYWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMub3B0aW9uYWw7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIE5vZGU6IE5vZGUsXG4gIFRlcm1pbmFsTm9kZTogVGVybWluYWxOb2RlLFxuICBOb250ZXJtaW5hbE5vZGU6IE5vbnRlcm1pbmFsTm9kZSxcbiAgSXRlcmF0aW9uTm9kZTogSXRlcmF0aW9uTm9kZVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xudmFyIFZpc2l0b3JGYW1pbHkgPSByZXF1aXJlKCcuL1Zpc2l0b3JGYW1pbHknKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qXG4gIERlZmluZXMgdGhlIHJlY3Vyc2l2ZSBzaGFwZSBvZiBldmVyeSB0eXBlIG9mIFBFeHByIGJ5IGRlc2NyaWJpbmcgaG93IHRvXG4gIHZpc2l0IGV2ZXJ5IGNoaWxkIGV4cHJlc3Npb24uXG5cbiAgS2V5cyBjb3JyZXNwb25kIHRvIGEgdmFsdWUgcmV0dXJuIGZyb20gYGdldFRhZ2AsIGFuZCB0aGUgdmFsdWUgbXVzdCBiZTpcbiAgLSBhIHN0cmluZywgd2hpY2ggaXMgdGhlIHByb3BlcnR5IG5hbWUgdGhhdCBob2xkcyBhbiBleHByZXNzaW9uJ3Mgb25seSBjaGlsZFxuICAtIGFuIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIChvciB0aGUgZW1wdHkgYXJyYXksIGluZGljYXRpbmcgYSBsZWFmIHR5cGUpLCBvclxuICAtIGEgZnVuY3Rpb24sIHdoaWNoIG11c3QgYXBwbHkgaXRzIGBmbmAgYXJndW1lbnQgdG8gZXZlcnkgb25lIG9mIHRoZSBleHByZXNzaW9uJ3MgY2hpbGRyZW4uXG4gKi9cbnZhciBzaGFwZXMgPSB7XG4gIGFueTogW10sXG4gIGVuZDogW10sXG4gIEFsdDogJ3Rlcm1zW10nLFxuICBBcHBseTogJ2FyZ3NbXScsXG4gIEl0ZXI6ICdleHByJyxcbiAgRXh0ZW5kOiAndGVybXNbXScsXG4gIExleDogJ2V4cHInLFxuICBMb29rYWhlYWQ6ICdleHByJyxcbiAgTm90OiAnZXhwcicsXG4gIE9wdDogJ2V4cHInLFxuICBQYXJhbTogW10sXG4gIFBsdXM6ICdleHByJyxcbiAgUmFuZ2U6IFtdLFxuICBTZXE6ICdmYWN0b3JzW10nLFxuICBTdGFyOiAnZXhwcicsXG4gIFRlcm1pbmFsOiBbXSxcbiAgVW5pY29kZUNoYXI6IFtdXG59O1xuXG4vLyBSZXR1bnMgdGhlIGtleSB0aGF0IHdpbGwgYmUgdXNlZCB0byBsb29rIHVwIHRoZSBvcGVyYXRpb24gaW1wbGVtZW50YXRpb24gZnVuY3Rpb24uXG5mdW5jdGlvbiBnZXRUYWcob2JqKSB7XG4gIHN3aXRjaCAob2JqKSB7XG4gICAgY2FzZSBwZXhwcnMuYW55OlxuICAgICAgcmV0dXJuICdhbnknO1xuICAgIGNhc2UgcGV4cHJzLmVuZDpcbiAgICAgIHJldHVybiAnZW5kJztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG9iai5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBWaXNpdG9yRmFtaWx5KHtzaGFwZXM6IHNoYXBlcywgZ2V0VGFnOiBnZXRUYWd9KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vKlxuICBSZXR1cm4gdHJ1ZSBpZiB3ZSBzaG91bGQgc2tpcCBzcGFjZXMgcHJlY2VkaW5nIHRoaXMgZXhwcmVzc2lvbiBpbiBhIHN5bnRhY3RpYyBjb250ZXh0LlxuKi9cbnBleHBycy5QRXhwci5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9IGNvbW1vbi5hYnN0cmFjdChcbiAgJ2FsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UnXG4pO1xuXG4vKlxuICBHZW5lcmFsbHksIHRoZXNlIGFyZSBhbGwgZmlyc3Qtb3JkZXIgZXhwcmVzc2lvbnMgYW5kICh3aXRoIHRoZSBleGNlcHRpb24gb2YgQXBwbHkpXG4gIGRpcmVjdGx5IHJlYWQgZnJvbSB0aGUgaW5wdXQgc3RyZWFtLlxuKi9cbnBleHBycy5hbnkuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuZW5kLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPVxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID1cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPVxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxuLypcbiAgSGlnaGVyLW9yZGVyIGV4cHJlc3Npb25zIHRoYXQgZG9uJ3QgZGlyZWN0bHkgY29uc3VtZSBpbnB1dC5cbiovXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID1cbnBleHBycy5JdGVyLnByb3RvdHlwZS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID1cbnBleHBycy5MZXgucHJvdG90eXBlLmFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UgPVxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuTm90LnByb3RvdHlwZS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID1cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuYWxsb3dzU2tpcHBpbmdQcmVjZWRpbmdTcGFjZSA9XG5wZXhwcnMuU2VxLnByb3RvdHlwZS5hbGxvd3NTa2lwcGluZ1ByZWNlZGluZ1NwYWNlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgbGV4aWZ5Q291bnQ7XG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUuYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPSBmdW5jdGlvbihydWxlTmFtZSwgZ3JhbW1hcikge1xuICBsZXhpZnlDb3VudCA9IDA7XG4gIHRoaXMuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkKHJ1bGVOYW1lLCBncmFtbWFyKTtcbn07XG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gY29tbW9uLmFic3RyYWN0KFxuICAnX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkJ1xuKTtcblxucGV4cHJzLmFueS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPVxucGV4cHJzLmVuZC5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPVxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPVxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPVxucGV4cHJzLlBhcmFtLnByb3RvdHlwZS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPVxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPSBmdW5jdGlvbihydWxlTmFtZSwgZ3JhbW1hcikge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLkxleC5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24ocnVsZU5hbWUsIGdyYW1tYXIpIHtcbiAgbGV4aWZ5Q291bnQrKztcbiAgdGhpcy5leHByLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZChydWxlTmFtZSwgZ3JhbW1hcik7XG4gIGxleGlmeUNvdW50LS07XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPSBmdW5jdGlvbihydWxlTmFtZSwgZ3JhbW1hcikge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnRlcm1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzLnRlcm1zW2lkeF0uX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkKHJ1bGVOYW1lLCBncmFtbWFyKTtcbiAgfVxufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24ocnVsZU5hbWUsIGdyYW1tYXIpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5mYWN0b3JzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzLmZhY3RvcnNbaWR4XS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQocnVsZU5hbWUsIGdyYW1tYXIpO1xuICB9XG59O1xuXG5wZXhwcnMuSXRlci5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID1cbnBleHBycy5Ob3QucHJvdG90eXBlLl9hc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCA9XG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5fYXNzZXJ0QWxsQXBwbGljYXRpb25zQXJlVmFsaWQgPSBmdW5jdGlvbihydWxlTmFtZSwgZ3JhbW1hcikge1xuICB0aGlzLmV4cHIuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkKHJ1bGVOYW1lLCBncmFtbWFyKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkID0gZnVuY3Rpb24ocnVsZU5hbWUsIGdyYW1tYXIpIHtcbiAgdmFyIHJ1bGVJbmZvID0gZ3JhbW1hci5ydWxlc1t0aGlzLnJ1bGVOYW1lXTtcblxuICAvLyBNYWtlIHN1cmUgdGhhdCB0aGUgcnVsZSBleGlzdHMuLi5cbiAgaWYgKCFydWxlSW5mbykge1xuICAgIHRocm93IGVycm9ycy51bmRlY2xhcmVkUnVsZSh0aGlzLnJ1bGVOYW1lLCBncmFtbWFyLm5hbWUsIHRoaXMuc291cmNlKTtcbiAgfVxuXG4gIC8vIC4uLmFuZCB0aGF0IHRoaXMgYXBwbGljYXRpb24gaXMgYWxsb3dlZFxuICBpZiAoY29tbW9uLmlzU3ludGFjdGljKHRoaXMucnVsZU5hbWUpICYmICghY29tbW9uLmlzU3ludGFjdGljKHJ1bGVOYW1lKSB8fCBsZXhpZnlDb3VudCA+IDApKSB7XG4gICAgdGhyb3cgZXJyb3JzLmFwcGxpY2F0aW9uT2ZTeW50YWN0aWNSdWxlRnJvbUxleGljYWxDb250ZXh0KHRoaXMucnVsZU5hbWUsIHRoaXMpO1xuICB9XG5cbiAgLy8gLi4uYW5kIHRoYXQgdGhpcyBhcHBsaWNhdGlvbiBoYXMgdGhlIGNvcnJlY3QgbnVtYmVyIG9mIGFyZ3VtZW50c1xuICB2YXIgYWN0dWFsID0gdGhpcy5hcmdzLmxlbmd0aDtcbiAgdmFyIGV4cGVjdGVkID0gcnVsZUluZm8uZm9ybWFscy5sZW5ndGg7XG4gIGlmIChhY3R1YWwgIT09IGV4cGVjdGVkKSB7XG4gICAgdGhyb3cgZXJyb3JzLndyb25nTnVtYmVyT2ZBcmd1bWVudHModGhpcy5ydWxlTmFtZSwgZXhwZWN0ZWQsIGFjdHVhbCwgdGhpcyk7XG4gIH1cblxuICAvLyAuLi5hbmQgdGhhdCBhbGwgb2YgdGhlIGFyZ3VtZW50IGV4cHJlc3Npb25zIG9ubHkgaGF2ZSB2YWxpZCBhcHBsaWNhdGlvbnMgYW5kIGhhdmUgYXJpdHkgMS5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLmFyZ3MuZm9yRWFjaChmdW5jdGlvbihhcmcpIHtcbiAgICBhcmcuX2Fzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkKHJ1bGVOYW1lLCBncmFtbWFyKTtcbiAgICBpZiAoYXJnLmdldEFyaXR5KCkgIT09IDEpIHtcbiAgICAgIHRocm93IGVycm9ycy5pbnZhbGlkUGFyYW1ldGVyKHNlbGYucnVsZU5hbWUsIGFyZyk7XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID0gY29tbW9uLmFic3RyYWN0KFxuICAnYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHknXG4pO1xuXG5wZXhwcnMuYW55LmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID1cbnBleHBycy5lbmQuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPVxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9XG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID1cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPVxucGV4cHJzLkxleC5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPVxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIG5vLW9wXG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIGlmICh0aGlzLnRlcm1zLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgYXJpdHkgPSB0aGlzLnRlcm1zWzBdLmdldEFyaXR5KCk7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMudGVybXMubGVuZ3RoOyBpZHgrKykge1xuICAgIHZhciB0ZXJtID0gdGhpcy50ZXJtc1tpZHhdO1xuICAgIHRlcm0uYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkoKTtcbiAgICB2YXIgb3RoZXJBcml0eSA9IHRlcm0uZ2V0QXJpdHkoKTtcbiAgICBpZiAoYXJpdHkgIT09IG90aGVyQXJpdHkpIHtcbiAgICAgIHRocm93IGVycm9ycy5pbmNvbnNpc3RlbnRBcml0eShydWxlTmFtZSwgYXJpdHksIG90aGVyQXJpdHksIHRlcm0pO1xuICAgIH1cbiAgfVxufTtcblxucGV4cHJzLkV4dGVuZC5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBFeHRlbmQgaXMgYSBzcGVjaWFsIGNhc2Ugb2YgQWx0IHRoYXQncyBndWFyYW50ZWVkIHRvIGhhdmUgZXhhY3RseSB0d29cbiAgLy8gY2FzZXM6IFtleHRlbnNpb25zLCBvcmlnQm9keV0uXG4gIHZhciBhY3R1YWxBcml0eSA9IHRoaXMudGVybXNbMF0uZ2V0QXJpdHkoKTtcbiAgdmFyIGV4cGVjdGVkQXJpdHkgPSB0aGlzLnRlcm1zWzFdLmdldEFyaXR5KCk7XG4gIGlmIChhY3R1YWxBcml0eSAhPT0gZXhwZWN0ZWRBcml0eSkge1xuICAgIHRocm93IGVycm9ycy5pbmNvbnNpc3RlbnRBcml0eShydWxlTmFtZSwgZXhwZWN0ZWRBcml0eSwgYWN0dWFsQXJpdHksIHRoaXMudGVybXNbMF0pO1xuICB9XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuZmFjdG9ycy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy5mYWN0b3JzW2lkeF0uYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkocnVsZU5hbWUpO1xuICB9XG59O1xuXG5wZXhwcnMuSXRlci5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkocnVsZU5hbWUpO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQXJpdHkgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBuby1vcCAobm90IHJlcXVpcmVkIGIvYyB0aGUgbmVzdGVkIGV4cHIgZG9lc24ndCBzaG93IHVwIGluIHRoZSBDU1QpXG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eSA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eShydWxlTmFtZSk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUFyaXR5ID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgLy8gVGhlIGFyaXRpZXMgb2YgdGhlIHBhcmFtZXRlciBleHByZXNzaW9ucyBpcyByZXF1aXJlZCB0byBiZSAxIGJ5XG4gIC8vIGBhc3NlcnRBbGxBcHBsaWNhdGlvbnNBcmVWYWxpZCgpYC5cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9IGNvbW1vbi5hYnN0cmFjdChcbiAgJ2Fzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSdcbik7XG5cbnBleHBycy5hbnkuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID1cbnBleHBycy5lbmQuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID1cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID1cbnBleHBycy5SYW5nZS5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID1cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID1cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hciwgcnVsZU5hbWUpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIHJ1bGVOYW1lKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMudGVybXMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXMudGVybXNbaWR4XS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUoZ3JhbW1hciwgcnVsZU5hbWUpO1xuICB9XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBydWxlTmFtZSkge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXMuZmFjdG9yc1tpZHhdLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZShncmFtbWFyLCBydWxlTmFtZSk7XG4gIH1cbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBydWxlTmFtZSkge1xuICAvLyBOb3RlOiB0aGlzIGlzIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIG1ldGhvZCBmb3IgYFN0YXJgIGFuZCBgUGx1c2AgZXhwcmVzc2lvbnMuXG4gIC8vIEl0IGlzIG92ZXJyaWRkZW4gZm9yIGBPcHRgIGJlbG93LlxuICB0aGlzLmV4cHIuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlKGdyYW1tYXIsIHJ1bGVOYW1lKTtcbiAgaWYgKHRoaXMuZXhwci5pc051bGxhYmxlKGdyYW1tYXIpKSB7XG4gICAgdGhyb3cgZXJyb3JzLmtsZWVuZUV4cHJIYXNOdWxsYWJsZU9wZXJhbmQodGhpcywgcnVsZU5hbWUpO1xuICB9XG59O1xuXG5wZXhwcnMuT3B0LnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPVxucGV4cHJzLk5vdC5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID1cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZSA9XG5wZXhwcnMuTGV4LnByb3RvdHlwZS5hc3NlcnRJdGVyYXRlZEV4cHJzQXJlTm90TnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlKGdyYW1tYXIsIHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hciwgcnVsZU5hbWUpIHtcbiAgdGhpcy5hcmdzLmZvckVhY2goZnVuY3Rpb24oYXJnKSB7XG4gICAgYXJnLmFzc2VydEl0ZXJhdGVkRXhwcnNBcmVOb3ROdWxsYWJsZShncmFtbWFyLCBydWxlTmFtZSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIG5vZGVzID0gcmVxdWlyZSgnLi9ub2RlcycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmNoZWNrID0gY29tbW9uLmFic3RyYWN0KCdjaGVjaycpO1xuXG5wZXhwcnMuYW55LmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICByZXR1cm4gdmFscy5sZW5ndGggPj0gMTtcbn07XG5cbnBleHBycy5lbmQuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB2YWxzWzBdIGluc3RhbmNlb2Ygbm9kZXMuTm9kZSAmJlxuICAgICAgICAgdmFsc1swXS5pc1Rlcm1pbmFsKCkgJiZcbiAgICAgICAgIHZhbHNbMF0ucHJpbWl0aXZlVmFsdWUgPT09IHVuZGVmaW5lZDtcbn07XG5cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB2YWxzWzBdIGluc3RhbmNlb2Ygbm9kZXMuTm9kZSAmJlxuICAgICAgICAgdmFsc1swXS5pc1Rlcm1pbmFsKCkgJiZcbiAgICAgICAgIHZhbHNbMF0ucHJpbWl0aXZlVmFsdWUgPT09IHRoaXMub2JqO1xufTtcblxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgcmV0dXJuIHZhbHNbMF0gaW5zdGFuY2VvZiBub2Rlcy5Ob2RlICYmXG4gICAgICAgICB2YWxzWzBdLmlzVGVybWluYWwoKSAmJlxuICAgICAgICAgdHlwZW9mIHZhbHNbMF0ucHJpbWl0aXZlVmFsdWUgPT09IHR5cGVvZiB0aGlzLmZyb207XG59O1xuXG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICByZXR1cm4gdmFscy5sZW5ndGggPj0gMTtcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGVybXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdGVybSA9IHRoaXMudGVybXNbaV07XG4gICAgaWYgKHRlcm0uY2hlY2soZ3JhbW1hciwgdmFscykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgdmFyIHBvcyA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5mYWN0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGZhY3RvciA9IHRoaXMuZmFjdG9yc1tpXTtcbiAgICBpZiAoZmFjdG9yLmNoZWNrKGdyYW1tYXIsIHZhbHMuc2xpY2UocG9zKSkpIHtcbiAgICAgIHBvcyArPSBmYWN0b3IuZ2V0QXJpdHkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKGdyYW1tYXIsIHZhbHMpIHtcbiAgdmFyIGFyaXR5ID0gdGhpcy5nZXRBcml0eSgpO1xuICB2YXIgY29sdW1ucyA9IHZhbHMuc2xpY2UoMCwgYXJpdHkpO1xuICBpZiAoY29sdW1ucy5sZW5ndGggIT09IGFyaXR5KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciByb3dDb3VudCA9IGNvbHVtbnNbMF0ubGVuZ3RoO1xuICB2YXIgaTtcbiAgZm9yIChpID0gMTsgaSA8IGFyaXR5OyBpKyspIHtcbiAgICBpZiAoY29sdW1uc1tpXS5sZW5ndGggIT09IHJvd0NvdW50KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IHJvd0NvdW50OyBpKyspIHtcbiAgICB2YXIgcm93ID0gW107XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcml0eTsgaisrKSB7XG4gICAgICByb3cucHVzaChjb2x1bW5zW2pdW2ldKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmV4cHIuY2hlY2soZ3JhbW1hciwgcm93KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuY2hlY2sgPVxucGV4cHJzLkxleC5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuY2hlY2soZ3JhbW1hciwgdmFscyk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24oZ3JhbW1hciwgdmFscykge1xuICBpZiAoISh2YWxzWzBdIGluc3RhbmNlb2Ygbm9kZXMuTm9kZSAmJlxuICAgICAgICB2YWxzWzBdLmdyYW1tYXIgPT09IGdyYW1tYXIgJiZcbiAgICAgICAgdmFsc1swXS5jdG9yTmFtZSA9PT0gdGhpcy5ydWxlTmFtZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBUT0RPOiB0aGluayBhYm91dCAqbm90KiBkb2luZyB0aGUgZm9sbG93aW5nIGNoZWNrcywgaS5lLiwgdHJ1c3RpbmcgdGhhdCB0aGUgcnVsZVxuICAvLyB3YXMgY29ycmVjdGx5IGNvbnN0cnVjdGVkLlxuICB2YXIgcnVsZU5vZGUgPSB2YWxzWzBdO1xuICB2YXIgYm9keSA9IGdyYW1tYXIucnVsZXNbdGhpcy5ydWxlTmFtZV0uYm9keTtcbiAgcmV0dXJuIGJvZHkuY2hlY2soZ3JhbW1hciwgcnVsZU5vZGUuY2hpbGRyZW4pICYmIHJ1bGVOb2RlLm51bUNoaWxkcmVuKCkgPT09IGJvZHkuZ2V0QXJpdHkoKTtcbn07XG5cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbihncmFtbWFyLCB2YWxzKSB7XG4gIHJldHVybiB2YWxzWzBdIGluc3RhbmNlb2Ygbm9kZXMuTm9kZSAmJlxuICAgICAgICAgdmFsc1swXS5pc1Rlcm1pbmFsKCkgJiZcbiAgICAgICAgIHR5cGVvZiB2YWxzWzBdLnByaW1pdGl2ZVZhbHVlID09PSAnc3RyaW5nJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgVHJhY2UgPSByZXF1aXJlKCcuL1RyYWNlJyk7XG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBub2RlcyA9IHJlcXVpcmUoJy4vbm9kZXMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG52YXIgVGVybWluYWxOb2RlID0gbm9kZXMuVGVybWluYWxOb2RlO1xudmFyIE5vbnRlcm1pbmFsTm9kZSA9IG5vZGVzLk5vbnRlcm1pbmFsTm9kZTtcbnZhciBJdGVyYXRpb25Ob2RlID0gbm9kZXMuSXRlcmF0aW9uTm9kZTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qXG4gIEV2YWx1YXRlIHRoZSBleHByZXNzaW9uIGFuZCByZXR1cm4gYHRydWVgIGlmIGl0IHN1Y2NlZWRzLCBgZmFsc2VgIG90aGVyd2lzZS4gVGhpcyBtZXRob2Qgc2hvdWxkXG4gIG9ubHkgYmUgY2FsbGVkIGRpcmVjdGx5IGJ5IGBTdGF0ZS5wcm90b3R5cGUuZXZhbChleHByKWAsIHdoaWNoIGFsc28gdXBkYXRlcyB0aGUgZGF0YSBzdHJ1Y3R1cmVzXG4gIHRoYXQgYXJlIHVzZWQgZm9yIHRyYWNpbmcuIChNYWtpbmcgdGhvc2UgdXBkYXRlcyBpbiBhIG1ldGhvZCBvZiBgU3RhdGVgIGVuYWJsZXMgdGhlIHRyYWNlLXNwZWNpZmljXG4gIGRhdGEgc3RydWN0dXJlcyB0byBiZSBcInNlY3JldHNcIiBvZiB0aGF0IGNsYXNzLCB3aGljaCBpcyBnb29kIGZvciBtb2R1bGFyaXR5LilcblxuICBUaGUgY29udHJhY3Qgb2YgdGhpcyBtZXRob2QgaXMgYXMgZm9sbG93czpcbiAgKiBXaGVuIHRoZSByZXR1cm4gdmFsdWUgaXMgYHRydWVgLFxuICAgIC0gdGhlIHN0YXRlIG9iamVjdCB3aWxsIGhhdmUgYGV4cHIuZ2V0QXJpdHkoKWAgbW9yZSBiaW5kaW5ncyB0aGFuIGl0IGRpZCBiZWZvcmUgdGhlIGNhbGwuXG4gICogV2hlbiB0aGUgcmV0dXJuIHZhbHVlIGlzIGBmYWxzZWAsXG4gICAgLSB0aGUgc3RhdGUgb2JqZWN0IG1heSBoYXZlIG1vcmUgYmluZGluZ3MgdGhhbiBpdCBkaWQgYmVmb3JlIHRoZSBjYWxsLCBhbmRcbiAgICAtIGl0cyBpbnB1dCBzdHJlYW0ncyBwb3NpdGlvbiBtYXkgYmUgYW55d2hlcmUuXG5cbiAgTm90ZSB0aGF0IGBTdGF0ZS5wcm90b3R5cGUuZXZhbChleHByKWAsIHVubGlrZSB0aGlzIG1ldGhvZCwgZ3VhcmFudGVlcyB0aGF0IG5laXRoZXIgdGhlIHN0YXRlXG4gIG9iamVjdCdzIGJpbmRpbmdzIG5vciBpdHMgaW5wdXQgc3RyZWFtJ3MgcG9zaXRpb24gd2lsbCBjaGFuZ2UgaWYgdGhlIGV4cHJlc3Npb24gZmFpbHMgdG8gbWF0Y2guXG4qL1xucGV4cHJzLlBFeHByLnByb3RvdHlwZS5ldmFsID0gY29tbW9uLmFic3RyYWN0KCdldmFsJyk7ICAvLyBmdW5jdGlvbihzdGF0ZSkgeyAuLi4gfVxuXG5wZXhwcnMuYW55LmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHZhciBjaCA9IGlucHV0U3RyZWFtLm5leHQoKTtcbiAgaWYgKGNoKSB7XG4gICAgdmFyIHNvdXJjZSA9IGlucHV0U3RyZWFtLmludGVydmFsKG9yaWdQb3MpO1xuICAgIHN0YXRlLmJpbmRpbmdzLnB1c2gobmV3IFRlcm1pbmFsTm9kZShzdGF0ZS5ncmFtbWFyLCBjaCwgc291cmNlKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGUucHJvY2Vzc0ZhaWx1cmUob3JpZ1BvcywgdGhpcyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5wZXhwcnMuZW5kLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIGlmIChpbnB1dFN0cmVhbS5hdEVuZCgpKSB7XG4gICAgdmFyIHNvdXJjZSA9IGlucHV0U3RyZWFtLmludGVydmFsKGlucHV0U3RyZWFtLnBvcyk7XG4gICAgc3RhdGUuYmluZGluZ3MucHVzaChuZXcgVGVybWluYWxOb2RlKHN0YXRlLmdyYW1tYXIsIHVuZGVmaW5lZCwgc291cmNlKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGUucHJvY2Vzc0ZhaWx1cmUob3JpZ1BvcywgdGhpcyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5wZXhwcnMuVGVybWluYWwucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIGlmICghaW5wdXRTdHJlYW0ubWF0Y2hTdHJpbmcodGhpcy5vYmopKSB7XG4gICAgc3RhdGUucHJvY2Vzc0ZhaWx1cmUob3JpZ1BvcywgdGhpcyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHZhciBzb3VyY2UgPSBpbnB1dFN0cmVhbS5pbnRlcnZhbChvcmlnUG9zKTtcbiAgICB2YXIgcHJpbWl0aXZlVmFsdWUgPSB0aGlzLm9iajtcbiAgICBzdGF0ZS5iaW5kaW5ncy5wdXNoKG5ldyBUZXJtaW5hbE5vZGUoc3RhdGUuZ3JhbW1hciwgcHJpbWl0aXZlVmFsdWUsIHNvdXJjZSkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHZhciBjaCA9IGlucHV0U3RyZWFtLm5leHQoKTtcbiAgaWYgKGNoICYmIHRoaXMuZnJvbSA8PSBjaCAmJiBjaCA8PSB0aGlzLnRvKSB7XG4gICAgdmFyIHNvdXJjZSA9IGlucHV0U3RyZWFtLmludGVydmFsKG9yaWdQb3MpO1xuICAgIHN0YXRlLmJpbmRpbmdzLnB1c2gobmV3IFRlcm1pbmFsTm9kZShzdGF0ZS5ncmFtbWFyLCBjaCwgc291cmNlKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGUucHJvY2Vzc0ZhaWx1cmUob3JpZ1BvcywgdGhpcyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICByZXR1cm4gc3RhdGUuZXZhbChzdGF0ZS5jdXJyZW50QXBwbGljYXRpb24oKS5hcmdzW3RoaXMuaW5kZXhdKTtcbn07XG5cbnBleHBycy5MZXgucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICBzdGF0ZS5lbnRlckxleGlmaWVkQ29udGV4dCgpO1xuICB2YXIgYW5zID0gc3RhdGUuZXZhbCh0aGlzLmV4cHIpO1xuICBzdGF0ZS5leGl0TGV4aWZpZWRDb250ZXh0KCk7XG4gIHJldHVybiBhbnM7XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy50ZXJtcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgaWYgKHN0YXRlLmV2YWwodGhpcy50ZXJtc1tpZHhdKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgIHZhciBmYWN0b3IgPSB0aGlzLmZhY3RvcnNbaWR4XTtcbiAgICBpZiAoIXN0YXRlLmV2YWwoZmFjdG9yKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICB2YXIgYXJpdHkgPSB0aGlzLmdldEFyaXR5KCk7XG4gIHZhciBjb2xzID0gW107XG4gIHdoaWxlIChjb2xzLmxlbmd0aCA8IGFyaXR5KSB7XG4gICAgY29scy5wdXNoKFtdKTtcbiAgfVxuICB2YXIgbnVtTWF0Y2hlcyA9IDA7XG4gIHZhciBpZHg7XG4gIHdoaWxlIChudW1NYXRjaGVzIDwgdGhpcy5tYXhOdW1NYXRjaGVzICYmIHN0YXRlLmV2YWwodGhpcy5leHByKSkge1xuICAgIG51bU1hdGNoZXMrKztcbiAgICB2YXIgcm93ID0gc3RhdGUuYmluZGluZ3Muc3BsaWNlKHN0YXRlLmJpbmRpbmdzLmxlbmd0aCAtIGFyaXR5LCBhcml0eSk7XG4gICAgZm9yIChpZHggPSAwOyBpZHggPCByb3cubGVuZ3RoOyBpZHgrKykge1xuICAgICAgY29sc1tpZHhdLnB1c2gocm93W2lkeF0pO1xuICAgIH1cbiAgfVxuICBpZiAobnVtTWF0Y2hlcyA8IHRoaXMubWluTnVtTWF0Y2hlcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgc291cmNlO1xuICBpZiAobnVtTWF0Y2hlcyA9PT0gMCkge1xuICAgIHNvdXJjZSA9IGlucHV0U3RyZWFtLmludGVydmFsKG9yaWdQb3MsIG9yaWdQb3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBmaXJzdENvbCA9IGNvbHNbMF07XG4gICAgdmFyIGxhc3RDb2wgPSBjb2xzW2NvbHMubGVuZ3RoIC0gMV07XG4gICAgc291cmNlID0gaW5wdXRTdHJlYW0uaW50ZXJ2YWwoXG4gICAgICAgIGZpcnN0Q29sWzBdLnNvdXJjZS5zdGFydElkeCxcbiAgICAgICAgbGFzdENvbFtsYXN0Q29sLmxlbmd0aCAtIDFdLnNvdXJjZS5lbmRJZHgpO1xuICB9XG4gIGZvciAoaWR4ID0gMDsgaWR4IDwgY29scy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgc3RhdGUuYmluZGluZ3MucHVzaChuZXcgSXRlcmF0aW9uTm9kZShzdGF0ZS5ncmFtbWFyLCBjb2xzW2lkeF0sIHNvdXJjZSxcbiAgICAgIHRoaXMgaW5zdGFuY2VvZiBwZXhwcnMuT3B0KSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgLypcbiAgICBUT0RPOlxuICAgIC0gUmlnaHQgbm93IHdlJ3JlIGp1c3QgdGhyb3dpbmcgYXdheSBhbGwgb2YgdGhlIGZhaWx1cmVzIHRoYXQgaGFwcGVuIGluc2lkZSBhIGBub3RgLCBhbmRcbiAgICAgIHJlY29yZGluZyBgdGhpc2AgYXMgYSBmYWlsZWQgZXhwcmVzc2lvbi5cbiAgICAtIERvdWJsZSBuZWdhdGlvbiBzaG91bGQgYmUgZXF1aXZhbGVudCB0byBsb29rYWhlYWQsIGJ1dCB0aGF0J3Mgbm90IHRoZSBjYXNlIHJpZ2h0IG5vdyB3cnRcbiAgICAgIGZhaWx1cmVzLiBFLmcuLCB+fidmb28nIHByb2R1Y2VzIGEgZmFpbHVyZSBmb3Igfn4nZm9vJywgYnV0IG1heWJlIGl0IHNob3VsZCBwcm9kdWNlXG4gICAgICBhIGZhaWx1cmUgZm9yICdmb28nIGluc3RlYWQuXG4gICovXG5cbiAgdmFyIGlucHV0U3RyZWFtID0gc3RhdGUuaW5wdXRTdHJlYW07XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICB2YXIgZmFpbHVyZXNJbmZvID0gc3RhdGUuZ2V0RmFpbHVyZXNJbmZvKCk7XG5cbiAgdmFyIGFucyA9IHN0YXRlLmV2YWwodGhpcy5leHByKTtcblxuICBzdGF0ZS5yZXN0b3JlRmFpbHVyZXNJbmZvKGZhaWx1cmVzSW5mbyk7XG4gIGlmIChhbnMpIHtcbiAgICBzdGF0ZS5wcm9jZXNzRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpbnB1dFN0cmVhbS5wb3MgPSBvcmlnUG9zO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIGlmIChzdGF0ZS5ldmFsKHRoaXMuZXhwcikpIHtcbiAgICBpbnB1dFN0cmVhbS5wb3MgPSBvcmlnUG9zO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgdmFyIGNhbGxlciA9IHN0YXRlLmN1cnJlbnRBcHBsaWNhdGlvbigpO1xuICB2YXIgYWN0dWFscyA9IGNhbGxlciA/IGNhbGxlci5hcmdzIDogW107XG4gIHZhciBhcHAgPSB0aGlzLnN1YnN0aXR1dGVQYXJhbXMoYWN0dWFscyk7XG5cbiAgdmFyIHBvc0luZm8gPSBzdGF0ZS5nZXRDdXJyZW50UG9zSW5mbygpO1xuICBpZiAocG9zSW5mby5pc0FjdGl2ZShhcHApKSB7XG4gICAgLy8gVGhpcyBydWxlIGlzIGFscmVhZHkgYWN0aXZlIGF0IHRoaXMgcG9zaXRpb24sIGkuZS4sIGl0IGlzIGxlZnQtcmVjdXJzaXZlLlxuICAgIHJldHVybiBhcHAuaGFuZGxlQ3ljbGUoc3RhdGUpO1xuICB9XG5cbiAgdmFyIG1lbW9LZXkgPSBhcHAudG9NZW1vS2V5KCk7XG4gIHZhciBtZW1vUmVjID0gcG9zSW5mby5tZW1vW21lbW9LZXldO1xuICByZXR1cm4gbWVtb1JlYyAmJiBwb3NJbmZvLnNob3VsZFVzZU1lbW9pemVkUmVzdWx0KG1lbW9SZWMpID9cbiAgICAgIHN0YXRlLnVzZU1lbW9pemVkUmVzdWx0KG1lbW9SZWMpIDpcbiAgICAgIGFwcC5yZWFsbHlFdmFsKHN0YXRlKTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuaGFuZGxlQ3ljbGUgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgcG9zSW5mbyA9IHN0YXRlLmdldEN1cnJlbnRQb3NJbmZvKCk7XG4gIHZhciBjdXJyZW50TGVmdFJlY3Vyc2lvbiA9IHBvc0luZm8uY3VycmVudExlZnRSZWN1cnNpb247XG4gIHZhciBtZW1vS2V5ID0gdGhpcy50b01lbW9LZXkoKTtcbiAgdmFyIG1lbW9SZWMgPSBwb3NJbmZvLm1lbW9bbWVtb0tleV07XG5cbiAgaWYgKGN1cnJlbnRMZWZ0UmVjdXJzaW9uICYmIGN1cnJlbnRMZWZ0UmVjdXJzaW9uLmhlYWRBcHBsaWNhdGlvbi50b01lbW9LZXkoKSA9PT0gbWVtb0tleSkge1xuICAgIC8vIFdlIGFscmVhZHkga25vdyBhYm91dCB0aGlzIGxlZnQgcmVjdXJzaW9uLCBidXQgaXQncyBwb3NzaWJsZSB0aGVyZSBhcmUgXCJpbnZvbHZlZFxuICAgIC8vIGFwcGxpY2F0aW9uc1wiIHRoYXQgd2UgZG9uJ3QgYWxyZWFkeSBrbm93IGFib3V0LCBzby4uLlxuICAgIG1lbW9SZWMudXBkYXRlSW52b2x2ZWRBcHBsaWNhdGlvbk1lbW9LZXlzKCk7XG4gIH0gZWxzZSBpZiAoIW1lbW9SZWMpIHtcbiAgICAvLyBOZXcgbGVmdCByZWN1cnNpb24gZGV0ZWN0ZWQhIE1lbW9pemUgYSBmYWlsdXJlIHRvIHRyeSB0byBnZXQgYSBzZWVkIHBhcnNlLlxuICAgIG1lbW9SZWMgPSBwb3NJbmZvLm1lbW9bbWVtb0tleV0gPSB7cG9zOiAtMSwgdmFsdWU6IGZhbHNlfTtcbiAgICBwb3NJbmZvLnN0YXJ0TGVmdFJlY3Vyc2lvbih0aGlzLCBtZW1vUmVjKTtcbiAgfVxuICByZXR1cm4gc3RhdGUudXNlTWVtb2l6ZWRSZXN1bHQobWVtb1JlYyk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLnJlYWxseUV2YWwgPSBmdW5jdGlvbihzdGF0ZSkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIHZhciBvcmlnUG9zSW5mbyA9IHN0YXRlLmdldEN1cnJlbnRQb3NJbmZvKCk7XG4gIHZhciBydWxlSW5mbyA9IHN0YXRlLmdyYW1tYXIucnVsZXNbdGhpcy5ydWxlTmFtZV07XG4gIHZhciBib2R5ID0gcnVsZUluZm8uYm9keTtcbiAgdmFyIGRlc2NyaXB0aW9uID0gcnVsZUluZm8uZGVzY3JpcHRpb247XG5cbiAgb3JpZ1Bvc0luZm8uZW50ZXIodGhpcyk7XG5cbiAgdmFyIG9yaWdGYWlsdXJlc0luZm87XG4gIGlmIChkZXNjcmlwdGlvbikge1xuICAgIG9yaWdGYWlsdXJlc0luZm8gPSBzdGF0ZS5nZXRGYWlsdXJlc0luZm8oKTtcbiAgfVxuXG4gIHZhciB2YWx1ZSA9IHRoaXMuZXZhbE9uY2UoYm9keSwgc3RhdGUpO1xuICB2YXIgY3VycmVudExSID0gb3JpZ1Bvc0luZm8uY3VycmVudExlZnRSZWN1cnNpb247XG4gIHZhciBtZW1vS2V5ID0gdGhpcy50b01lbW9LZXkoKTtcbiAgdmFyIGlzSGVhZE9mTGVmdFJlY3Vyc2lvbiA9ICEhY3VycmVudExSICYmIGN1cnJlbnRMUi5oZWFkQXBwbGljYXRpb24udG9NZW1vS2V5KCkgPT09IG1lbW9LZXk7XG4gIHZhciBtZW1vaXplZCA9IHRydWU7XG5cbiAgaWYgKGlzSGVhZE9mTGVmdFJlY3Vyc2lvbikge1xuICAgIHZhbHVlID0gdGhpcy5ncm93U2VlZFJlc3VsdChib2R5LCBzdGF0ZSwgb3JpZ1BvcywgY3VycmVudExSLCB2YWx1ZSk7XG4gICAgb3JpZ1Bvc0luZm8uZW5kTGVmdFJlY3Vyc2lvbigpO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRMUiAmJiBjdXJyZW50TFIuaXNJbnZvbHZlZChtZW1vS2V5KSkge1xuICAgIC8vIERvbid0IG1lbW9pemUgdGhlIHJlc3VsdFxuICAgIG1lbW9pemVkID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgb3JpZ1Bvc0luZm8ubWVtb1ttZW1vS2V5XSA9IHtcbiAgICAgIHBvczogaW5wdXRTdHJlYW0ucG9zLFxuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZmFpbHVyZXNBdFJpZ2h0bW9zdFBvc2l0aW9uOiBzdGF0ZS5jbG9uZVJpZ2h0bW9zdEZhaWx1cmVzKClcbiAgICB9O1xuICB9XG5cbiAgaWYgKGRlc2NyaXB0aW9uKSB7XG4gICAgc3RhdGUucmVzdG9yZUZhaWx1cmVzSW5mbyhvcmlnRmFpbHVyZXNJbmZvKTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICBzdGF0ZS5wcm9jZXNzRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICB9XG5cbiAgICBpZiAobWVtb2l6ZWQpIHtcbiAgICAgIG9yaWdQb3NJbmZvLm1lbW9bbWVtb0tleV0uZmFpbHVyZXNBdFJpZ2h0bW9zdFBvc2l0aW9uID0gc3RhdGUuY2xvbmVSaWdodG1vc3RGYWlsdXJlcygpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlY29yZCB0cmFjZSBpbmZvcm1hdGlvbiBpbiB0aGUgbWVtbyB0YWJsZSwgc28gdGhhdCBpdCBpcyBhdmFpbGFibGUgaWYgdGhlIG1lbW9pemVkIHJlc3VsdFxuICAvLyBpcyB1c2VkIGxhdGVyLlxuICBpZiAoc3RhdGUuaXNUcmFjaW5nKCkgJiYgb3JpZ1Bvc0luZm8ubWVtb1ttZW1vS2V5XSkge1xuICAgIHZhciBzdWNjZWVkZWQgPSAhIXZhbHVlO1xuICAgIHZhciBlbnRyeSA9IHN0YXRlLmdldFRyYWNlRW50cnkob3JpZ1BvcywgdGhpcywgc3VjY2VlZGVkLCBzdWNjZWVkZWQgPyBbdmFsdWVdIDogW10pO1xuICAgIGlmIChpc0hlYWRPZkxlZnRSZWN1cnNpb24pIHtcbiAgICAgIGNvbW1vbi5hc3NlcnQoZW50cnkudGVybWluYXRpbmdMUkVudHJ5ICE9IG51bGwgfHwgIXN1Y2NlZWRlZCk7XG4gICAgICBlbnRyeS5pc0hlYWRPZkxlZnRSZWN1cnNpb24gPSB0cnVlO1xuICAgIH1cbiAgICBvcmlnUG9zSW5mby5tZW1vW21lbW9LZXldLnRyYWNlRW50cnkgPSBlbnRyeTtcbiAgfVxuXG4gIG9yaWdQb3NJbmZvLmV4aXQoKTtcblxuICBpZiAodmFsdWUpIHtcbiAgICBzdGF0ZS5iaW5kaW5ncy5wdXNoKHZhbHVlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuZXZhbE9uY2UgPSBmdW5jdGlvbihleHByLCBzdGF0ZSkge1xuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG5cbiAgaWYgKHN0YXRlLmV2YWwoZXhwcikpIHtcbiAgICB2YXIgYXJpdHkgPSBleHByLmdldEFyaXR5KCk7XG4gICAgdmFyIGJpbmRpbmdzID0gc3RhdGUuYmluZGluZ3Muc3BsaWNlKHN0YXRlLmJpbmRpbmdzLmxlbmd0aCAtIGFyaXR5LCBhcml0eSk7XG4gICAgdmFyIGFucyA9XG4gICAgICAgIG5ldyBOb250ZXJtaW5hbE5vZGUoc3RhdGUuZ3JhbW1hciwgdGhpcy5ydWxlTmFtZSwgYmluZGluZ3MsIGlucHV0U3RyZWFtLmludGVydmFsKG9yaWdQb3MpKTtcbiAgICByZXR1cm4gYW5zO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5ncm93U2VlZFJlc3VsdCA9IGZ1bmN0aW9uKGJvZHksIHN0YXRlLCBvcmlnUG9zLCBsck1lbW9SZWMsIG5ld1ZhbHVlKSB7XG4gIGlmICghbmV3VmFsdWUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgaW5wdXRTdHJlYW0gPSBzdGF0ZS5pbnB1dFN0cmVhbTtcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIGxyTWVtb1JlYy5wb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gICAgbHJNZW1vUmVjLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgbHJNZW1vUmVjLmZhaWx1cmVzQXRSaWdodG1vc3RQb3NpdGlvbiA9IHN0YXRlLmNsb25lUmlnaHRtb3N0RmFpbHVyZXMoKTtcblxuICAgIGlmIChzdGF0ZS5pc1RyYWNpbmcoKSkge1xuICAgICAgLy8gQmVmb3JlIGV2YWx1YXRpbmcgdGhlIGJvZHkgYWdhaW4sIGFkZCBhIHRyYWNlIG5vZGUgZm9yIHRoaXMgYXBwbGljYXRpb24gdG8gdGhlIG1lbW8gZW50cnkuXG4gICAgICAvLyBJdHMgb25seSBjaGlsZCBpcyBhIGNvcHkgb2YgdGhlIHRyYWNlIG5vZGUgZnJvbSBgbmV3VmFsdWVgLCB3aGljaCB3aWxsIGFsd2F5cyBiZSB0aGUgbGFzdFxuICAgICAgLy8gZWxlbWVudCBpbiBgc3RhdGUudHJhY2VgLlxuICAgICAgdmFyIHNlZWRUcmFjZSA9IHN0YXRlLnRyYWNlW3N0YXRlLnRyYWNlLmxlbmd0aCAtIDFdO1xuICAgICAgbHJNZW1vUmVjLnRyYWNlRW50cnkgPSBuZXcgVHJhY2UoXG4gICAgICAgICAgc3RhdGUuaW5wdXRTdHJlYW0sIG9yaWdQb3MsIHRoaXMsIHRydWUsIFtuZXdWYWx1ZV0sIFtzZWVkVHJhY2UuY2xvbmUoKV0pO1xuICAgIH1cbiAgICBpbnB1dFN0cmVhbS5wb3MgPSBvcmlnUG9zO1xuICAgIG5ld1ZhbHVlID0gdGhpcy5ldmFsT25jZShib2R5LCBzdGF0ZSk7XG4gICAgaWYgKGlucHV0U3RyZWFtLnBvcyA8PSBsck1lbW9SZWMucG9zKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHN0YXRlLmlzVHJhY2luZygpKSB7XG4gICAgICBzdGF0ZS50cmFjZS5zcGxpY2UoLTIsIDEpOyAgLy8gRHJvcCB0aGUgdHJhY2UgZm9yIHRoZSBvbGQgc2VlZC5cbiAgICB9XG4gIH1cbiAgaWYgKHN0YXRlLmlzVHJhY2luZygpKSB7XG4gICAgLy8gVGhlIGxhc3QgZW50cnkgaXMgZm9yIGFuIHVudXNlZCByZXN1bHQgLS0gcG9wIGl0IGFuZCBzYXZlIGl0IGluIHRoZSBcInJlYWxcIiBlbnRyeS5cbiAgICBsck1lbW9SZWMudHJhY2VFbnRyeS5yZWNvcmRMUlRlcm1pbmF0aW9uKHN0YXRlLnRyYWNlLnBvcCgpLCBuZXdWYWx1ZSk7XG4gIH1cbiAgaW5wdXRTdHJlYW0ucG9zID0gbHJNZW1vUmVjLnBvcztcbiAgcmV0dXJuIGxyTWVtb1JlYy52YWx1ZTtcbn07XG5cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIHZhciBpbnB1dFN0cmVhbSA9IHN0YXRlLmlucHV0U3RyZWFtO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIGNoID0gaW5wdXRTdHJlYW0ubmV4dCgpO1xuICBpZiAoY2ggJiYgdGhpcy5wYXR0ZXJuLnRlc3QoY2gpKSB7XG4gICAgdmFyIHNvdXJjZSA9IGlucHV0U3RyZWFtLmludGVydmFsKG9yaWdQb3MpO1xuICAgIHN0YXRlLmJpbmRpbmdzLnB1c2gobmV3IFRlcm1pbmFsTm9kZShzdGF0ZS5ncmFtbWFyLCBjaCwgc291cmNlKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgc3RhdGUucHJvY2Vzc0ZhaWx1cmUob3JpZ1BvcywgdGhpcyk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEhlbHBlcnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGZsYXR0ZW4obGlzdE9mTGlzdHMpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIGxpc3RPZkxpc3RzKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUuZ2VuZXJhdGVFeGFtcGxlID0gY29tbW9uLmFic3RyYWN0KCdnZW5lcmF0ZUV4YW1wbGUnKTtcblxucGV4cHJzLmFueS5nZW5lcmF0ZUV4YW1wbGUgPSBmdW5jdGlvbihncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzKSB7XG4gIHJldHVybiB7dmFsdWU6IFN0cmluZy5mcm9tQ2hhckNvZGUoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU1KSl9O1xufTtcblxuZnVuY3Rpb24gY2F0ZWdvcml6ZUV4YW1wbGVzKGV4YW1wbGVzKSB7XG4gIC8vIEEgbGlzdCBvZiBydWxlcyB0aGF0IHRoZSBzeXN0ZW0gbmVlZHMgZXhhbXBsZXMgb2YsIGluIG9yZGVyIHRvIGdlbmVyYXRlIGFuIGV4YW1wbGVcbiAgLy8gICBmb3IgdGhlIGN1cnJlbnQgcnVsZVxuICB2YXIgZXhhbXBsZXNOZWVkZWQgPSBleGFtcGxlcy5maWx0ZXIoZnVuY3Rpb24oZXhhbXBsZSkge1xuICAgIHJldHVybiBleGFtcGxlLmhhc093blByb3BlcnR5KCdleGFtcGxlc05lZWRlZCcpO1xuICB9KVxuICAubWFwKGZ1bmN0aW9uKGV4YW1wbGUpIHsgcmV0dXJuIGV4YW1wbGUuZXhhbXBsZXNOZWVkZWQ7IH0pO1xuXG4gIGV4YW1wbGVzTmVlZGVkID0gZmxhdHRlbihleGFtcGxlc05lZWRlZCk7XG5cbiAgdmFyIHVuaXF1ZUV4YW1wbGVzTmVlZGVkID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZXhhbXBsZXNOZWVkZWQubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY3VycmVudEV4YW1wbGVOZWVkZWQgPSBleGFtcGxlc05lZWRlZFtpXTtcbiAgICB1bmlxdWVFeGFtcGxlc05lZWRlZFtjdXJyZW50RXhhbXBsZU5lZWRlZF0gPSB0cnVlO1xuICB9XG4gIGV4YW1wbGVzTmVlZGVkID0gT2JqZWN0LmtleXModW5pcXVlRXhhbXBsZXNOZWVkZWQpO1xuXG4gIC8vIEEgbGlzdCBvZiBzdWNjZXNzZnVsbHkgZ2VuZXJhdGVkIGV4YW1wbGVzXG4gIHZhciBzdWNjZXNzZnVsRXhhbXBsZXMgPSBleGFtcGxlcy5maWx0ZXIoZnVuY3Rpb24oZXhhbXBsZSkge1xuICAgIHJldHVybiBleGFtcGxlLmhhc093blByb3BlcnR5KCd2YWx1ZScpO1xuICB9KVxuICAubWFwKGZ1bmN0aW9uKGl0ZW0pIHsgcmV0dXJuIGl0ZW0udmFsdWU7IH0pO1xuXG4gIC8vIFRoaXMgZmxhZyByZXR1cm5zIHRydWUgaWYgdGhlIHN5c3RlbSBjYW5ub3QgZ2VuZXJhdGUgdGhlIHJ1bGUgaXQgaXMgY3VycmVudGx5XG4gIC8vICAgYXR0ZW1wdGluZyB0byBnZW5lcmF0ZSwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIG9yIG5vdCBpdCBoYXMgdGhlIGV4YW1wbGVzIGl0IG5lZWRzLlxuICAvLyAgIEN1cnJlbnRseSwgdGhpcyBpcyBvbmx5IHVzZWQgaW4gb3ZlcnJpZGluZyBnZW5lcmF0b3JzIHRvIHByZXZlbnQgdGhlIHN5c3RlbSBmcm9tXG4gIC8vICAgZ2VuZXJhdGluZyBleGFtcGxlcyBmb3IgY2VydGFpbiBydWxlcyAoZS5nLiAnaWRlbnQnKS5cbiAgdmFyIG5lZWRIZWxwID0gZXhhbXBsZXMuc29tZShmdW5jdGlvbihpdGVtKSB7IHJldHVybiBpdGVtLm5lZWRIZWxwOyB9KTtcblxuICByZXR1cm4ge1xuICAgIGV4YW1wbGVzTmVlZGVkOiBleGFtcGxlc05lZWRlZCxcbiAgICBzdWNjZXNzZnVsRXhhbXBsZXM6IHN1Y2Nlc3NmdWxFeGFtcGxlcyxcbiAgICBuZWVkSGVscDogbmVlZEhlbHBcbiAgfTtcbn1cblxucGV4cHJzLkFsdC5wcm90b3R5cGUuZ2VuZXJhdGVFeGFtcGxlID0gZnVuY3Rpb24oZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCwgYWN0dWFscykge1xuICAvLyBpdGVtcyAtPiB0ZXJtRXhhbXBsZXNcbiAgdmFyIHRlcm1FeGFtcGxlcyA9IHRoaXMudGVybXMubWFwKGZ1bmN0aW9uKHRlcm0pIHtcbiAgICByZXR1cm4gdGVybS5nZW5lcmF0ZUV4YW1wbGUoZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCwgYWN0dWFscyk7XG4gIH0pO1xuXG4gIHZhciBjYXRlZ29yaXplZEV4YW1wbGVzID0gY2F0ZWdvcml6ZUV4YW1wbGVzKHRlcm1FeGFtcGxlcyk7XG5cbiAgdmFyIGV4YW1wbGVzTmVlZGVkID0gY2F0ZWdvcml6ZWRFeGFtcGxlcy5leGFtcGxlc05lZWRlZDtcbiAgdmFyIHN1Y2Nlc3NmdWxFeGFtcGxlcyA9IGNhdGVnb3JpemVkRXhhbXBsZXMuc3VjY2Vzc2Z1bEV4YW1wbGVzO1xuICB2YXIgbmVlZEhlbHAgPSBjYXRlZ29yaXplZEV4YW1wbGVzLm5lZWRIZWxwO1xuXG4gIHZhciBhbnMgPSB7fTtcblxuICAvLyBBbHQgY2FuIGNvbnRhaW4gYm90aCBhbiBleGFtcGxlIGFuZCBhIHJlcXVlc3QgZm9yIGV4YW1wbGVzXG4gIGlmIChzdWNjZXNzZnVsRXhhbXBsZXMubGVuZ3RoID4gMCkge1xuICAgIHZhciBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc3VjY2Vzc2Z1bEV4YW1wbGVzLmxlbmd0aCk7XG4gICAgYW5zLnZhbHVlID0gc3VjY2Vzc2Z1bEV4YW1wbGVzW2ldO1xuICB9XG4gIGlmIChleGFtcGxlc05lZWRlZC5sZW5ndGggPiAwKSB7XG4gICAgYW5zLmV4YW1wbGVzTmVlZGVkID0gZXhhbXBsZXNOZWVkZWQ7XG4gIH1cbiAgYW5zLm5lZWRIZWxwID0gbmVlZEhlbHA7XG5cbiAgcmV0dXJuIGFucztcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLmdlbmVyYXRlRXhhbXBsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMpIHtcbiAgdmFyIGZhY3RvckV4YW1wbGVzID0gdGhpcy5mYWN0b3JzLm1hcChmdW5jdGlvbihmYWN0b3IpIHtcbiAgICByZXR1cm4gZmFjdG9yLmdlbmVyYXRlRXhhbXBsZShncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzKTtcbiAgfSk7XG4gIHZhciBjYXRlZ29yaXplZEV4YW1wbGVzID0gY2F0ZWdvcml6ZUV4YW1wbGVzKGZhY3RvckV4YW1wbGVzKTtcblxuICB2YXIgZXhhbXBsZXNOZWVkZWQgPSBjYXRlZ29yaXplZEV4YW1wbGVzLmV4YW1wbGVzTmVlZGVkO1xuICB2YXIgc3VjY2Vzc2Z1bEV4YW1wbGVzID0gY2F0ZWdvcml6ZWRFeGFtcGxlcy5zdWNjZXNzZnVsRXhhbXBsZXM7XG4gIHZhciBuZWVkSGVscCA9IGNhdGVnb3JpemVkRXhhbXBsZXMubmVlZEhlbHA7XG5cbiAgdmFyIGFucyA9IHt9O1xuXG4gIC8vIEluIGEgU2VxLCBhbGwgcGllY2VzIG11c3Qgc3VjY2VlZCBpbiBvcmRlciB0byBoYXZlIGEgc3VjY2Vzc2Z1bCBleGFtcGxlLlxuICBpZiAoZXhhbXBsZXNOZWVkZWQubGVuZ3RoID4gMCB8fCBuZWVkSGVscCkge1xuICAgIGFucy5leGFtcGxlc05lZWRlZCA9IGV4YW1wbGVzTmVlZGVkO1xuICAgIGFucy5uZWVkSGVscCA9IG5lZWRIZWxwO1xuICB9IGVsc2Uge1xuICAgIGFucy52YWx1ZSA9IHN1Y2Nlc3NmdWxFeGFtcGxlcy5qb2luKGluU3ludGFjdGljQ29udGV4dCA/ICcgJyA6ICcnKTtcbiAgfVxuXG4gIHJldHVybiBhbnM7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmdlbmVyYXRlRXhhbXBsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMpIHtcbiAgdmFyIGFucyA9IHt9O1xuXG4gIHZhciBydWxlTmFtZSA9IHRoaXMuc3Vic3RpdHV0ZVBhcmFtcyhhY3R1YWxzKS50b1N0cmluZygpO1xuXG4gIGlmICghZXhhbXBsZXMuaGFzT3duUHJvcGVydHkocnVsZU5hbWUpKSB7XG4gICAgYW5zLmV4YW1wbGVzTmVlZGVkID0gW3J1bGVOYW1lXTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcmVsZXZhbnRFeGFtcGxlcyA9IGV4YW1wbGVzW3J1bGVOYW1lXTtcbiAgICB2YXIgaSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHJlbGV2YW50RXhhbXBsZXMubGVuZ3RoKTtcbiAgICBhbnMudmFsdWUgPSByZWxldmFudEV4YW1wbGVzW2ldO1xuICB9XG5cbiAgcmV0dXJuIGFucztcbn07XG5cbi8vIEFzc3VtZXMgdGhhdCB0ZXJtaW5hbCdzIG9iamVjdCBpcyBhbHdheXMgYSBzdHJpbmdcbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuZ2VuZXJhdGVFeGFtcGxlID0gZnVuY3Rpb24oZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCkge1xuICByZXR1cm4ge3ZhbHVlOiB0aGlzLm9ian07XG59O1xuXG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLmdlbmVyYXRlRXhhbXBsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQpIHtcbiAgdmFyIHJhbmdlU2l6ZSA9IHRoaXMudG8uY2hhckNvZGVBdCgwKSAtIHRoaXMuZnJvbS5jaGFyQ29kZUF0KDApO1xuICByZXR1cm4ge3ZhbHVlOiBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgIHRoaXMuZnJvbS5jaGFyQ29kZUF0KDApICsgTWF0aC5mbG9vcihyYW5nZVNpemUgKiBNYXRoLnJhbmRvbSgpKVxuICApfTtcbn07XG5cbi8vIFRPRE86IG1ha2UgJ05vdCcgYW5kICdMb29rYWhlYWQnIGJlaGF2aW91ciBzbWFydGVyXG4vLyBSaWdodCBub3csICdOb3QnIGFuZCAnTG9va2FoZWFkJyBnZW5lcmF0ZSBub3RoaW5nIGFuZCBhc3N1bWUgdGhhdCB3aGF0ZXZlciBmb2xsb3dzIHdpbGxcbi8vICAgd29yayBhY2NvcmRpbmcgdG8gdGhlIGVuY29kZWQgY29uc3RyYWludHMuXG5wZXhwcnMuTm90LnByb3RvdHlwZS5nZW5lcmF0ZUV4YW1wbGUgPSBmdW5jdGlvbihncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0KSB7XG4gIHJldHVybiB7dmFsdWU6ICcnfTtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmdlbmVyYXRlRXhhbXBsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQpIHtcbiAgcmV0dXJuIHt2YWx1ZTogJyd9O1xufTtcblxucGV4cHJzLlBhcmFtLnByb3RvdHlwZS5nZW5lcmF0ZUV4YW1wbGUgPSBmdW5jdGlvbihncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzKSB7XG4gIHJldHVybiBhY3R1YWxzW3RoaXMuaW5kZXhdLmdlbmVyYXRlRXhhbXBsZShncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzKTtcbn07XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTkV4YW1wbGVzKHBleHByLCBncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzLCBudW1UaW1lcykge1xuICB2YXIgaXRlbXMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVRpbWVzOyBpKyspIHtcbiAgICBpdGVtcy5wdXNoKHBleHByLmV4cHIuZ2VuZXJhdGVFeGFtcGxlKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMpKTtcbiAgfVxuXG4gIHZhciBjYXRlZ29yaXplZEV4YW1wbGVzID0gY2F0ZWdvcml6ZUV4YW1wbGVzKGl0ZW1zKTtcblxuICB2YXIgZXhhbXBsZXNOZWVkZWQgPSBjYXRlZ29yaXplZEV4YW1wbGVzLmV4YW1wbGVzTmVlZGVkO1xuICB2YXIgc3VjY2Vzc2Z1bEV4YW1wbGVzID0gY2F0ZWdvcml6ZWRFeGFtcGxlcy5zdWNjZXNzZnVsRXhhbXBsZXM7XG5cbiAgdmFyIGFucyA9IHt9O1xuXG4gIC8vIEl0J3MgYWx3YXlzIGVpdGhlciBvbmUgb3IgdGhlIG90aGVyLlxuICAvLyBUT0RPOiBpbnN0ZWFkIG9mICcgJywgY2FsbCAnc3BhY2VzLmdlbmVyYXRlRXhhbXBsZSgpJ1xuICBhbnMudmFsdWUgPSBzdWNjZXNzZnVsRXhhbXBsZXMuam9pbihpblN5bnRhY3RpY0NvbnRleHQgPyAnICcgOiAnJyk7XG4gIGlmIChleGFtcGxlc05lZWRlZC5sZW5ndGggPiAwKSB7XG4gICAgYW5zLmV4YW1wbGVzTmVlZGVkID0gZXhhbXBsZXNOZWVkZWQ7XG4gIH1cblxuICByZXR1cm4gYW5zO1xufVxuXG5wZXhwcnMuU3Rhci5wcm90b3R5cGUuZ2VuZXJhdGVFeGFtcGxlID0gZnVuY3Rpb24oZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCwgYWN0dWFscykge1xuICByZXR1cm4gZ2VuZXJhdGVORXhhbXBsZXModGhpcywgZ3JhbW1hciwgZXhhbXBsZXMsIGluU3ludGFjdGljQ29udGV4dCwgYWN0dWFscyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpKTtcbn07XG5cbnBleHBycy5QbHVzLnByb3RvdHlwZS5nZW5lcmF0ZUV4YW1wbGUgPSBmdW5jdGlvbihncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzKSB7XG4gIHJldHVybiBnZW5lcmF0ZU5FeGFtcGxlcyh0aGlzLCBncmFtbWFyLCBleGFtcGxlcywgaW5TeW50YWN0aWNDb250ZXh0LCBhY3R1YWxzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMyArIDEpKTtcbn07XG5cbnBleHBycy5PcHQucHJvdG90eXBlLmdlbmVyYXRlRXhhbXBsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMpIHtcbiAgcmV0dXJuIGdlbmVyYXRlTkV4YW1wbGVzKHRoaXMsIGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSk7XG59O1xuXG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLmdlbmVyYXRlRXhhbXBsZSA9IGZ1bmN0aW9uKFxuICAgIGdyYW1tYXIsIGV4YW1wbGVzLCBpblN5bnRhY3RpY0NvbnRleHQsIGFjdHVhbHMpIHtcbiAgdmFyIGNoYXI7XG4gIHN3aXRjaCAodGhpcy5jYXRlZ29yeSkge1xuICAgIGNhc2UgJ0x1JzogY2hhciA9ICfDgSc7IGJyZWFrO1xuICAgIGNhc2UgJ0xsJzogY2hhciA9ICfFjyc7IGJyZWFrO1xuICAgIGNhc2UgJ0x0JzogY2hhciA9ICfHhSc7IGJyZWFrO1xuICAgIGNhc2UgJ0xtJzogY2hhciA9ICfLric7IGJyZWFrO1xuICAgIGNhc2UgJ0xvJzogY2hhciA9ICfGuyc7IGJyZWFrO1xuXG4gICAgY2FzZSAnTmwnOiBjaGFyID0gJ+KGgic7IGJyZWFrO1xuICAgIGNhc2UgJ05kJzogY2hhciA9ICfCvSc7IGJyZWFrO1xuXG4gICAgY2FzZSAnTW4nOiBjaGFyID0gJ1xcdTA0ODcnOyBicmVhaztcbiAgICBjYXNlICdNYyc6IGNoYXIgPSAn4KS/JzsgYnJlYWs7XG5cbiAgICBjYXNlICdQYyc6IGNoYXIgPSAn4oGAJzsgYnJlYWs7XG5cbiAgICBjYXNlICdacyc6IGNoYXIgPSAnXFx1MjAwMSc7IGJyZWFrO1xuXG4gICAgY2FzZSAnTCc6IGNoYXIgPSAnw4EnOyBicmVhaztcbiAgICBjYXNlICdMdG1vJzogY2hhciA9ICfHhSc7IGJyZWFrO1xuICB9XG4gIHJldHVybiB7dmFsdWU6IGNoYXJ9OyAvLyDwn5KpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIFBFeHByID0gcmVxdWlyZSgnLi9wZXhwcnMnKS5QRXhwcjtcbnZhciBwZXhwclZpc2l0b3JzID0gcmVxdWlyZSgnLi9wZXhwci12aXNpdG9ycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBTdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGFjdGlvbnMgPSB7XG4gIEFsdDogZnVuY3Rpb24odGVybXMpIHtcbiAgICAvLyBUaGlzIGlzIG9rIGIvYyBhbGwgdGVybXMgbXVzdCBoYXZlIHRoZSBzYW1lIGFyaXR5IC0tIHRoaXMgcHJvcGVydHkgaXNcbiAgICAvLyBjaGVja2VkIGJ5IHRoZSBHcmFtbWFyIGNvbnN0cnVjdG9yLlxuICAgIHJldHVybiB0ZXJtcy5sZW5ndGggPT09IDAgPyAwIDogdGVybXNbMF0uZ2V0QXJpdHkoKTtcbiAgfSxcbiAgQXBwbHk6IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICByZXR1cm4gMTtcbiAgfSxcbiAgSXRlcjogZnVuY3Rpb24oZXhwcikge1xuICAgIHJldHVybiBleHByLmdldEFyaXR5KCk7XG4gIH0sXG4gIE5vdDogZnVuY3Rpb24oZXhwcikge1xuICAgIHJldHVybiAwO1xuICB9LFxuICBTZXE6IGZ1bmN0aW9uKGZhY3RvcnMpIHtcbiAgICB2YXIgYXJpdHkgPSAwO1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgYXJpdHkgKz0gZmFjdG9yc1tpZHhdLmdldEFyaXR5KCk7XG4gICAgfVxuICAgIHJldHVybiBhcml0eTtcbiAgfVxufTtcblxuYWN0aW9ucy5FeHRlbmQgPSBhY3Rpb25zLkFsdDtcblxuYWN0aW9ucy5Mb29rYWhlYWQgPVxuYWN0aW9ucy5MZXggPVxuYWN0aW9ucy5PcHQgPVxuYWN0aW9ucy5QbHVzID1cbmFjdGlvbnMuU3RhciA9IGZ1bmN0aW9uKGV4cHIpIHtcbiAgcmV0dXJuIGV4cHIuZ2V0QXJpdHkoKTtcbn07XG5cbmFjdGlvbnMuYW55ID1cbmFjdGlvbnMuZW5kID1cbmFjdGlvbnMuVGVybWluYWwgPVxuYWN0aW9ucy5SYW5nZSA9XG5hY3Rpb25zLlBhcmFtID1cbmFjdGlvbnMuVW5pY29kZUNoYXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIDE7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGV4cHJWaXNpdG9ycy5hZGRPcGVyYXRpb24oJ2dldEFyaXR5KCknLCBhY3Rpb25zKTtcblxuLy8gRm9yIG5vdywgaW5zdGFsbCBnZXRBcml0eSBhcyBhIHJlZ3VsYXIgbWV0aG9kIG9uIFBFeHByLCBzbyB0aGF0IG90aGVyIGNvZGVcbi8vIGRvZXMgbm90IG5lZWQgdG8gYmUgYXdhcmUgb2YgcGV4cHJWaXNpdG9ycy5cblBFeHByLnByb3RvdHlwZS5nZXRBcml0eSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcGV4cHJWaXNpdG9ycy53cmFwKHRoaXMpLmdldEFyaXR5KCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qXG4gIENhbGxlZCBhdCBncmFtbWFyIGNyZWF0aW9uIHRpbWUgdG8gcmV3cml0ZSBhIHJ1bGUgYm9keSwgcmVwbGFjaW5nIGVhY2ggcmVmZXJlbmNlIHRvIGEgZm9ybWFsXG4gIHBhcmFtZXRlciB3aXRoIGEgYFBhcmFtYCBub2RlLiBSZXR1cm5zIGEgUEV4cHIgLS0gZWl0aGVyIGEgbmV3IG9uZSwgb3IgdGhlIG9yaWdpbmFsIG9uZSBpZlxuICBpdCB3YXMgbW9kaWZpZWQgaW4gcGxhY2UuXG4qL1xucGV4cHJzLlBFeHByLnByb3RvdHlwZS5pbnRyb2R1Y2VQYXJhbXMgPSBjb21tb24uYWJzdHJhY3QoJ2ludHJvZHVjZVBhcmFtcycpO1xuXG5wZXhwcnMuYW55LmludHJvZHVjZVBhcmFtcyA9XG5wZXhwcnMuZW5kLmludHJvZHVjZVBhcmFtcyA9XG5wZXhwcnMuVGVybWluYWwucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9XG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9XG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9XG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9IGZ1bmN0aW9uKGZvcm1hbHMpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5pbnRyb2R1Y2VQYXJhbXMgPSBmdW5jdGlvbihmb3JtYWxzKSB7XG4gIHRoaXMudGVybXMuZm9yRWFjaChmdW5jdGlvbih0ZXJtLCBpZHgsIHRlcm1zKSB7XG4gICAgdGVybXNbaWR4XSA9IHRlcm0uaW50cm9kdWNlUGFyYW1zKGZvcm1hbHMpO1xuICB9KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5pbnRyb2R1Y2VQYXJhbXMgPSBmdW5jdGlvbihmb3JtYWxzKSB7XG4gIHRoaXMuZmFjdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKGZhY3RvciwgaWR4LCBmYWN0b3JzKSB7XG4gICAgZmFjdG9yc1tpZHhdID0gZmFjdG9yLmludHJvZHVjZVBhcmFtcyhmb3JtYWxzKTtcbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxucGV4cHJzLkl0ZXIucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9XG5wZXhwcnMuTm90LnByb3RvdHlwZS5pbnRyb2R1Y2VQYXJhbXMgPVxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuaW50cm9kdWNlUGFyYW1zID1cbnBleHBycy5MZXgucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9IGZ1bmN0aW9uKGZvcm1hbHMpIHtcbiAgdGhpcy5leHByID0gdGhpcy5leHByLmludHJvZHVjZVBhcmFtcyhmb3JtYWxzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmludHJvZHVjZVBhcmFtcyA9IGZ1bmN0aW9uKGZvcm1hbHMpIHtcbiAgdmFyIGluZGV4ID0gZm9ybWFscy5pbmRleE9mKHRoaXMucnVsZU5hbWUpO1xuICBpZiAoaW5kZXggPj0gMCkge1xuICAgIGlmICh0aGlzLmFyZ3MubGVuZ3RoID4gMCkge1xuICAgICAgLy8gVE9ETzogU2hvdWxkIHRoaXMgYmUgc3VwcG9ydGVkPyBTZWUgaXNzdWUgIzY0LlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXJpemVkIHJ1bGVzIGNhbm5vdCBiZSBwYXNzZWQgYXMgYXJndW1lbnRzIHRvIGFub3RoZXIgcnVsZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuUGFyYW0oaW5kZXgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYXJncy5mb3JFYWNoKGZ1bmN0aW9uKGFyZywgaWR4LCBhcmdzKSB7XG4gICAgICBhcmdzW2lkeF0gPSBhcmcuaW50cm9kdWNlUGFyYW1zKGZvcm1hbHMpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFJldHVybnMgYHRydWVgIGlmIHRoaXMgcGFyc2luZyBleHByZXNzaW9uIG1heSBhY2NlcHQgd2l0aG91dCBjb25zdW1pbmcgYW55IGlucHV0LlxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5pc051bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICByZXR1cm4gdGhpcy5faXNOdWxsYWJsZShncmFtbWFyLCBPYmplY3QuY3JlYXRlKG51bGwpKTtcbn07XG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUuX2lzTnVsbGFibGUgPSBjb21tb24uYWJzdHJhY3QoJ19pc051bGxhYmxlJyk7XG5cbnBleHBycy5hbnkuX2lzTnVsbGFibGUgPVxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS5faXNOdWxsYWJsZSA9XG5wZXhwcnMuUGFyYW0ucHJvdG90eXBlLl9pc051bGxhYmxlID1cbnBleHBycy5QbHVzLnByb3RvdHlwZS5faXNOdWxsYWJsZSA9XG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLl9pc051bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hciwgbWVtbykge1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5wZXhwcnMuZW5kLl9pc051bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hciwgbWVtbykge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUuX2lzTnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBtZW1vKSB7XG4gIGlmICh0eXBlb2YgdGhpcy5vYmogPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gVGhpcyBpcyBhbiBvdmVyLXNpbXBsaWZpY2F0aW9uOiBpdCdzIG9ubHkgY29ycmVjdCBpZiB0aGUgaW5wdXQgaXMgYSBzdHJpbmcuIElmIGl0J3MgYW4gYXJyYXlcbiAgICAvLyBvciBhbiBvYmplY3QsIHRoZW4gdGhlIGVtcHR5IHN0cmluZyBwYXJzaW5nIGV4cHJlc3Npb24gaXMgbm90IG51bGxhYmxlLlxuICAgIHJldHVybiB0aGlzLm9iaiA9PT0gJyc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5faXNOdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIG1lbW8pIHtcbiAgcmV0dXJuIHRoaXMudGVybXMubGVuZ3RoID09PSAwIHx8XG4gICAgICB0aGlzLnRlcm1zLnNvbWUoZnVuY3Rpb24odGVybSkgeyByZXR1cm4gdGVybS5faXNOdWxsYWJsZShncmFtbWFyLCBtZW1vKTsgfSk7XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5faXNOdWxsYWJsZSA9IGZ1bmN0aW9uKGdyYW1tYXIsIG1lbW8pIHtcbiAgcmV0dXJuIHRoaXMuZmFjdG9ycy5ldmVyeShmdW5jdGlvbihmYWN0b3IpIHsgcmV0dXJuIGZhY3Rvci5faXNOdWxsYWJsZShncmFtbWFyLCBtZW1vKTsgfSk7XG59O1xuXG5wZXhwcnMuU3Rhci5wcm90b3R5cGUuX2lzTnVsbGFibGUgPVxucGV4cHJzLk9wdC5wcm90b3R5cGUuX2lzTnVsbGFibGUgPVxucGV4cHJzLk5vdC5wcm90b3R5cGUuX2lzTnVsbGFibGUgPVxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuX2lzTnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBtZW1vKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxucGV4cHJzLkxleC5wcm90b3R5cGUuX2lzTnVsbGFibGUgPSBmdW5jdGlvbihncmFtbWFyLCBtZW1vKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuX2lzTnVsbGFibGUoZ3JhbW1hciwgbWVtbyk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLl9pc051bGxhYmxlID0gZnVuY3Rpb24oZ3JhbW1hciwgbWVtbykge1xuICB2YXIga2V5ID0gdGhpcy50b01lbW9LZXkoKTtcbiAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobWVtbywga2V5KSkge1xuICAgIHZhciBib2R5ID0gZ3JhbW1hci5ydWxlc1t0aGlzLnJ1bGVOYW1lXS5ib2R5O1xuICAgIHZhciBpbmxpbmVkID0gYm9keS5zdWJzdGl0dXRlUGFyYW1zKHRoaXMuYXJncyk7XG4gICAgbWVtb1trZXldID0gZmFsc2U7ICAvLyBQcmV2ZW50IGluZmluaXRlIHJlY3Vyc2lvbiBmb3IgcmVjdXJzaXZlIHJ1bGVzLlxuICAgIG1lbW9ba2V5XSA9IGlubGluZWQuX2lzTnVsbGFibGUoZ3JhbW1hciwgbWVtbyk7XG4gIH1cbiAgcmV0dXJuIG1lbW9ba2V5XTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gZ2V0TWV0YUluZm8oZXhwciwgZ3JhbW1hckludGVydmFsKSB7XG4gIHZhciBtZXRhSW5mbyA9IHt9O1xuICBpZiAoZXhwci5zb3VyY2UgJiYgZ3JhbW1hckludGVydmFsKSB7XG4gICAgdmFyIGFkanVzdGVkID0gZXhwci5zb3VyY2UucmVsYXRpdmVUbyhncmFtbWFySW50ZXJ2YWwpO1xuICAgIG1ldGFJbmZvLnNvdXJjZUludGVydmFsID0gW2FkanVzdGVkLnN0YXJ0SWR4LCBhZGp1c3RlZC5lbmRJZHhdO1xuICB9XG4gIHJldHVybiBtZXRhSW5mbztcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gY29tbW9uLmFic3RyYWN0KCdvdXRwdXRSZWNpcGUnKTtcblxucGV4cHJzLmFueS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpIHtcbiAgcmV0dXJuIFsnYW55JywgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKV07XG59O1xuXG5wZXhwcnMuZW5kLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCkge1xuICByZXR1cm4gWydlbmQnLCBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpXTtcbn07XG5cbnBleHBycy5UZXJtaW5hbC5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbXG4gICAgJ3Rlcm1pbmFsJyxcbiAgICBnZXRNZXRhSW5mbyh0aGlzLCBncmFtbWFySW50ZXJ2YWwpLFxuICAgIHRoaXMub2JqXG4gIF07XG59O1xuXG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCkge1xuICByZXR1cm4gW1xuICAgICdyYW5nZScsXG4gICAgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKSxcbiAgICB0aGlzLmZyb20sXG4gICAgdGhpcy50b1xuICBdO1xufTtcblxucGV4cHJzLlBhcmFtLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbihmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpIHtcbiAgcmV0dXJuIFtcbiAgICAncGFyYW0nLFxuICAgIGdldE1ldGFJbmZvKHRoaXMsIGdyYW1tYXJJbnRlcnZhbCksXG4gICAgdGhpcy5pbmRleFxuICBdO1xufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbXG4gICAgJ2FsdCcsXG4gICAgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKVxuICBdLmNvbmNhdCh0aGlzLnRlcm1zLm1hcChmdW5jdGlvbih0ZXJtKSB7XG4gICAgcmV0dXJuIHRlcm0ub3V0cHV0UmVjaXBlKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCk7XG4gIH0pKTtcbn07XG5cbnBleHBycy5FeHRlbmQucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCkge1xuICB2YXIgZXh0ZW5zaW9uID0gdGhpcy50ZXJtc1swXTsgLy8gW2V4dGVuc2lvbiwgb3JnaW5hbF1cbiAgcmV0dXJuIGV4dGVuc2lvbi5vdXRwdXRSZWNpcGUoZm9ybWFscywgZ3JhbW1hckludGVydmFsKTtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCkge1xuICByZXR1cm4gW1xuICAgICdzZXEnLFxuICAgIGdldE1ldGFJbmZvKHRoaXMsIGdyYW1tYXJJbnRlcnZhbClcbiAgXS5jb25jYXQodGhpcy5mYWN0b3JzLm1hcChmdW5jdGlvbihmYWN0b3IpIHtcbiAgICByZXR1cm4gZmFjdG9yLm91dHB1dFJlY2lwZShmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpO1xuICB9KSk7XG59O1xuXG5wZXhwcnMuU3Rhci5wcm90b3R5cGUub3V0cHV0UmVjaXBlID1cbnBleHBycy5QbHVzLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPVxucGV4cHJzLk9wdC5wcm90b3R5cGUub3V0cHV0UmVjaXBlID1cbnBleHBycy5Ob3QucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9XG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPVxucGV4cHJzLkxleC5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbXG4gICAgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lLnRvTG93ZXJDYXNlKCksXG4gICAgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKSxcbiAgICB0aGlzLmV4cHIub3V0cHV0UmVjaXBlKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbClcbiAgXTtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24oZm9ybWFscywgZ3JhbW1hckludGVydmFsKSB7XG4gIHJldHVybiBbXG4gICAgJ2FwcCcsXG4gICAgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKSxcbiAgICB0aGlzLnJ1bGVOYW1lLFxuICAgIHRoaXMuYXJncy5tYXAoZnVuY3Rpb24oYXJnKSB7XG4gICAgICByZXR1cm4gYXJnLm91dHB1dFJlY2lwZShmb3JtYWxzLCBncmFtbWFySW50ZXJ2YWwpO1xuICAgIH0pXG4gIF07XG59O1xuXG5wZXhwcnMuVW5pY29kZUNoYXIucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKGZvcm1hbHMsIGdyYW1tYXJJbnRlcnZhbCkge1xuICByZXR1cm4gW1xuICAgICd1bmljb2RlQ2hhcicsXG4gICAgZ2V0TWV0YUluZm8odGhpcywgZ3JhbW1hckludGVydmFsKSxcbiAgICB0aGlzLmNhdGVnb3J5XG4gIF07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qXG4gIFJldHVybnMgYSBQRXhwciB0aGF0IHJlc3VsdHMgZnJvbSByZWN1cnNpdmVseSByZXBsYWNpbmcgZXZlcnkgZm9ybWFsIHBhcmFtZXRlciAoaS5lLiwgaW5zdGFuY2VcbiAgb2YgYFBhcmFtYCkgaW5zaWRlIHRoaXMgUEV4cHIgd2l0aCBpdHMgYWN0dWFsIHZhbHVlIGZyb20gYGFjdHVhbHNgIChhbiBBcnJheSkuXG5cbiAgVGhlIHJlY2VpdmVyIG11c3Qgbm90IGJlIG1vZGlmaWVkOyBhIG5ldyBQRXhwciBtdXN0IGJlIHJldHVybmVkIGlmIGFueSByZXBsYWNlbWVudCBpcyBuZWNlc3NhcnkuXG4qL1xuLy8gZnVuY3Rpb24oYWN0dWFscykgeyAuLi4gfVxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID0gY29tbW9uLmFic3RyYWN0KCdzdWJzdGl0dXRlUGFyYW1zJyk7XG5cbnBleHBycy5hbnkuc3Vic3RpdHV0ZVBhcmFtcyA9XG5wZXhwcnMuZW5kLnN1YnN0aXR1dGVQYXJhbXMgPVxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID1cbnBleHBycy5SYW5nZS5wcm90b3R5cGUuc3Vic3RpdHV0ZVBhcmFtcyA9XG5wZXhwcnMuVGVybWluYWwucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPVxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID0gZnVuY3Rpb24oYWN0dWFscykge1xuICByZXR1cm4gdGhpcztcbn07XG5cbnBleHBycy5QYXJhbS5wcm90b3R5cGUuc3Vic3RpdHV0ZVBhcmFtcyA9IGZ1bmN0aW9uKGFjdHVhbHMpIHtcbiAgcmV0dXJuIGFjdHVhbHNbdGhpcy5pbmRleF07XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID0gZnVuY3Rpb24oYWN0dWFscykge1xuICByZXR1cm4gbmV3IHBleHBycy5BbHQoXG4gICAgICB0aGlzLnRlcm1zLm1hcChmdW5jdGlvbih0ZXJtKSB7IHJldHVybiB0ZXJtLnN1YnN0aXR1dGVQYXJhbXMoYWN0dWFscyk7IH0pKTtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPSBmdW5jdGlvbihhY3R1YWxzKSB7XG4gIHJldHVybiBuZXcgcGV4cHJzLlNlcShcbiAgICAgIHRoaXMuZmFjdG9ycy5tYXAoZnVuY3Rpb24oZmFjdG9yKSB7IHJldHVybiBmYWN0b3Iuc3Vic3RpdHV0ZVBhcmFtcyhhY3R1YWxzKTsgfSkpO1xufTtcblxucGV4cHJzLkl0ZXIucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPVxucGV4cHJzLk5vdC5wcm90b3R5cGUuc3Vic3RpdHV0ZVBhcmFtcyA9XG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5zdWJzdGl0dXRlUGFyYW1zID1cbnBleHBycy5MZXgucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPSBmdW5jdGlvbihhY3R1YWxzKSB7XG4gIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmV4cHIuc3Vic3RpdHV0ZVBhcmFtcyhhY3R1YWxzKSk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLnN1YnN0aXR1dGVQYXJhbXMgPSBmdW5jdGlvbihhY3R1YWxzKSB7XG4gIGlmICh0aGlzLmFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gQXZvaWQgbWFraW5nIGEgY29weSBvZiB0aGlzIGFwcGxpY2F0aW9uLCBhcyBhbiBvcHRpbWl6YXRpb25cbiAgICByZXR1cm4gdGhpcztcbiAgfSBlbHNlIHtcbiAgICB2YXIgYXJncyA9IHRoaXMuYXJncy5tYXAoZnVuY3Rpb24oYXJnKSB7IHJldHVybiBhcmcuc3Vic3RpdHV0ZVBhcmFtcyhhY3R1YWxzKTsgfSk7XG4gICAgcmV0dXJuIG5ldyBwZXhwcnMuQXBwbHkodGhpcy5ydWxlTmFtZSwgYXJncyk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycycpO1xuXG52YXIgY29weVdpdGhvdXREdXBsaWNhdGVzID0gY29tbW9uLmNvcHlXaXRob3V0RHVwbGljYXRlcztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIGlzUmVzdHJpY3RlZEpTSWRlbnRpZmllcihzdHIpIHtcbiAgcmV0dXJuIC9eW2EtekEtWl8kXVswLTlhLXpBLVpfJF0qJC8udGVzdChzdHIpO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlRHVwbGljYXRlZE5hbWVzKGFyZ3VtZW50TmFtZUxpc3QpIHtcbiAgLy8gYGNvdW50YCBpcyB1c2VkIHRvIHJlY29yZCB0aGUgbnVtYmVyIG9mIHRpbWVzIGVhY2ggYXJndW1lbnQgbmFtZSBvY2N1cnMgaW4gdGhlIGxpc3QsXG4gIC8vIHRoaXMgaXMgdXNlZnVsIGZvciBjaGVja2luZyBkdXBsaWNhdGVkIGFyZ3VtZW50IG5hbWUuIEl0IG1hcHMgYXJndW1lbnQgbmFtZXMgdG8gaW50cy5cbiAgdmFyIGNvdW50ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgYXJndW1lbnROYW1lTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGFyZ05hbWUpIHtcbiAgICBjb3VudFthcmdOYW1lXSA9IChjb3VudFthcmdOYW1lXSB8fCAwKSArIDE7XG4gIH0pO1xuXG4gIC8vIEFwcGVuZCBzdWJzY3JpcHRzICgnXzEnLCAnXzInLCAuLi4pIHRvIGR1cGxpY2F0ZSBhcmd1bWVudCBuYW1lcy5cbiAgT2JqZWN0LmtleXMoY291bnQpLmZvckVhY2goZnVuY3Rpb24oZHVwQXJnTmFtZSkge1xuICAgIGlmIChjb3VudFtkdXBBcmdOYW1lXSA8PSAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVGhpcyBuYW1lIHNob3dzIHVwIG1vcmUgdGhhbiBvbmNlLCBzbyBhZGQgc3Vic2NyaXB0cy5cbiAgICB2YXIgc3Vic2NyaXB0ID0gMTtcbiAgICBhcmd1bWVudE5hbWVMaXN0LmZvckVhY2goZnVuY3Rpb24oYXJnTmFtZSwgaWR4KSB7XG4gICAgICBpZiAoYXJnTmFtZSA9PT0gZHVwQXJnTmFtZSkge1xuICAgICAgICBhcmd1bWVudE5hbWVMaXN0W2lkeF0gPSBhcmdOYW1lICsgJ18nICsgc3Vic2NyaXB0Kys7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLypcbiAgUmV0dXJucyBhIGxpc3Qgb2Ygc3RyaW5ncyB0aGF0IHdpbGwgYmUgdXNlZCBhcyB0aGUgZGVmYXVsdCBhcmd1bWVudCBuYW1lcyBmb3IgaXRzIHJlY2VpdmVyXG4gIChhIHBleHByKSBpbiBhIHNlbWFudGljIGFjdGlvbi4gVGhpcyBpcyB1c2VkIGV4Y2x1c2l2ZWx5IGJ5IHRoZSBTZW1hbnRpY3MgRWRpdG9yLlxuXG4gIGBmaXJzdEFyZ0luZGV4YCBpcyB0aGUgMS1iYXNlZCBpbmRleCBvZiB0aGUgZmlyc3QgYXJndW1lbnQgbmFtZSB0aGF0IHdpbGwgYmUgZ2VuZXJhdGVkIGZvciB0aGlzXG4gIHBleHByLiBJdCBlbmFibGVzIHVzIHRvIG5hbWUgYXJndW1lbnRzIHBvc2l0aW9uYWxseSwgZS5nLiwgaWYgdGhlIHNlY29uZCBhcmd1bWVudCBpcyBhXG4gIG5vbi1hbHBoYW51bWVyaWMgdGVybWluYWwgbGlrZSBcIitcIiwgaXQgd2lsbCBiZSBuYW1lZCAnJDInLlxuXG4gIGBub0R1cENoZWNrYCBpcyB0cnVlIGlmIHRoZSBjYWxsZXIgb2YgYHRvQXJndW1lbnROYW1lTGlzdGAgaXMgbm90IGEgdG9wIGxldmVsIGNhbGxlci4gSXQgZW5hYmxlc1xuICB1cyB0byBhdm9pZCBuZXN0ZWQgZHVwbGljYXRpb24gc3Vic2NyaXB0cyBhcHBlbmRpbmcsIGUuZy4sICdfMV8xJywgJ18xXzInLCBieSBvbmx5IGNoZWNraW5nXG4gIGR1cGxpY2F0ZXMgYXQgdGhlIHRvcCBsZXZlbC5cblxuICBIZXJlIGlzIGEgbW9yZSBlbGFib3JhdGUgZXhhbXBsZSB0aGF0IGlsbHVzdHJhdGVzIGhvdyB0aGlzIG1ldGhvZCB3b3JrczpcbiAgYChhIFwiK1wiIGIpLnRvQXJndW1lbnROYW1lTGlzdCgxKWAgZXZhbHVhdGVzIHRvIGBbJ2EnLCAnJDInLCAnYiddYCB3aXRoIHRoZSBmb2xsb3dpbmcgcmVjdXJzaXZlXG4gIGNhbGxzOlxuXG4gICAgKGEpLnRvQXJndW1lbnROYW1lTGlzdCgxKSAtPiBbJ2EnXSxcbiAgICAoXCIrXCIpLnRvQXJndW1lbnROYW1lTGlzdCgyKSAtPiBbJyQyJ10sXG4gICAgKGIpLnRvQXJndW1lbnROYW1lTGlzdCgzKSAtPiBbJ2InXVxuXG4gIE5vdGVzOlxuICAqIFRoaXMgbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgb24gd2VsbC1mb3JtZWQgZXhwcmVzc2lvbnMsIGUuZy4sIHRoZSByZWNlaXZlciBtdXN0XG4gICAgbm90IGhhdmUgYW55IEFsdCBzdWItZXhwcmVzc2lvbnMgd2l0aCBpbmNvbnNpc3RlbnQgYXJpdGllcy5cbiAgKiBlLmdldEFyaXR5KCkgPT09IGUudG9Bcmd1bWVudE5hbWVMaXN0KDEpLmxlbmd0aFxuKi9cbi8vIGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spIHsgLi4uIH1cbnBleHBycy5QRXhwci5wcm90b3R5cGUudG9Bcmd1bWVudE5hbWVMaXN0ID0gY29tbW9uLmFic3RyYWN0KCd0b0FyZ3VtZW50TmFtZUxpc3QnKTtcblxucGV4cHJzLmFueS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKSB7XG4gIHJldHVybiBbJ2FueSddO1xufTtcblxucGV4cHJzLmVuZC50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKSB7XG4gIHJldHVybiBbJ2VuZCddO1xufTtcblxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKSB7XG4gIGlmICh0eXBlb2YgdGhpcy5vYmogPT09ICdzdHJpbmcnICYmIC9eW19hLXpBLVowLTldKyQvLnRlc3QodGhpcy5vYmopKSB7XG4gICAgLy8gSWYgdGhpcyB0ZXJtaW5hbCBpcyBhIHZhbGlkIHN1ZmZpeCBmb3IgYSBKUyBpZGVudGlmaWVyLCBqdXN0IHByZXBlbmQgaXQgd2l0aCAnXydcbiAgICByZXR1cm4gWydfJyArIHRoaXMub2JqXTtcbiAgfSBlbHNlIHtcbiAgICAvLyBPdGhlcndpc2UsIG5hbWUgaXQgcG9zaXRpb25hbGx5LlxuICAgIHJldHVybiBbJyQnICsgZmlyc3RBcmdJbmRleF07XG4gIH1cbn07XG5cbnBleHBycy5SYW5nZS5wcm90b3R5cGUudG9Bcmd1bWVudE5hbWVMaXN0ID0gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaykge1xuICB2YXIgYXJnTmFtZSA9IHRoaXMuZnJvbSArICdfdG9fJyArIHRoaXMudG87XG4gIC8vIElmIHRoZSBgYXJnTmFtZWAgaXMgbm90IHZhbGlkIHRoZW4gdHJ5IHRvIHByZXBlbmQgYSBgX2AuXG4gIGlmICghaXNSZXN0cmljdGVkSlNJZGVudGlmaWVyKGFyZ05hbWUpKSB7XG4gICAgYXJnTmFtZSA9ICdfJyArIGFyZ05hbWU7XG4gIH1cbiAgLy8gSWYgdGhlIGBhcmdOYW1lYCBzdGlsbCBub3QgdmFsaWQgYWZ0ZXIgcHJlcGVuZGluZyBhIGBfYCwgdGhlbiBuYW1lIGl0IHBvc2l0aW9uYWxseS5cbiAgaWYgKCFpc1Jlc3RyaWN0ZWRKU0lkZW50aWZpZXIoYXJnTmFtZSkpIHtcbiAgICBhcmdOYW1lID0gJyQnICsgZmlyc3RBcmdJbmRleDtcbiAgfVxuICByZXR1cm4gW2FyZ05hbWVdO1xufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUudG9Bcmd1bWVudE5hbWVMaXN0ID0gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaykge1xuICAvLyBgdGVybUFyZ05hbWVMaXN0c2AgaXMgYW4gYXJyYXkgb2YgYXJyYXlzIHdoZXJlIGVhY2ggcm93IGlzIHRoZVxuICAvLyBhcmd1bWVudCBuYW1lIGxpc3QgdGhhdCBjb3JyZXNwb25kcyB0byBhIHRlcm0gaW4gdGhpcyBhbHRlcm5hdGlvbi5cbiAgdmFyIHRlcm1BcmdOYW1lTGlzdHMgPSB0aGlzLnRlcm1zLm1hcChmdW5jdGlvbih0ZXJtKSB7XG4gICAgcmV0dXJuIHRlcm0udG9Bcmd1bWVudE5hbWVMaXN0KGZpcnN0QXJnSW5kZXgsIHRydWUpO1xuICB9KTtcblxuICB2YXIgYXJndW1lbnROYW1lTGlzdCA9IFtdO1xuICB2YXIgbnVtQXJncyA9IHRlcm1BcmdOYW1lTGlzdHNbMF0ubGVuZ3RoO1xuICBmb3IgKHZhciBjb2xJZHggPSAwOyBjb2xJZHggPCBudW1BcmdzOyBjb2xJZHgrKykge1xuICAgIHZhciBjb2wgPSBbXTtcbiAgICBmb3IgKHZhciByb3dJZHggPSAwOyByb3dJZHggPCB0aGlzLnRlcm1zLmxlbmd0aDsgcm93SWR4KyspIHtcbiAgICAgIGNvbC5wdXNoKHRlcm1BcmdOYW1lTGlzdHNbcm93SWR4XVtjb2xJZHhdKTtcbiAgICB9XG4gICAgdmFyIHVuaXF1ZU5hbWVzID0gY29weVdpdGhvdXREdXBsaWNhdGVzKGNvbCk7XG4gICAgYXJndW1lbnROYW1lTGlzdC5wdXNoKHVuaXF1ZU5hbWVzLmpvaW4oJ19vcl8nKSk7XG4gIH1cblxuICBpZiAoIW5vRHVwQ2hlY2spIHtcbiAgICByZXNvbHZlRHVwbGljYXRlZE5hbWVzKGFyZ3VtZW50TmFtZUxpc3QpO1xuICB9XG4gIHJldHVybiBhcmd1bWVudE5hbWVMaXN0O1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUudG9Bcmd1bWVudE5hbWVMaXN0ID0gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaykge1xuICAvLyBHZW5lcmF0ZSB0aGUgYXJndW1lbnQgbmFtZSBsaXN0LCB3aXRob3V0IHdvcnJ5aW5nIGFib3V0IGR1cGxpY2F0ZXMuXG4gIHZhciBhcmd1bWVudE5hbWVMaXN0ID0gW107XG4gIHRoaXMuZmFjdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKGZhY3Rvcikge1xuICAgIHZhciBmYWN0b3JBcmd1bWVudE5hbWVMaXN0ID0gZmFjdG9yLnRvQXJndW1lbnROYW1lTGlzdChmaXJzdEFyZ0luZGV4LCB0cnVlKTtcbiAgICBhcmd1bWVudE5hbWVMaXN0ID0gYXJndW1lbnROYW1lTGlzdC5jb25jYXQoZmFjdG9yQXJndW1lbnROYW1lTGlzdCk7XG5cbiAgICAvLyBTaGlmdCB0aGUgZmlyc3RBcmdJbmRleCB0byB0YWtlIHRoaXMgZmFjdG9yJ3MgYXJndW1lbnQgbmFtZXMgaW50byBhY2NvdW50LlxuICAgIGZpcnN0QXJnSW5kZXggKz0gZmFjdG9yQXJndW1lbnROYW1lTGlzdC5sZW5ndGg7XG4gIH0pO1xuICBpZiAoIW5vRHVwQ2hlY2spIHtcbiAgICByZXNvbHZlRHVwbGljYXRlZE5hbWVzKGFyZ3VtZW50TmFtZUxpc3QpO1xuICB9XG4gIHJldHVybiBhcmd1bWVudE5hbWVMaXN0O1xufTtcblxucGV4cHJzLkl0ZXIucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spIHtcbiAgdmFyIGFyZ3VtZW50TmFtZUxpc3QgPSB0aGlzLmV4cHIudG9Bcmd1bWVudE5hbWVMaXN0KGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spXG4gICAgLm1hcChmdW5jdGlvbihleHByQXJndW1lbnRTdHJpbmcpIHtcbiAgICAgIHJldHVybiBleHByQXJndW1lbnRTdHJpbmdbZXhwckFyZ3VtZW50U3RyaW5nLmxlbmd0aCAtIDFdID09PSAncycgP1xuICAgICAgICAgIGV4cHJBcmd1bWVudFN0cmluZyArICdlcycgOlxuICAgICAgICAgIGV4cHJBcmd1bWVudFN0cmluZyArICdzJztcbiAgICB9KTtcbiAgaWYgKCFub0R1cENoZWNrKSB7XG4gICAgcmVzb2x2ZUR1cGxpY2F0ZWROYW1lcyhhcmd1bWVudE5hbWVMaXN0KTtcbiAgfVxuICByZXR1cm4gYXJndW1lbnROYW1lTGlzdDtcbn07XG5cbnBleHBycy5PcHQucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spIHtcbiAgcmV0dXJuIHRoaXMuZXhwci50b0FyZ3VtZW50TmFtZUxpc3QoZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaykubWFwKGZ1bmN0aW9uKGFyZ05hbWUpIHtcbiAgICByZXR1cm4gJ29wdCcgKyBhcmdOYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBhcmdOYW1lLnNsaWNlKDEpO1xuICB9KTtcbn07XG5cbnBleHBycy5Ob3QucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spIHtcbiAgcmV0dXJuIFtdO1xufTtcblxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUudG9Bcmd1bWVudE5hbWVMaXN0ID1cbnBleHBycy5MZXgucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spIHtcbiAgcmV0dXJuIHRoaXMuZXhwci50b0FyZ3VtZW50TmFtZUxpc3QoZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjayk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLnRvQXJndW1lbnROYW1lTGlzdCA9IGZ1bmN0aW9uKGZpcnN0QXJnSW5kZXgsIG5vRHVwQ2hlY2spIHtcbiAgcmV0dXJuIFt0aGlzLnJ1bGVOYW1lXTtcbn07XG5cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUudG9Bcmd1bWVudE5hbWVMaXN0ID0gZnVuY3Rpb24oZmlyc3RBcmdJbmRleCwgbm9EdXBDaGVjaykge1xuICByZXR1cm4gWyckJyArIGZpcnN0QXJnSW5kZXhdO1xufTtcblxucGV4cHJzLlBhcmFtLnByb3RvdHlwZS50b0FyZ3VtZW50TmFtZUxpc3QgPSBmdW5jdGlvbihmaXJzdEFyZ0luZGV4LCBub0R1cENoZWNrKSB7XG4gIHJldHVybiBbJ3BhcmFtJyArIHRoaXMuaW5kZXhdO1xufTtcblxuLy8gXCJWYWx1ZSBwZXhwcnNcIiAoVmFsdWUsIFN0ciwgQXJyLCBPYmopIGFyZSBnb2luZyBhd2F5IHNvb24sIHNvIHdlIGRvbid0IHdvcnJ5IGFib3V0IHRoZW0gaGVyZS5cbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgUEV4cHIsIGZvciB1c2UgYXMgYSBVSSBsYWJlbCwgZXRjLlxucGV4cHJzLlBFeHByLnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPSBjb21tb24uYWJzdHJhY3QoJ3RvRGlzcGxheVN0cmluZycpO1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPVxucGV4cHJzLlNlcS5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID1cbnBleHBycy5JdGVyLnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPVxucGV4cHJzLk5vdC5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID1cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9XG5wZXhwcnMuTGV4LnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlLnRyaW1tZWQoKS5jb250ZW50cztcbiAgfVxuICByZXR1cm4gJ1snICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lICsgJ10nO1xufTtcblxucGV4cHJzLmFueS50b0Rpc3BsYXlTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdhbnknO1xufTtcblxucGV4cHJzLmVuZC50b0Rpc3BsYXlTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdlbmQnO1xufTtcblxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMub2JqKTtcbn07XG5cbnBleHBycy5SYW5nZS5wcm90b3R5cGUudG9EaXNwbGF5U3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmZyb20pICsgJy4uJyArIEpTT04uc3RyaW5naWZ5KHRoaXMudG8pO1xufTtcblxucGV4cHJzLlBhcmFtLnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICcjJyArIHRoaXMuaW5kZXg7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLnRvRGlzcGxheVN0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xufTtcblxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS50b0Rpc3BsYXlTdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdVbmljb2RlIHsnICsgdGhpcy5jYXRlZ29yeSArICd9IGNoYXJhY3Rlcic7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIEZhaWx1cmUgPSByZXF1aXJlKCcuL0ZhaWx1cmUnKTtcbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLnRvRmFpbHVyZSA9IGNvbW1vbi5hYnN0cmFjdCgndG9GYWlsdXJlJyk7XG5cbnBleHBycy5hbnkudG9GYWlsdXJlID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICByZXR1cm4gbmV3IEZhaWx1cmUodGhpcywgJ2FueSBvYmplY3QnLCAnZGVzY3JpcHRpb24nKTtcbn07XG5cbnBleHBycy5lbmQudG9GYWlsdXJlID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICByZXR1cm4gbmV3IEZhaWx1cmUodGhpcywgJ2VuZCBvZiBpbnB1dCcsICdkZXNjcmlwdGlvbicpO1xufTtcblxucGV4cHJzLlRlcm1pbmFsLnByb3RvdHlwZS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHJldHVybiBuZXcgRmFpbHVyZSh0aGlzLCB0aGlzLm9iaiwgJ3N0cmluZycpO1xufTtcblxucGV4cHJzLlJhbmdlLnByb3RvdHlwZS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIC8vIFRPRE86IGNvbWUgdXAgd2l0aCBzb21ldGhpbmcgYmV0dGVyXG4gIHJldHVybiBuZXcgRmFpbHVyZSh0aGlzLCBKU09OLnN0cmluZ2lmeSh0aGlzLmZyb20pICsgJy4uJyArIEpTT04uc3RyaW5naWZ5KHRoaXMudG8pLCAnY29kZScpO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUudG9GYWlsdXJlID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICB2YXIgZGVzY3JpcHRpb24gPSB0aGlzLmV4cHIgPT09IHBleHBycy5hbnkgP1xuICAgICAgJ25vdGhpbmcnIDpcbiAgICAgICdub3QgJyArIHRoaXMuZXhwci50b0ZhaWx1cmUoZ3JhbW1hcik7XG4gIHJldHVybiBuZXcgRmFpbHVyZSh0aGlzLCBkZXNjcmlwdGlvbiwgJ2Rlc2NyaXB0aW9uJyk7XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHJldHVybiB0aGlzLmV4cHIudG9GYWlsdXJlKGdyYW1tYXIpO1xufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHZhciBkZXNjcmlwdGlvbiA9IGdyYW1tYXIucnVsZXNbdGhpcy5ydWxlTmFtZV0uZGVzY3JpcHRpb247XG4gIGlmICghZGVzY3JpcHRpb24pIHtcbiAgICB2YXIgYXJ0aWNsZSA9ICgvXlthZWlvdUFFSU9VXS8udGVzdCh0aGlzLnJ1bGVOYW1lKSA/ICdhbicgOiAnYScpO1xuICAgIGRlc2NyaXB0aW9uID0gYXJ0aWNsZSArICcgJyArIHRoaXMucnVsZU5hbWU7XG4gIH1cbiAgcmV0dXJuIG5ldyBGYWlsdXJlKHRoaXMsIGRlc2NyaXB0aW9uLCAnZGVzY3JpcHRpb24nKTtcbn07XG5cbnBleHBycy5Vbmljb2RlQ2hhci5wcm90b3R5cGUudG9GYWlsdXJlID0gZnVuY3Rpb24oZ3JhbW1hcikge1xuICByZXR1cm4gbmV3IEZhaWx1cmUodGhpcywgdGhpcy50b0Rpc3BsYXlTdHJpbmcoKSwgJ2Rlc2NyaXB0aW9uJyk7XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHZhciBmcyA9IHRoaXMudGVybXMubWFwKGZ1bmN0aW9uKHQpIHsgcmV0dXJuIHQudG9GYWlsdXJlKCk7IH0pO1xuICB2YXIgZGVzY3JpcHRpb24gPSAnKCcgKyBmcy5qb2luKCcgb3IgJykgKyAnKSc7XG4gIHJldHVybiBuZXcgRmFpbHVyZSh0aGlzLCBkZXNjcmlwdGlvbiwgJ2Rlc2NyaXB0aW9uJyk7XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHZhciBmcyA9IHRoaXMuZmFjdG9ycy5tYXAoZnVuY3Rpb24oZikgeyByZXR1cm4gZi50b0ZhaWx1cmUoKTsgfSk7XG4gIHZhciBkZXNjcmlwdGlvbiA9ICcoJyArIGZzLmpvaW4oJyAnKSArICcpJztcbiAgcmV0dXJuIG5ldyBGYWlsdXJlKHRoaXMsIGRlc2NyaXB0aW9uLCAnZGVzY3JpcHRpb24nKTtcbn07XG5cbnBleHBycy5JdGVyLnByb3RvdHlwZS50b0ZhaWx1cmUgPSBmdW5jdGlvbihncmFtbWFyKSB7XG4gIHZhciBkZXNjcmlwdGlvbiA9ICcoJyArIHRoaXMuZXhwci50b0ZhaWx1cmUoKSArIHRoaXMub3BlcmF0b3IgKyAnKSc7XG4gIHJldHVybiBuZXcgRmFpbHVyZSh0aGlzLCBkZXNjcmlwdGlvbiwgJ2Rlc2NyaXB0aW9uJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qXG4gIGUxLnRvU3RyaW5nKCkgPT09IGUyLnRvU3RyaW5nKCkgPT0+IGUxIGFuZCBlMiBhcmUgc2VtYW50aWNhbGx5IGVxdWl2YWxlbnQuXG4gIE5vdGUgdGhhdCB0aGlzIGlzIG5vdCBhbiBpZmYgKDw9PT4pOiBlLmcuLFxuICAoflwiYlwiIFwiYVwiKS50b1N0cmluZygpICE9PSAoXCJhXCIpLnRvU3RyaW5nKCksIGV2ZW4gdGhvdWdoXG4gIH5cImJcIiBcImFcIiBhbmQgXCJhXCIgYXJlIGludGVyY2hhbmdlYWJsZSBpbiBhbnkgZ3JhbW1hcixcbiAgYm90aCBpbiB0ZXJtcyBvZiB0aGUgbGFuZ3VhZ2VzIHRoZXkgYWNjZXB0IGFuZCB0aGVpciBhcml0aWVzLlxuKi9cbnBleHBycy5QRXhwci5wcm90b3R5cGUudG9TdHJpbmcgPSBjb21tb24uYWJzdHJhY3QoJ3RvU3RyaW5nJyk7XG5cbnBleHBycy5hbnkudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICdhbnknO1xufTtcblxucGV4cHJzLmVuZC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ2VuZCc7XG59O1xuXG5wZXhwcnMuVGVybWluYWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLm9iaik7XG59O1xuXG5wZXhwcnMuUmFuZ2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmZyb20pICsgJy4uJyArIEpTT04uc3RyaW5naWZ5KHRoaXMudG8pO1xufTtcblxucGV4cHJzLlBhcmFtLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJyQnICsgdGhpcy5pbmRleDtcbn07XG5cbnBleHBycy5MZXgucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnIygnICsgdGhpcy5leHByLnRvU3RyaW5nKCkgKyAnKSc7XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy50ZXJtcy5sZW5ndGggPT09IDEgP1xuICAgIHRoaXMudGVybXNbMF0udG9TdHJpbmcoKSA6XG4gICAgJygnICsgdGhpcy50ZXJtcy5tYXAoZnVuY3Rpb24odGVybSkgeyByZXR1cm4gdGVybS50b1N0cmluZygpOyB9KS5qb2luKCcgfCAnKSArICcpJztcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmZhY3RvcnMubGVuZ3RoID09PSAxID9cbiAgICB0aGlzLmZhY3RvcnNbMF0udG9TdHJpbmcoKSA6XG4gICAgJygnICsgdGhpcy5mYWN0b3JzLm1hcChmdW5jdGlvbihmYWN0b3IpIHsgcmV0dXJuIGZhY3Rvci50b1N0cmluZygpOyB9KS5qb2luKCcgJykgKyAnKSc7XG59O1xuXG5wZXhwcnMuSXRlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZXhwciArIHRoaXMub3BlcmF0b3I7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ34nICsgdGhpcy5leHByO1xufTtcblxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuICcmJyArIHRoaXMuZXhwcjtcbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuYXJncy5sZW5ndGggPiAwKSB7XG4gICAgdmFyIHBzID0gdGhpcy5hcmdzLm1hcChmdW5jdGlvbihhcmcpIHsgcmV0dXJuIGFyZy50b1N0cmluZygpOyB9KTtcbiAgICByZXR1cm4gdGhpcy5ydWxlTmFtZSArICc8JyArIHBzLmpvaW4oJywnKSArICc+JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5ydWxlTmFtZTtcbiAgfVxufTtcblxucGV4cHJzLlVuaWNvZGVDaGFyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gJ1xcXFxweycgKyB0aGlzLmNhdGVnb3J5ICsgJ30nO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBVbmljb2RlQ2F0ZWdvcmllcyA9IHJlcXVpcmUoJy4uL3RoaXJkX3BhcnR5L1VuaWNvZGVDYXRlZ29yaWVzJyk7XG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpO1xudmFyIGluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIEdlbmVyYWwgc3R1ZmZcblxuZnVuY3Rpb24gUEV4cHIoKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIlBFeHByIGNhbm5vdCBiZSBpbnN0YW50aWF0ZWQgLS0gaXQncyBhYnN0cmFjdFwiKTtcbn1cblxuLy8gU2V0IHRoZSBgc291cmNlYCBwcm9wZXJ0eSB0byB0aGUgaW50ZXJ2YWwgY29udGFpbmluZyB0aGUgc291cmNlIGZvciB0aGlzIGV4cHJlc3Npb24uXG5QRXhwci5wcm90b3R5cGUud2l0aFNvdXJjZSA9IGZ1bmN0aW9uKGludGVydmFsKSB7XG4gIGlmIChpbnRlcnZhbCkge1xuICAgIHRoaXMuc291cmNlID0gaW50ZXJ2YWwudHJpbW1lZCgpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gQW55XG5cbnZhciBhbnkgPSBPYmplY3QuY3JlYXRlKFBFeHByLnByb3RvdHlwZSk7XG5cbi8vIEVuZFxuXG52YXIgZW5kID0gT2JqZWN0LmNyZWF0ZShQRXhwci5wcm90b3R5cGUpO1xuXG4vLyBUZXJtaW5hbHNcblxuZnVuY3Rpb24gVGVybWluYWwob2JqKSB7XG4gIHRoaXMub2JqID0gb2JqO1xufVxuaW5oZXJpdHMoVGVybWluYWwsIFBFeHByKTtcblxuLy8gUmFuZ2VzXG5cbmZ1bmN0aW9uIFJhbmdlKGZyb20sIHRvKSB7XG4gIHRoaXMuZnJvbSA9IGZyb207XG4gIHRoaXMudG8gPSB0bztcbn1cbmluaGVyaXRzKFJhbmdlLCBQRXhwcik7XG5cbi8vIFBhcmFtZXRlcnNcblxuZnVuY3Rpb24gUGFyYW0oaW5kZXgpIHtcbiAgdGhpcy5pbmRleCA9IGluZGV4O1xufVxuaW5oZXJpdHMoUGFyYW0sIFBFeHByKTtcblxuLy8gQWx0ZXJuYXRpb25cblxuZnVuY3Rpb24gQWx0KHRlcm1zKSB7XG4gIHRoaXMudGVybXMgPSB0ZXJtcztcbn1cbmluaGVyaXRzKEFsdCwgUEV4cHIpO1xuXG4vLyBFeHRlbmQgaXMgYW4gaW1wbGVtZW50YXRpb24gZGV0YWlsIG9mIHJ1bGUgZXh0ZW5zaW9uXG5cbmZ1bmN0aW9uIEV4dGVuZChzdXBlckdyYW1tYXIsIG5hbWUsIGJvZHkpIHtcbiAgdGhpcy5zdXBlckdyYW1tYXIgPSBzdXBlckdyYW1tYXI7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuYm9keSA9IGJvZHk7XG4gIHZhciBvcmlnQm9keSA9IHN1cGVyR3JhbW1hci5ydWxlc1tuYW1lXS5ib2R5O1xuICB0aGlzLnRlcm1zID0gW2JvZHksIG9yaWdCb2R5XTtcbn1cbmluaGVyaXRzKEV4dGVuZCwgQWx0KTtcblxuLy8gU2VxdWVuY2VzXG5cbmZ1bmN0aW9uIFNlcShmYWN0b3JzKSB7XG4gIHRoaXMuZmFjdG9ycyA9IGZhY3RvcnM7XG59XG5pbmhlcml0cyhTZXEsIFBFeHByKTtcblxuLy8gSXRlcmF0b3JzIGFuZCBvcHRpb25hbHNcblxuZnVuY3Rpb24gSXRlcihleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5pbmhlcml0cyhJdGVyLCBQRXhwcik7XG5cbmZ1bmN0aW9uIFN0YXIoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoU3RhciwgSXRlcik7XG5cbmZ1bmN0aW9uIFBsdXMoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoUGx1cywgSXRlcik7XG5cbmZ1bmN0aW9uIE9wdChleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5pbmhlcml0cyhPcHQsIEl0ZXIpO1xuXG5TdGFyLnByb3RvdHlwZS5vcGVyYXRvciA9ICcqJztcblBsdXMucHJvdG90eXBlLm9wZXJhdG9yID0gJysnO1xuT3B0LnByb3RvdHlwZS5vcGVyYXRvciA9ICc/JztcblxuU3Rhci5wcm90b3R5cGUubWluTnVtTWF0Y2hlcyA9IDA7XG5QbHVzLnByb3RvdHlwZS5taW5OdW1NYXRjaGVzID0gMTtcbk9wdC5wcm90b3R5cGUubWluTnVtTWF0Y2hlcyA9IDA7XG5cblN0YXIucHJvdG90eXBlLm1heE51bU1hdGNoZXMgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG5QbHVzLnByb3RvdHlwZS5tYXhOdW1NYXRjaGVzID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuT3B0LnByb3RvdHlwZS5tYXhOdW1NYXRjaGVzID0gMTtcblxuLy8gUHJlZGljYXRlc1xuXG5mdW5jdGlvbiBOb3QoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoTm90LCBQRXhwcik7XG5cbmZ1bmN0aW9uIExvb2thaGVhZChleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5pbmhlcml0cyhMb29rYWhlYWQsIFBFeHByKTtcblxuLy8gXCJMZXhpZmljYXRpb25cIlxuXG5mdW5jdGlvbiBMZXgoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoTGV4LCBQRXhwcik7XG5cbi8vIEFycmF5IGRlY29tcG9zaXRpb25cblxuZnVuY3Rpb24gQXJyKGV4cHIpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbn1cbmluaGVyaXRzKEFyciwgUEV4cHIpO1xuXG4vLyBTdHJpbmcgZGVjb21wb3NpdGlvblxuXG5mdW5jdGlvbiBTdHIoZXhwcikge1xuICB0aGlzLmV4cHIgPSBleHByO1xufVxuaW5oZXJpdHMoU3RyLCBQRXhwcik7XG5cbi8vIE9iamVjdCBkZWNvbXBvc2l0aW9uXG5cbmZ1bmN0aW9uIE9iaihwcm9wZXJ0aWVzLCBpc0xlbmllbnQpIHtcbiAgdmFyIG5hbWVzID0gcHJvcGVydGllcy5tYXAoZnVuY3Rpb24ocHJvcGVydHkpIHsgcmV0dXJuIHByb3BlcnR5Lm5hbWU7IH0pO1xuICB2YXIgZHVwbGljYXRlcyA9IGNvbW1vbi5nZXREdXBsaWNhdGVzKG5hbWVzKTtcbiAgaWYgKGR1cGxpY2F0ZXMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IGVycm9ycy5kdXBsaWNhdGVQcm9wZXJ0eU5hbWVzKGR1cGxpY2F0ZXMpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gICAgdGhpcy5pc0xlbmllbnQgPSBpc0xlbmllbnQ7XG4gIH1cbn1cbmluaGVyaXRzKE9iaiwgUEV4cHIpO1xuXG4vLyBSdWxlIGFwcGxpY2F0aW9uXG5cbmZ1bmN0aW9uIEFwcGx5KHJ1bGVOYW1lLCBvcHRBcmdzKSB7XG4gIHRoaXMucnVsZU5hbWUgPSBydWxlTmFtZTtcbiAgdGhpcy5hcmdzID0gb3B0QXJncyB8fCBbXTtcbn1cbmluaGVyaXRzKEFwcGx5LCBQRXhwcik7XG5cbkFwcGx5LnByb3RvdHlwZS5pc1N5bnRhY3RpYyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gY29tbW9uLmlzU3ludGFjdGljKHRoaXMucnVsZU5hbWUpO1xufTtcblxuLy8gVGhpcyBtZXRob2QganVzdCBjYWNoZXMgdGhlIHJlc3VsdCBvZiBgdGhpcy50b1N0cmluZygpYCBpbiBhIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5LlxuQXBwbHkucHJvdG90eXBlLnRvTWVtb0tleSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIXRoaXMuX21lbW9LZXkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ19tZW1vS2V5Jywge3ZhbHVlOiB0aGlzLnRvU3RyaW5nKCl9KTtcbiAgfVxuICByZXR1cm4gdGhpcy5fbWVtb0tleTtcbn07XG5cbi8vIFVuaWNvZGUgY2hhcmFjdGVyXG5cbmZ1bmN0aW9uIFVuaWNvZGVDaGFyKGNhdGVnb3J5KSB7XG4gIHRoaXMuY2F0ZWdvcnkgPSBjYXRlZ29yeTtcbiAgdGhpcy5wYXR0ZXJuID0gVW5pY29kZUNhdGVnb3JpZXNbY2F0ZWdvcnldO1xufVxuaW5oZXJpdHMoVW5pY29kZUNoYXIsIFBFeHByKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydHMuUEV4cHIgPSBQRXhwcjtcbmV4cG9ydHMuYW55ID0gYW55O1xuZXhwb3J0cy5lbmQgPSBlbmQ7XG5leHBvcnRzLlRlcm1pbmFsID0gVGVybWluYWw7XG5leHBvcnRzLlJhbmdlID0gUmFuZ2U7XG5leHBvcnRzLlBhcmFtID0gUGFyYW07XG5leHBvcnRzLkFsdCA9IEFsdDtcbmV4cG9ydHMuRXh0ZW5kID0gRXh0ZW5kO1xuZXhwb3J0cy5TZXEgPSBTZXE7XG5leHBvcnRzLkl0ZXIgPSBJdGVyO1xuZXhwb3J0cy5TdGFyID0gU3RhcjtcbmV4cG9ydHMuUGx1cyA9IFBsdXM7XG5leHBvcnRzLk9wdCA9IE9wdDtcbmV4cG9ydHMuTm90ID0gTm90O1xuZXhwb3J0cy5Mb29rYWhlYWQgPSBMb29rYWhlYWQ7XG5leHBvcnRzLkxleCA9IExleDtcbmV4cG9ydHMuQXJyID0gQXJyO1xuZXhwb3J0cy5TdHIgPSBTdHI7XG5leHBvcnRzLk9iaiA9IE9iajtcbmV4cG9ydHMuQXBwbHkgPSBBcHBseTtcbmV4cG9ydHMuVW5pY29kZUNoYXIgPSBVbmljb2RlQ2hhcjtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4dGVuc2lvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnJlcXVpcmUoJy4vcGV4cHJzLWFsbG93c1NraXBwaW5nUHJlY2VkaW5nU3BhY2UnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWFzc2VydEFsbEFwcGxpY2F0aW9uc0FyZVZhbGlkJyk7XG5yZXF1aXJlKCcuL3BleHBycy1hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1Bcml0eScpO1xucmVxdWlyZSgnLi9wZXhwcnMtYXNzZXJ0SXRlcmF0ZWRFeHByc0FyZU5vdE51bGxhYmxlJyk7XG5yZXF1aXJlKCcuL3BleHBycy1jaGVjaycpO1xucmVxdWlyZSgnLi9wZXhwcnMtZXZhbCcpO1xucmVxdWlyZSgnLi9wZXhwcnMtZ2V0QXJpdHknKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWdlbmVyYXRlRXhhbXBsZScpO1xucmVxdWlyZSgnLi9wZXhwcnMtb3V0cHV0UmVjaXBlJyk7XG5yZXF1aXJlKCcuL3BleHBycy1pbnRyb2R1Y2VQYXJhbXMnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWlzTnVsbGFibGUnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLXN1YnN0aXR1dGVQYXJhbXMnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLXRvRGlzcGxheVN0cmluZycpO1xucmVxdWlyZSgnLi9wZXhwcnMtdG9Bcmd1bWVudE5hbWVMaXN0Jyk7XG5yZXF1aXJlKCcuL3BleHBycy10b0ZhaWx1cmUnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLXRvU3RyaW5nJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIEdpdmVuIGFuIGFycmF5IG9mIG51bWJlcnMgYGFycmAsIHJldHVybiBhbiBhcnJheSBvZiB0aGUgbnVtYmVycyBhcyBzdHJpbmdzLFxuLy8gcmlnaHQtanVzdGlmaWVkIGFuZCBwYWRkZWQgdG8gdGhlIHNhbWUgbGVuZ3RoLlxuZnVuY3Rpb24gcGFkTnVtYmVyc1RvRXF1YWxMZW5ndGgoYXJyKSB7XG4gIHZhciBtYXhMZW4gPSAwO1xuICB2YXIgc3RyaW5ncyA9IGFyci5tYXAoZnVuY3Rpb24obikge1xuICAgIHZhciBzdHIgPSBuLnRvU3RyaW5nKCk7XG4gICAgbWF4TGVuID0gTWF0aC5tYXgobWF4TGVuLCBzdHIubGVuZ3RoKTtcbiAgICByZXR1cm4gc3RyO1xuICB9KTtcbiAgcmV0dXJuIHN0cmluZ3MubWFwKGZ1bmN0aW9uKHMpIHsgcmV0dXJuIGNvbW1vbi5wYWRMZWZ0KHMsIG1heExlbik7IH0pO1xufVxuXG4vLyBQcm9kdWNlIGEgbmV3IHN0cmluZyB0aGF0IHdvdWxkIGJlIHRoZSByZXN1bHQgb2YgY29weWluZyB0aGUgY29udGVudHNcbi8vIG9mIHRoZSBzdHJpbmcgYHNyY2Agb250byBgZGVzdGAgYXQgb2Zmc2V0IGBvZmZlc3RgLlxuZnVuY3Rpb24gc3RyY3B5KGRlc3QsIHNyYywgb2Zmc2V0KSB7XG4gIHZhciBvcmlnRGVzdExlbiA9IGRlc3QubGVuZ3RoO1xuICB2YXIgc3RhcnQgPSBkZXN0LnNsaWNlKDAsIG9mZnNldCk7XG4gIHZhciBlbmQgPSBkZXN0LnNsaWNlKG9mZnNldCArIHNyYy5sZW5ndGgpO1xuICByZXR1cm4gKHN0YXJ0ICsgc3JjICsgZW5kKS5zdWJzdHIoMCwgb3JpZ0Rlc3RMZW4pO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gUmV0dXJuIGFuIG9iamVjdCB3aXRoIHRoZSBsaW5lIGFuZCBjb2x1bW4gaW5mb3JtYXRpb24gZm9yIHRoZSBnaXZlblxuLy8gb2Zmc2V0IGluIGBzdHJgLlxuZXhwb3J0cy5nZXRMaW5lQW5kQ29sdW1uID0gZnVuY3Rpb24oc3RyLCBvZmZzZXQpIHtcbiAgdmFyIGxpbmVOdW0gPSAxO1xuICB2YXIgY29sTnVtID0gMTtcblxuICB2YXIgY3Vyck9mZnNldCA9IDA7XG4gIHZhciBsaW5lU3RhcnRPZmZzZXQgPSAwO1xuXG4gIHZhciBuZXh0TGluZSA9IG51bGw7XG4gIHZhciBwcmV2TGluZSA9IG51bGw7XG4gIHZhciBwcmV2TGluZVN0YXJ0T2Zmc2V0ID0gLTE7XG5cbiAgd2hpbGUgKGN1cnJPZmZzZXQgPCBvZmZzZXQpIHtcbiAgICB2YXIgYyA9IHN0ci5jaGFyQXQoY3Vyck9mZnNldCsrKTtcbiAgICBpZiAoYyA9PT0gJ1xcbicpIHtcbiAgICAgIGxpbmVOdW0rKztcbiAgICAgIGNvbE51bSA9IDE7XG4gICAgICBwcmV2TGluZVN0YXJ0T2Zmc2V0ID0gbGluZVN0YXJ0T2Zmc2V0O1xuICAgICAgbGluZVN0YXJ0T2Zmc2V0ID0gY3Vyck9mZnNldDtcbiAgICB9IGVsc2UgaWYgKGMgIT09ICdcXHInKSB7XG4gICAgICBjb2xOdW0rKztcbiAgICB9XG4gIH1cblxuICAvLyBGaW5kIHRoZSBlbmQgb2YgdGhlIHRhcmdldCBsaW5lLlxuICB2YXIgbGluZUVuZE9mZnNldCA9IHN0ci5pbmRleE9mKCdcXG4nLCBsaW5lU3RhcnRPZmZzZXQpO1xuICBpZiAobGluZUVuZE9mZnNldCA9PT0gLTEpIHtcbiAgICBsaW5lRW5kT2Zmc2V0ID0gc3RyLmxlbmd0aDtcbiAgfSBlbHNlIHtcbiAgICAvLyBHZXQgdGhlIG5leHQgbGluZS5cbiAgICB2YXIgbmV4dExpbmVFbmRPZmZzZXQgPSBzdHIuaW5kZXhPZignXFxuJywgbGluZUVuZE9mZnNldCArIDEpO1xuICAgIG5leHRMaW5lID0gbmV4dExpbmVFbmRPZmZzZXQgPT09IC0xID8gc3RyLnNsaWNlKGxpbmVFbmRPZmZzZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzdHIuc2xpY2UobGluZUVuZE9mZnNldCwgbmV4dExpbmVFbmRPZmZzZXQpO1xuICAgIC8vIFN0cmlwIGxlYWRpbmcgYW5kIHRyYWlsaW5nIEVPTCBjaGFyKHMpLlxuICAgIG5leHRMaW5lID0gbmV4dExpbmUucmVwbGFjZSgvXlxccj9cXG4vLCAnJykucmVwbGFjZSgvXFxyJC8sICcnKTtcbiAgfVxuXG4gIC8vIEdldCB0aGUgcHJldmlvdXMgbGluZS5cbiAgaWYgKHByZXZMaW5lU3RhcnRPZmZzZXQgPj0gMCkge1xuICAgIHByZXZMaW5lID0gc3RyLnNsaWNlKHByZXZMaW5lU3RhcnRPZmZzZXQsIGxpbmVTdGFydE9mZnNldClcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHI/XFxuJC8sICcnKTsgIC8vIFN0cmlwIHRyYWlsaW5nIEVPTCBjaGFyKHMpLlxuICB9XG5cbiAgLy8gR2V0IHRoZSB0YXJnZXQgbGluZSwgc3RyaXBwaW5nIGEgdHJhaWxpbmcgY2FycmlhZ2UgcmV0dXJuIGlmIG5lY2Vzc2FyeS5cbiAgdmFyIGxpbmUgPSBzdHIuc2xpY2UobGluZVN0YXJ0T2Zmc2V0LCBsaW5lRW5kT2Zmc2V0KS5yZXBsYWNlKC9cXHIkLywgJycpO1xuXG4gIHJldHVybiB7XG4gICAgbGluZU51bTogbGluZU51bSxcbiAgICBjb2xOdW06IGNvbE51bSxcbiAgICBsaW5lOiBsaW5lLFxuICAgIHByZXZMaW5lOiBwcmV2TGluZSxcbiAgICBuZXh0TGluZTogbmV4dExpbmVcbiAgfTtcbn07XG5cbi8vIFJldHVybiBhIG5pY2VseS1mb3JtYXR0ZWQgc3RyaW5nIGRlc2NyaWJpbmcgdGhlIGxpbmUgYW5kIGNvbHVtbiBmb3IgdGhlXG4vLyBnaXZlbiBvZmZzZXQgaW4gYHN0cmAuXG5leHBvcnRzLmdldExpbmVBbmRDb2x1bW5NZXNzYWdlID0gZnVuY3Rpb24oc3RyLCBvZmZzZXQgLyogLi4ucmFuZ2VzICovKSB7XG4gIHZhciByZXBlYXRTdHIgPSBjb21tb24ucmVwZWF0U3RyO1xuXG4gIHZhciBsaW5lQW5kQ29sID0gZXhwb3J0cy5nZXRMaW5lQW5kQ29sdW1uKHN0ciwgb2Zmc2V0KTtcbiAgdmFyIHNiID0gbmV3IGNvbW1vbi5TdHJpbmdCdWZmZXIoKTtcbiAgc2IuYXBwZW5kKCdMaW5lICcgKyBsaW5lQW5kQ29sLmxpbmVOdW0gKyAnLCBjb2wgJyArIGxpbmVBbmRDb2wuY29sTnVtICsgJzpcXG4nKTtcblxuICAvLyBBbiBhcnJheSBvZiB0aGUgcHJldmlvdXMsIGN1cnJlbnQsIGFuZCBuZXh0IGxpbmUgbnVtYmVycyBhcyBzdHJpbmdzIG9mIGVxdWFsIGxlbmd0aC5cbiAgdmFyIGxpbmVOdW1iZXJzID0gcGFkTnVtYmVyc1RvRXF1YWxMZW5ndGgoW1xuICAgIGxpbmVBbmRDb2wucHJldkxpbmUgPT0gbnVsbCA/IDAgOiBsaW5lQW5kQ29sLmxpbmVOdW0gLSAxLFxuICAgIGxpbmVBbmRDb2wubGluZU51bSxcbiAgICBsaW5lQW5kQ29sLm5leHRMaW5lID09IG51bGwgPyAwIDogbGluZUFuZENvbC5saW5lTnVtICsgMVxuICBdKTtcblxuICAvLyBIZWxwZXIgZm9yIGFwcGVuZGluZyBmb3JtYXR0aW5nIGlucHV0IGxpbmVzIHRvIHRoZSBidWZmZXIuXG4gIGZ1bmN0aW9uIGFwcGVuZExpbmUobnVtLCBjb250ZW50LCBwcmVmaXgpIHtcbiAgICBzYi5hcHBlbmQocHJlZml4ICsgbGluZU51bWJlcnNbbnVtXSArICcgfCAnICsgY29udGVudCArICdcXG4nKTtcbiAgfVxuXG4gIC8vIEluY2x1ZGUgdGhlIHByZXZpb3VzIGxpbmUgZm9yIGNvbnRleHQgaWYgcG9zc2libGUuXG4gIGlmIChsaW5lQW5kQ29sLnByZXZMaW5lICE9IG51bGwpIHtcbiAgICBhcHBlbmRMaW5lKDAsIGxpbmVBbmRDb2wucHJldkxpbmUsICcgICcpO1xuICB9XG4gIC8vIExpbmUgdGhhdCB0aGUgZXJyb3Igb2NjdXJyZWQgb24uXG4gIGFwcGVuZExpbmUoMSwgbGluZUFuZENvbC5saW5lLCAnPiAnKTtcblxuICAvLyBCdWlsZCB1cCB0aGUgbGluZSB0aGF0IHBvaW50cyB0byB0aGUgb2Zmc2V0IGFuZCBwb3NzaWJsZSBpbmRpY2F0ZXMgb25lIG9yIG1vcmUgcmFuZ2VzLlxuICAvLyBTdGFydCB3aXRoIGEgYmxhbmsgbGluZSwgYW5kIGluZGljYXRlIGVhY2ggcmFuZ2UgYnkgb3ZlcmxheWluZyBhIHN0cmluZyBvZiBgfmAgY2hhcnMuXG4gIHZhciBsaW5lTGVuID0gbGluZUFuZENvbC5saW5lLmxlbmd0aDtcbiAgdmFyIGluZGljYXRpb25MaW5lID0gcmVwZWF0U3RyKCcgJywgbGluZUxlbiArIDEpO1xuICB2YXIgcmFuZ2VzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgc3RhcnRJZHggPSByYW5nZXNbaV1bMF07XG4gICAgdmFyIGVuZElkeCA9IHJhbmdlc1tpXVsxXTtcbiAgICBjb21tb24uYXNzZXJ0KHN0YXJ0SWR4ID49IDAgJiYgc3RhcnRJZHggPD0gZW5kSWR4LCAncmFuZ2Ugc3RhcnQgbXVzdCBiZSA+PSAwIGFuZCA8PSBlbmQnKTtcblxuICAgIHZhciBsaW5lU3RhcnRPZmZzZXQgPSBvZmZzZXQgLSBsaW5lQW5kQ29sLmNvbE51bSArIDE7XG4gICAgc3RhcnRJZHggPSBNYXRoLm1heCgwLCBzdGFydElkeCAtIGxpbmVTdGFydE9mZnNldCk7XG4gICAgZW5kSWR4ID0gTWF0aC5taW4oZW5kSWR4IC0gbGluZVN0YXJ0T2Zmc2V0LCBsaW5lTGVuKTtcblxuICAgIGluZGljYXRpb25MaW5lID0gc3RyY3B5KGluZGljYXRpb25MaW5lLCByZXBlYXRTdHIoJ34nLCBlbmRJZHggLSBzdGFydElkeCksIHN0YXJ0SWR4KTtcbiAgfVxuICB2YXIgZ3V0dGVyV2lkdGggPSAyICsgbGluZU51bWJlcnNbMV0ubGVuZ3RoICsgMztcbiAgc2IuYXBwZW5kKHJlcGVhdFN0cignICcsIGd1dHRlcldpZHRoKSk7XG4gIGluZGljYXRpb25MaW5lID0gc3RyY3B5KGluZGljYXRpb25MaW5lLCAnXicsIGxpbmVBbmRDb2wuY29sTnVtIC0gMSk7XG4gIHNiLmFwcGVuZChpbmRpY2F0aW9uTGluZS5yZXBsYWNlKC8gKyQvLCAnJykgKyAnXFxuJyk7XG5cbiAgLy8gSW5jbHVkZSB0aGUgbmV4dCBsaW5lIGZvciBjb250ZXh0IGlmIHBvc3NpYmxlLlxuICBpZiAobGluZUFuZENvbC5uZXh0TGluZSAhPSBudWxsKSB7XG4gICAgYXBwZW5kTGluZSgyLCBsaW5lQW5kQ29sLm5leHRMaW5lLCAnICAnKTtcbiAgfVxuICByZXR1cm4gc2IuY29udGVudHMoKTtcbn07XG4iLCIvLyBCYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vdHZjdXRzZW0vZXMtbGFiL2Jsb2IvbWFzdGVyL3NyYy9wYXJzZXIvdW5pY29kZS5qcy5cbi8vIFRoZXNlIGFyZSBqdXN0IGNhdGVnb3JpZXMgdGhhdCBhcmUgdXNlZCBpbiBFUzUuXG4vLyBUaGUgZnVsbCBsaXN0IG9mIFVuaWNvZGUgY2F0ZWdvcmllcyBpcyBoZXJlOiBodHRwOi8vd3d3LmZpbGVmb3JtYXQuaW5mby9pbmZvL3VuaWNvZGUvY2F0ZWdvcnkvaW5kZXguaHRtLlxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIExldHRlcnNcbiAgTHU6IC9bXFx1MDA0MS1cXHUwMDVBXXxbXFx1MDBDMC1cXHUwMEQ2XXxbXFx1MDBEOC1cXHUwMERFXXxbXFx1MDEwMC1cXHUwMTAwXXxbXFx1MDEwMi1cXHUwMTAyXXxbXFx1MDEwNC1cXHUwMTA0XXxbXFx1MDEwNi1cXHUwMTA2XXxbXFx1MDEwOC1cXHUwMTA4XXxbXFx1MDEwQS1cXHUwMTBBXXxbXFx1MDEwQy1cXHUwMTBDXXxbXFx1MDEwRS1cXHUwMTBFXXxbXFx1MDExMC1cXHUwMTEwXXxbXFx1MDExMi1cXHUwMTEyXXxbXFx1MDExNC1cXHUwMTE0XXxbXFx1MDExNi1cXHUwMTE2XXxbXFx1MDExOC1cXHUwMTE4XXxbXFx1MDExQS1cXHUwMTFBXXxbXFx1MDExQy1cXHUwMTFDXXxbXFx1MDExRS1cXHUwMTFFXXxbXFx1MDEyMC1cXHUwMTIwXXxbXFx1MDEyMi1cXHUwMTIyXXxbXFx1MDEyNC1cXHUwMTI0XXxbXFx1MDEyNi1cXHUwMTI2XXxbXFx1MDEyOC1cXHUwMTI4XXxbXFx1MDEyQS1cXHUwMTJBXXxbXFx1MDEyQy1cXHUwMTJDXXxbXFx1MDEyRS1cXHUwMTJFXXxbXFx1MDEzMC1cXHUwMTMwXXxbXFx1MDEzMi1cXHUwMTMyXXxbXFx1MDEzNC1cXHUwMTM0XXxbXFx1MDEzNi1cXHUwMTM2XXxbXFx1MDEzOS1cXHUwMTM5XXxbXFx1MDEzQi1cXHUwMTNCXXxbXFx1MDEzRC1cXHUwMTNEXXxbXFx1MDEzRi1cXHUwMTNGXXxbXFx1MDE0MS1cXHUwMTQxXXxbXFx1MDE0My1cXHUwMTQzXXxbXFx1MDE0NS1cXHUwMTQ1XXxbXFx1MDE0Ny1cXHUwMTQ3XXxbXFx1MDE0QS1cXHUwMTRBXXxbXFx1MDE0Qy1cXHUwMTRDXXxbXFx1MDE0RS1cXHUwMTRFXXxbXFx1MDE1MC1cXHUwMTUwXXxbXFx1MDE1Mi1cXHUwMTUyXXxbXFx1MDE1NC1cXHUwMTU0XXxbXFx1MDE1Ni1cXHUwMTU2XXxbXFx1MDE1OC1cXHUwMTU4XXxbXFx1MDE1QS1cXHUwMTVBXXxbXFx1MDE1Qy1cXHUwMTVDXXxbXFx1MDE1RS1cXHUwMTVFXXxbXFx1MDE2MC1cXHUwMTYwXXxbXFx1MDE2Mi1cXHUwMTYyXXxbXFx1MDE2NC1cXHUwMTY0XXxbXFx1MDE2Ni1cXHUwMTY2XXxbXFx1MDE2OC1cXHUwMTY4XXxbXFx1MDE2QS1cXHUwMTZBXXxbXFx1MDE2Qy1cXHUwMTZDXXxbXFx1MDE2RS1cXHUwMTZFXXxbXFx1MDE3MC1cXHUwMTcwXXxbXFx1MDE3Mi1cXHUwMTcyXXxbXFx1MDE3NC1cXHUwMTc0XXxbXFx1MDE3Ni1cXHUwMTc2XXxbXFx1MDE3OC1cXHUwMTc5XXxbXFx1MDE3Qi1cXHUwMTdCXXxbXFx1MDE3RC1cXHUwMTdEXXxbXFx1MDE4MS1cXHUwMTgyXXxbXFx1MDE4NC1cXHUwMTg0XXxbXFx1MDE4Ni1cXHUwMTg3XXxbXFx1MDE4OS1cXHUwMThCXXxbXFx1MDE4RS1cXHUwMTkxXXxbXFx1MDE5My1cXHUwMTk0XXxbXFx1MDE5Ni1cXHUwMTk4XXxbXFx1MDE5Qy1cXHUwMTlEXXxbXFx1MDE5Ri1cXHUwMUEwXXxbXFx1MDFBMi1cXHUwMUEyXXxbXFx1MDFBNC1cXHUwMUE0XXxbXFx1MDFBNi1cXHUwMUE3XXxbXFx1MDFBOS1cXHUwMUE5XXxbXFx1MDFBQy1cXHUwMUFDXXxbXFx1MDFBRS1cXHUwMUFGXXxbXFx1MDFCMS1cXHUwMUIzXXxbXFx1MDFCNS1cXHUwMUI1XXxbXFx1MDFCNy1cXHUwMUI4XXxbXFx1MDFCQy1cXHUwMUJDXXxbXFx1MDFDNC1cXHUwMUM0XXxbXFx1MDFDNy1cXHUwMUM3XXxbXFx1MDFDQS1cXHUwMUNBXXxbXFx1MDFDRC1cXHUwMUNEXXxbXFx1MDFDRi1cXHUwMUNGXXxbXFx1MDFEMS1cXHUwMUQxXXxbXFx1MDFEMy1cXHUwMUQzXXxbXFx1MDFENS1cXHUwMUQ1XXxbXFx1MDFENy1cXHUwMUQ3XXxbXFx1MDFEOS1cXHUwMUQ5XXxbXFx1MDFEQi1cXHUwMURCXXxbXFx1MDFERS1cXHUwMURFXXxbXFx1MDFFMC1cXHUwMUUwXXxbXFx1MDFFMi1cXHUwMUUyXXxbXFx1MDFFNC1cXHUwMUU0XXxbXFx1MDFFNi1cXHUwMUU2XXxbXFx1MDFFOC1cXHUwMUU4XXxbXFx1MDFFQS1cXHUwMUVBXXxbXFx1MDFFQy1cXHUwMUVDXXxbXFx1MDFFRS1cXHUwMUVFXXxbXFx1MDFGMS1cXHUwMUYxXXxbXFx1MDFGNC1cXHUwMUY0XXxbXFx1MDFGQS1cXHUwMUZBXXxbXFx1MDFGQy1cXHUwMUZDXXxbXFx1MDFGRS1cXHUwMUZFXXxbXFx1MDIwMC1cXHUwMjAwXXxbXFx1MDIwMi1cXHUwMjAyXXxbXFx1MDIwNC1cXHUwMjA0XXxbXFx1MDIwNi1cXHUwMjA2XXxbXFx1MDIwOC1cXHUwMjA4XXxbXFx1MDIwQS1cXHUwMjBBXXxbXFx1MDIwQy1cXHUwMjBDXXxbXFx1MDIwRS1cXHUwMjBFXXxbXFx1MDIxMC1cXHUwMjEwXXxbXFx1MDIxMi1cXHUwMjEyXXxbXFx1MDIxNC1cXHUwMjE0XXxbXFx1MDIxNi1cXHUwMjE2XXxbXFx1MDM4Ni1cXHUwMzg2XXxbXFx1MDM4OC1cXHUwMzhBXXxbXFx1MDM4Qy1cXHUwMzhDXXxbXFx1MDM4RS1cXHUwMzhGXXxbXFx1MDM5MS1cXHUwM0ExXXxbXFx1MDNBMy1cXHUwM0FCXXxbXFx1MDNEMi1cXHUwM0Q0XXxbXFx1MDNEQS1cXHUwM0RBXXxbXFx1MDNEQy1cXHUwM0RDXXxbXFx1MDNERS1cXHUwM0RFXXxbXFx1MDNFMC1cXHUwM0UwXXxbXFx1MDNFMi1cXHUwM0UyXXxbXFx1MDNFNC1cXHUwM0U0XXxbXFx1MDNFNi1cXHUwM0U2XXxbXFx1MDNFOC1cXHUwM0U4XXxbXFx1MDNFQS1cXHUwM0VBXXxbXFx1MDNFQy1cXHUwM0VDXXxbXFx1MDNFRS1cXHUwM0VFXXxbXFx1MDQwMS1cXHUwNDBDXXxbXFx1MDQwRS1cXHUwNDJGXXxbXFx1MDQ2MC1cXHUwNDYwXXxbXFx1MDQ2Mi1cXHUwNDYyXXxbXFx1MDQ2NC1cXHUwNDY0XXxbXFx1MDQ2Ni1cXHUwNDY2XXxbXFx1MDQ2OC1cXHUwNDY4XXxbXFx1MDQ2QS1cXHUwNDZBXXxbXFx1MDQ2Qy1cXHUwNDZDXXxbXFx1MDQ2RS1cXHUwNDZFXXxbXFx1MDQ3MC1cXHUwNDcwXXxbXFx1MDQ3Mi1cXHUwNDcyXXxbXFx1MDQ3NC1cXHUwNDc0XXxbXFx1MDQ3Ni1cXHUwNDc2XXxbXFx1MDQ3OC1cXHUwNDc4XXxbXFx1MDQ3QS1cXHUwNDdBXXxbXFx1MDQ3Qy1cXHUwNDdDXXxbXFx1MDQ3RS1cXHUwNDdFXXxbXFx1MDQ4MC1cXHUwNDgwXXxbXFx1MDQ5MC1cXHUwNDkwXXxbXFx1MDQ5Mi1cXHUwNDkyXXxbXFx1MDQ5NC1cXHUwNDk0XXxbXFx1MDQ5Ni1cXHUwNDk2XXxbXFx1MDQ5OC1cXHUwNDk4XXxbXFx1MDQ5QS1cXHUwNDlBXXxbXFx1MDQ5Qy1cXHUwNDlDXXxbXFx1MDQ5RS1cXHUwNDlFXXxbXFx1MDRBMC1cXHUwNEEwXXxbXFx1MDRBMi1cXHUwNEEyXXxbXFx1MDRBNC1cXHUwNEE0XXxbXFx1MDRBNi1cXHUwNEE2XXxbXFx1MDRBOC1cXHUwNEE4XXxbXFx1MDRBQS1cXHUwNEFBXXxbXFx1MDRBQy1cXHUwNEFDXXxbXFx1MDRBRS1cXHUwNEFFXXxbXFx1MDRCMC1cXHUwNEIwXXxbXFx1MDRCMi1cXHUwNEIyXXxbXFx1MDRCNC1cXHUwNEI0XXxbXFx1MDRCNi1cXHUwNEI2XXxbXFx1MDRCOC1cXHUwNEI4XXxbXFx1MDRCQS1cXHUwNEJBXXxbXFx1MDRCQy1cXHUwNEJDXXxbXFx1MDRCRS1cXHUwNEJFXXxbXFx1MDRDMS1cXHUwNEMxXXxbXFx1MDRDMy1cXHUwNEMzXXxbXFx1MDRDNy1cXHUwNEM3XXxbXFx1MDRDQi1cXHUwNENCXXxbXFx1MDREMC1cXHUwNEQwXXxbXFx1MDREMi1cXHUwNEQyXXxbXFx1MDRENC1cXHUwNEQ0XXxbXFx1MDRENi1cXHUwNEQ2XXxbXFx1MDREOC1cXHUwNEQ4XXxbXFx1MDREQS1cXHUwNERBXXxbXFx1MDREQy1cXHUwNERDXXxbXFx1MDRERS1cXHUwNERFXXxbXFx1MDRFMC1cXHUwNEUwXXxbXFx1MDRFMi1cXHUwNEUyXXxbXFx1MDRFNC1cXHUwNEU0XXxbXFx1MDRFNi1cXHUwNEU2XXxbXFx1MDRFOC1cXHUwNEU4XXxbXFx1MDRFQS1cXHUwNEVBXXxbXFx1MDRFRS1cXHUwNEVFXXxbXFx1MDRGMC1cXHUwNEYwXXxbXFx1MDRGMi1cXHUwNEYyXXxbXFx1MDRGNC1cXHUwNEY0XXxbXFx1MDRGOC1cXHUwNEY4XXxbXFx1MDUzMS1cXHUwNTU2XXxbXFx1MTBBMC1cXHUxMEM1XXxbXFx1MUUwMC1cXHUxRTAwXXxbXFx1MUUwMi1cXHUxRTAyXXxbXFx1MUUwNC1cXHUxRTA0XXxbXFx1MUUwNi1cXHUxRTA2XXxbXFx1MUUwOC1cXHUxRTA4XXxbXFx1MUUwQS1cXHUxRTBBXXxbXFx1MUUwQy1cXHUxRTBDXXxbXFx1MUUwRS1cXHUxRTBFXXxbXFx1MUUxMC1cXHUxRTEwXXxbXFx1MUUxMi1cXHUxRTEyXXxbXFx1MUUxNC1cXHUxRTE0XXxbXFx1MUUxNi1cXHUxRTE2XXxbXFx1MUUxOC1cXHUxRTE4XXxbXFx1MUUxQS1cXHUxRTFBXXxbXFx1MUUxQy1cXHUxRTFDXXxbXFx1MUUxRS1cXHUxRTFFXXxbXFx1MUUyMC1cXHUxRTIwXXxbXFx1MUUyMi1cXHUxRTIyXXxbXFx1MUUyNC1cXHUxRTI0XXxbXFx1MUUyNi1cXHUxRTI2XXxbXFx1MUUyOC1cXHUxRTI4XXxbXFx1MUUyQS1cXHUxRTJBXXxbXFx1MUUyQy1cXHUxRTJDXXxbXFx1MUUyRS1cXHUxRTJFXXxbXFx1MUUzMC1cXHUxRTMwXXxbXFx1MUUzMi1cXHUxRTMyXXxbXFx1MUUzNC1cXHUxRTM0XXxbXFx1MUUzNi1cXHUxRTM2XXxbXFx1MUUzOC1cXHUxRTM4XXxbXFx1MUUzQS1cXHUxRTNBXXxbXFx1MUUzQy1cXHUxRTNDXXxbXFx1MUUzRS1cXHUxRTNFXXxbXFx1MUU0MC1cXHUxRTQwXXxbXFx1MUU0Mi1cXHUxRTQyXXxbXFx1MUU0NC1cXHUxRTQ0XXxbXFx1MUU0Ni1cXHUxRTQ2XXxbXFx1MUU0OC1cXHUxRTQ4XXxbXFx1MUU0QS1cXHUxRTRBXXxbXFx1MUU0Qy1cXHUxRTRDXXxbXFx1MUU0RS1cXHUxRTRFXXxbXFx1MUU1MC1cXHUxRTUwXXxbXFx1MUU1Mi1cXHUxRTUyXXxbXFx1MUU1NC1cXHUxRTU0XXxbXFx1MUU1Ni1cXHUxRTU2XXxbXFx1MUU1OC1cXHUxRTU4XXxbXFx1MUU1QS1cXHUxRTVBXXxbXFx1MUU1Qy1cXHUxRTVDXXxbXFx1MUU1RS1cXHUxRTVFXXxbXFx1MUU2MC1cXHUxRTYwXXxbXFx1MUU2Mi1cXHUxRTYyXXxbXFx1MUU2NC1cXHUxRTY0XXxbXFx1MUU2Ni1cXHUxRTY2XXxbXFx1MUU2OC1cXHUxRTY4XXxbXFx1MUU2QS1cXHUxRTZBXXxbXFx1MUU2Qy1cXHUxRTZDXXxbXFx1MUU2RS1cXHUxRTZFXXxbXFx1MUU3MC1cXHUxRTcwXXxbXFx1MUU3Mi1cXHUxRTcyXXxbXFx1MUU3NC1cXHUxRTc0XXxbXFx1MUU3Ni1cXHUxRTc2XXxbXFx1MUU3OC1cXHUxRTc4XXxbXFx1MUU3QS1cXHUxRTdBXXxbXFx1MUU3Qy1cXHUxRTdDXXxbXFx1MUU3RS1cXHUxRTdFXXxbXFx1MUU4MC1cXHUxRTgwXXxbXFx1MUU4Mi1cXHUxRTgyXXxbXFx1MUU4NC1cXHUxRTg0XXxbXFx1MUU4Ni1cXHUxRTg2XXxbXFx1MUU4OC1cXHUxRTg4XXxbXFx1MUU4QS1cXHUxRThBXXxbXFx1MUU4Qy1cXHUxRThDXXxbXFx1MUU4RS1cXHUxRThFXXxbXFx1MUU5MC1cXHUxRTkwXXxbXFx1MUU5Mi1cXHUxRTkyXXxbXFx1MUU5NC1cXHUxRTk0XXxbXFx1MUVBMC1cXHUxRUEwXXxbXFx1MUVBMi1cXHUxRUEyXXxbXFx1MUVBNC1cXHUxRUE0XXxbXFx1MUVBNi1cXHUxRUE2XXxbXFx1MUVBOC1cXHUxRUE4XXxbXFx1MUVBQS1cXHUxRUFBXXxbXFx1MUVBQy1cXHUxRUFDXXxbXFx1MUVBRS1cXHUxRUFFXXxbXFx1MUVCMC1cXHUxRUIwXXxbXFx1MUVCMi1cXHUxRUIyXXxbXFx1MUVCNC1cXHUxRUI0XXxbXFx1MUVCNi1cXHUxRUI2XXxbXFx1MUVCOC1cXHUxRUI4XXxbXFx1MUVCQS1cXHUxRUJBXXxbXFx1MUVCQy1cXHUxRUJDXXxbXFx1MUVCRS1cXHUxRUJFXXxbXFx1MUVDMC1cXHUxRUMwXXxbXFx1MUVDMi1cXHUxRUMyXXxbXFx1MUVDNC1cXHUxRUM0XXxbXFx1MUVDNi1cXHUxRUM2XXxbXFx1MUVDOC1cXHUxRUM4XXxbXFx1MUVDQS1cXHUxRUNBXXxbXFx1MUVDQy1cXHUxRUNDXXxbXFx1MUVDRS1cXHUxRUNFXXxbXFx1MUVEMC1cXHUxRUQwXXxbXFx1MUVEMi1cXHUxRUQyXXxbXFx1MUVENC1cXHUxRUQ0XXxbXFx1MUVENi1cXHUxRUQ2XXxbXFx1MUVEOC1cXHUxRUQ4XXxbXFx1MUVEQS1cXHUxRURBXXxbXFx1MUVEQy1cXHUxRURDXXxbXFx1MUVERS1cXHUxRURFXXxbXFx1MUVFMC1cXHUxRUUwXXxbXFx1MUVFMi1cXHUxRUUyXXxbXFx1MUVFNC1cXHUxRUU0XXxbXFx1MUVFNi1cXHUxRUU2XXxbXFx1MUVFOC1cXHUxRUU4XXxbXFx1MUVFQS1cXHUxRUVBXXxbXFx1MUVFQy1cXHUxRUVDXXxbXFx1MUVFRS1cXHUxRUVFXXxbXFx1MUVGMC1cXHUxRUYwXXxbXFx1MUVGMi1cXHUxRUYyXXxbXFx1MUVGNC1cXHUxRUY0XXxbXFx1MUVGNi1cXHUxRUY2XXxbXFx1MUVGOC1cXHUxRUY4XXxbXFx1MUYwOC1cXHUxRjBGXXxbXFx1MUYxOC1cXHUxRjFEXXxbXFx1MUYyOC1cXHUxRjJGXXxbXFx1MUYzOC1cXHUxRjNGXXxbXFx1MUY0OC1cXHUxRjREXXxbXFx1MUY1OS1cXHUxRjU5XXxbXFx1MUY1Qi1cXHUxRjVCXXxbXFx1MUY1RC1cXHUxRjVEXXxbXFx1MUY1Ri1cXHUxRjVGXXxbXFx1MUY2OC1cXHUxRjZGXXxbXFx1MUY4OC1cXHUxRjhGXXxbXFx1MUY5OC1cXHUxRjlGXXxbXFx1MUZBOC1cXHUxRkFGXXxbXFx1MUZCOC1cXHUxRkJDXXxbXFx1MUZDOC1cXHUxRkNDXXxbXFx1MUZEOC1cXHUxRkRCXXxbXFx1MUZFOC1cXHUxRkVDXXxbXFx1MUZGOC1cXHUxRkZDXXxbXFx1MjEwMi1cXHUyMTAyXXxbXFx1MjEwNy1cXHUyMTA3XXxbXFx1MjEwQi1cXHUyMTBEXXxbXFx1MjExMC1cXHUyMTEyXXxbXFx1MjExNS1cXHUyMTE1XXxbXFx1MjExOS1cXHUyMTFEXXxbXFx1MjEyNC1cXHUyMTI0XXxbXFx1MjEyNi1cXHUyMTI2XXxbXFx1MjEyOC1cXHUyMTI4XXxbXFx1MjEyQS1cXHUyMTJEXXxbXFx1MjEzMC1cXHUyMTMxXXxbXFx1MjEzMy1cXHUyMTMzXXxbXFx1RkYyMS1cXHVGRjNBXS8sXG4gIExsOiAvW1xcdTAwNjEtXFx1MDA3QV18W1xcdTAwQUEtXFx1MDBBQV18W1xcdTAwQjUtXFx1MDBCNV18W1xcdTAwQkEtXFx1MDBCQV18W1xcdTAwREYtXFx1MDBGNl18W1xcdTAwRjgtXFx1MDBGRl18W1xcdTAxMDEtXFx1MDEwMV18W1xcdTAxMDMtXFx1MDEwM118W1xcdTAxMDUtXFx1MDEwNV18W1xcdTAxMDctXFx1MDEwN118W1xcdTAxMDktXFx1MDEwOV18W1xcdTAxMEItXFx1MDEwQl18W1xcdTAxMEQtXFx1MDEwRF18W1xcdTAxMEYtXFx1MDEwRl18W1xcdTAxMTEtXFx1MDExMV18W1xcdTAxMTMtXFx1MDExM118W1xcdTAxMTUtXFx1MDExNV18W1xcdTAxMTctXFx1MDExN118W1xcdTAxMTktXFx1MDExOV18W1xcdTAxMUItXFx1MDExQl18W1xcdTAxMUQtXFx1MDExRF18W1xcdTAxMUYtXFx1MDExRl18W1xcdTAxMjEtXFx1MDEyMV18W1xcdTAxMjMtXFx1MDEyM118W1xcdTAxMjUtXFx1MDEyNV18W1xcdTAxMjctXFx1MDEyN118W1xcdTAxMjktXFx1MDEyOV18W1xcdTAxMkItXFx1MDEyQl18W1xcdTAxMkQtXFx1MDEyRF18W1xcdTAxMkYtXFx1MDEyRl18W1xcdTAxMzEtXFx1MDEzMV18W1xcdTAxMzMtXFx1MDEzM118W1xcdTAxMzUtXFx1MDEzNV18W1xcdTAxMzctXFx1MDEzOF18W1xcdTAxM0EtXFx1MDEzQV18W1xcdTAxM0MtXFx1MDEzQ118W1xcdTAxM0UtXFx1MDEzRV18W1xcdTAxNDAtXFx1MDE0MF18W1xcdTAxNDItXFx1MDE0Ml18W1xcdTAxNDQtXFx1MDE0NF18W1xcdTAxNDYtXFx1MDE0Nl18W1xcdTAxNDgtXFx1MDE0OV18W1xcdTAxNEItXFx1MDE0Ql18W1xcdTAxNEQtXFx1MDE0RF18W1xcdTAxNEYtXFx1MDE0Rl18W1xcdTAxNTEtXFx1MDE1MV18W1xcdTAxNTMtXFx1MDE1M118W1xcdTAxNTUtXFx1MDE1NV18W1xcdTAxNTctXFx1MDE1N118W1xcdTAxNTktXFx1MDE1OV18W1xcdTAxNUItXFx1MDE1Ql18W1xcdTAxNUQtXFx1MDE1RF18W1xcdTAxNUYtXFx1MDE1Rl18W1xcdTAxNjEtXFx1MDE2MV18W1xcdTAxNjMtXFx1MDE2M118W1xcdTAxNjUtXFx1MDE2NV18W1xcdTAxNjctXFx1MDE2N118W1xcdTAxNjktXFx1MDE2OV18W1xcdTAxNkItXFx1MDE2Ql18W1xcdTAxNkQtXFx1MDE2RF18W1xcdTAxNkYtXFx1MDE2Rl18W1xcdTAxNzEtXFx1MDE3MV18W1xcdTAxNzMtXFx1MDE3M118W1xcdTAxNzUtXFx1MDE3NV18W1xcdTAxNzctXFx1MDE3N118W1xcdTAxN0EtXFx1MDE3QV18W1xcdTAxN0MtXFx1MDE3Q118W1xcdTAxN0UtXFx1MDE4MF18W1xcdTAxODMtXFx1MDE4M118W1xcdTAxODUtXFx1MDE4NV18W1xcdTAxODgtXFx1MDE4OF18W1xcdTAxOEMtXFx1MDE4RF18W1xcdTAxOTItXFx1MDE5Ml18W1xcdTAxOTUtXFx1MDE5NV18W1xcdTAxOTktXFx1MDE5Ql18W1xcdTAxOUUtXFx1MDE5RV18W1xcdTAxQTEtXFx1MDFBMV18W1xcdTAxQTMtXFx1MDFBM118W1xcdTAxQTUtXFx1MDFBNV18W1xcdTAxQTgtXFx1MDFBOF18W1xcdTAxQUItXFx1MDFBQl18W1xcdTAxQUQtXFx1MDFBRF18W1xcdTAxQjAtXFx1MDFCMF18W1xcdTAxQjQtXFx1MDFCNF18W1xcdTAxQjYtXFx1MDFCNl18W1xcdTAxQjktXFx1MDFCQV18W1xcdTAxQkQtXFx1MDFCRF18W1xcdTAxQzYtXFx1MDFDNl18W1xcdTAxQzktXFx1MDFDOV18W1xcdTAxQ0MtXFx1MDFDQ118W1xcdTAxQ0UtXFx1MDFDRV18W1xcdTAxRDAtXFx1MDFEMF18W1xcdTAxRDItXFx1MDFEMl18W1xcdTAxRDQtXFx1MDFENF18W1xcdTAxRDYtXFx1MDFENl18W1xcdTAxRDgtXFx1MDFEOF18W1xcdTAxREEtXFx1MDFEQV18W1xcdTAxREMtXFx1MDFERF18W1xcdTAxREYtXFx1MDFERl18W1xcdTAxRTEtXFx1MDFFMV18W1xcdTAxRTMtXFx1MDFFM118W1xcdTAxRTUtXFx1MDFFNV18W1xcdTAxRTctXFx1MDFFN118W1xcdTAxRTktXFx1MDFFOV18W1xcdTAxRUItXFx1MDFFQl18W1xcdTAxRUQtXFx1MDFFRF18W1xcdTAxRUYtXFx1MDFGMF18W1xcdTAxRjMtXFx1MDFGM118W1xcdTAxRjUtXFx1MDFGNV18W1xcdTAxRkItXFx1MDFGQl18W1xcdTAxRkQtXFx1MDFGRF18W1xcdTAxRkYtXFx1MDFGRl18W1xcdTAyMDEtXFx1MDIwMV18W1xcdTAyMDMtXFx1MDIwM118W1xcdTAyMDUtXFx1MDIwNV18W1xcdTAyMDctXFx1MDIwN118W1xcdTAyMDktXFx1MDIwOV18W1xcdTAyMEItXFx1MDIwQl18W1xcdTAyMEQtXFx1MDIwRF18W1xcdTAyMEYtXFx1MDIwRl18W1xcdTAyMTEtXFx1MDIxMV18W1xcdTAyMTMtXFx1MDIxM118W1xcdTAyMTUtXFx1MDIxNV18W1xcdTAyMTctXFx1MDIxN118W1xcdTAyNTAtXFx1MDJBOF18W1xcdTAzOTAtXFx1MDM5MF18W1xcdTAzQUMtXFx1MDNDRV18W1xcdTAzRDAtXFx1MDNEMV18W1xcdTAzRDUtXFx1MDNENl18W1xcdTAzRTMtXFx1MDNFM118W1xcdTAzRTUtXFx1MDNFNV18W1xcdTAzRTctXFx1MDNFN118W1xcdTAzRTktXFx1MDNFOV18W1xcdTAzRUItXFx1MDNFQl18W1xcdTAzRUQtXFx1MDNFRF18W1xcdTAzRUYtXFx1MDNGMl18W1xcdTA0MzAtXFx1MDQ0Rl18W1xcdTA0NTEtXFx1MDQ1Q118W1xcdTA0NUUtXFx1MDQ1Rl18W1xcdTA0NjEtXFx1MDQ2MV18W1xcdTA0NjMtXFx1MDQ2M118W1xcdTA0NjUtXFx1MDQ2NV18W1xcdTA0NjctXFx1MDQ2N118W1xcdTA0NjktXFx1MDQ2OV18W1xcdTA0NkItXFx1MDQ2Ql18W1xcdTA0NkQtXFx1MDQ2RF18W1xcdTA0NkYtXFx1MDQ2Rl18W1xcdTA0NzEtXFx1MDQ3MV18W1xcdTA0NzMtXFx1MDQ3M118W1xcdTA0NzUtXFx1MDQ3NV18W1xcdTA0NzctXFx1MDQ3N118W1xcdTA0NzktXFx1MDQ3OV18W1xcdTA0N0ItXFx1MDQ3Ql18W1xcdTA0N0QtXFx1MDQ3RF18W1xcdTA0N0YtXFx1MDQ3Rl18W1xcdTA0ODEtXFx1MDQ4MV18W1xcdTA0OTEtXFx1MDQ5MV18W1xcdTA0OTMtXFx1MDQ5M118W1xcdTA0OTUtXFx1MDQ5NV18W1xcdTA0OTctXFx1MDQ5N118W1xcdTA0OTktXFx1MDQ5OV18W1xcdTA0OUItXFx1MDQ5Ql18W1xcdTA0OUQtXFx1MDQ5RF18W1xcdTA0OUYtXFx1MDQ5Rl18W1xcdTA0QTEtXFx1MDRBMV18W1xcdTA0QTMtXFx1MDRBM118W1xcdTA0QTUtXFx1MDRBNV18W1xcdTA0QTctXFx1MDRBN118W1xcdTA0QTktXFx1MDRBOV18W1xcdTA0QUItXFx1MDRBQl18W1xcdTA0QUQtXFx1MDRBRF18W1xcdTA0QUYtXFx1MDRBRl18W1xcdTA0QjEtXFx1MDRCMV18W1xcdTA0QjMtXFx1MDRCM118W1xcdTA0QjUtXFx1MDRCNV18W1xcdTA0QjctXFx1MDRCN118W1xcdTA0QjktXFx1MDRCOV18W1xcdTA0QkItXFx1MDRCQl18W1xcdTA0QkQtXFx1MDRCRF18W1xcdTA0QkYtXFx1MDRCRl18W1xcdTA0QzItXFx1MDRDMl18W1xcdTA0QzQtXFx1MDRDNF18W1xcdTA0QzgtXFx1MDRDOF18W1xcdTA0Q0MtXFx1MDRDQ118W1xcdTA0RDEtXFx1MDREMV18W1xcdTA0RDMtXFx1MDREM118W1xcdTA0RDUtXFx1MDRENV18W1xcdTA0RDctXFx1MDREN118W1xcdTA0RDktXFx1MDREOV18W1xcdTA0REItXFx1MDREQl18W1xcdTA0REQtXFx1MDRERF18W1xcdTA0REYtXFx1MDRERl18W1xcdTA0RTEtXFx1MDRFMV18W1xcdTA0RTMtXFx1MDRFM118W1xcdTA0RTUtXFx1MDRFNV18W1xcdTA0RTctXFx1MDRFN118W1xcdTA0RTktXFx1MDRFOV18W1xcdTA0RUItXFx1MDRFQl18W1xcdTA0RUYtXFx1MDRFRl18W1xcdTA0RjEtXFx1MDRGMV18W1xcdTA0RjMtXFx1MDRGM118W1xcdTA0RjUtXFx1MDRGNV18W1xcdTA0RjktXFx1MDRGOV18W1xcdTA1NjEtXFx1MDU4N118W1xcdTEwRDAtXFx1MTBGNl18W1xcdTFFMDEtXFx1MUUwMV18W1xcdTFFMDMtXFx1MUUwM118W1xcdTFFMDUtXFx1MUUwNV18W1xcdTFFMDctXFx1MUUwN118W1xcdTFFMDktXFx1MUUwOV18W1xcdTFFMEItXFx1MUUwQl18W1xcdTFFMEQtXFx1MUUwRF18W1xcdTFFMEYtXFx1MUUwRl18W1xcdTFFMTEtXFx1MUUxMV18W1xcdTFFMTMtXFx1MUUxM118W1xcdTFFMTUtXFx1MUUxNV18W1xcdTFFMTctXFx1MUUxN118W1xcdTFFMTktXFx1MUUxOV18W1xcdTFFMUItXFx1MUUxQl18W1xcdTFFMUQtXFx1MUUxRF18W1xcdTFFMUYtXFx1MUUxRl18W1xcdTFFMjEtXFx1MUUyMV18W1xcdTFFMjMtXFx1MUUyM118W1xcdTFFMjUtXFx1MUUyNV18W1xcdTFFMjctXFx1MUUyN118W1xcdTFFMjktXFx1MUUyOV18W1xcdTFFMkItXFx1MUUyQl18W1xcdTFFMkQtXFx1MUUyRF18W1xcdTFFMkYtXFx1MUUyRl18W1xcdTFFMzEtXFx1MUUzMV18W1xcdTFFMzMtXFx1MUUzM118W1xcdTFFMzUtXFx1MUUzNV18W1xcdTFFMzctXFx1MUUzN118W1xcdTFFMzktXFx1MUUzOV18W1xcdTFFM0ItXFx1MUUzQl18W1xcdTFFM0QtXFx1MUUzRF18W1xcdTFFM0YtXFx1MUUzRl18W1xcdTFFNDEtXFx1MUU0MV18W1xcdTFFNDMtXFx1MUU0M118W1xcdTFFNDUtXFx1MUU0NV18W1xcdTFFNDctXFx1MUU0N118W1xcdTFFNDktXFx1MUU0OV18W1xcdTFFNEItXFx1MUU0Ql18W1xcdTFFNEQtXFx1MUU0RF18W1xcdTFFNEYtXFx1MUU0Rl18W1xcdTFFNTEtXFx1MUU1MV18W1xcdTFFNTMtXFx1MUU1M118W1xcdTFFNTUtXFx1MUU1NV18W1xcdTFFNTctXFx1MUU1N118W1xcdTFFNTktXFx1MUU1OV18W1xcdTFFNUItXFx1MUU1Ql18W1xcdTFFNUQtXFx1MUU1RF18W1xcdTFFNUYtXFx1MUU1Rl18W1xcdTFFNjEtXFx1MUU2MV18W1xcdTFFNjMtXFx1MUU2M118W1xcdTFFNjUtXFx1MUU2NV18W1xcdTFFNjctXFx1MUU2N118W1xcdTFFNjktXFx1MUU2OV18W1xcdTFFNkItXFx1MUU2Ql18W1xcdTFFNkQtXFx1MUU2RF18W1xcdTFFNkYtXFx1MUU2Rl18W1xcdTFFNzEtXFx1MUU3MV18W1xcdTFFNzMtXFx1MUU3M118W1xcdTFFNzUtXFx1MUU3NV18W1xcdTFFNzctXFx1MUU3N118W1xcdTFFNzktXFx1MUU3OV18W1xcdTFFN0ItXFx1MUU3Ql18W1xcdTFFN0QtXFx1MUU3RF18W1xcdTFFN0YtXFx1MUU3Rl18W1xcdTFFODEtXFx1MUU4MV18W1xcdTFFODMtXFx1MUU4M118W1xcdTFFODUtXFx1MUU4NV18W1xcdTFFODctXFx1MUU4N118W1xcdTFFODktXFx1MUU4OV18W1xcdTFFOEItXFx1MUU4Ql18W1xcdTFFOEQtXFx1MUU4RF18W1xcdTFFOEYtXFx1MUU4Rl18W1xcdTFFOTEtXFx1MUU5MV18W1xcdTFFOTMtXFx1MUU5M118W1xcdTFFOTUtXFx1MUU5Ql18W1xcdTFFQTEtXFx1MUVBMV18W1xcdTFFQTMtXFx1MUVBM118W1xcdTFFQTUtXFx1MUVBNV18W1xcdTFFQTctXFx1MUVBN118W1xcdTFFQTktXFx1MUVBOV18W1xcdTFFQUItXFx1MUVBQl18W1xcdTFFQUQtXFx1MUVBRF18W1xcdTFFQUYtXFx1MUVBRl18W1xcdTFFQjEtXFx1MUVCMV18W1xcdTFFQjMtXFx1MUVCM118W1xcdTFFQjUtXFx1MUVCNV18W1xcdTFFQjctXFx1MUVCN118W1xcdTFFQjktXFx1MUVCOV18W1xcdTFFQkItXFx1MUVCQl18W1xcdTFFQkQtXFx1MUVCRF18W1xcdTFFQkYtXFx1MUVCRl18W1xcdTFFQzEtXFx1MUVDMV18W1xcdTFFQzMtXFx1MUVDM118W1xcdTFFQzUtXFx1MUVDNV18W1xcdTFFQzctXFx1MUVDN118W1xcdTFFQzktXFx1MUVDOV18W1xcdTFFQ0ItXFx1MUVDQl18W1xcdTFFQ0QtXFx1MUVDRF18W1xcdTFFQ0YtXFx1MUVDRl18W1xcdTFFRDEtXFx1MUVEMV18W1xcdTFFRDMtXFx1MUVEM118W1xcdTFFRDUtXFx1MUVENV18W1xcdTFFRDctXFx1MUVEN118W1xcdTFFRDktXFx1MUVEOV18W1xcdTFFREItXFx1MUVEQl18W1xcdTFFREQtXFx1MUVERF18W1xcdTFFREYtXFx1MUVERl18W1xcdTFFRTEtXFx1MUVFMV18W1xcdTFFRTMtXFx1MUVFM118W1xcdTFFRTUtXFx1MUVFNV18W1xcdTFFRTctXFx1MUVFN118W1xcdTFFRTktXFx1MUVFOV18W1xcdTFFRUItXFx1MUVFQl18W1xcdTFFRUQtXFx1MUVFRF18W1xcdTFFRUYtXFx1MUVFRl18W1xcdTFFRjEtXFx1MUVGMV18W1xcdTFFRjMtXFx1MUVGM118W1xcdTFFRjUtXFx1MUVGNV18W1xcdTFFRjctXFx1MUVGN118W1xcdTFFRjktXFx1MUVGOV18W1xcdTFGMDAtXFx1MUYwN118W1xcdTFGMTAtXFx1MUYxNV18W1xcdTFGMjAtXFx1MUYyN118W1xcdTFGMzAtXFx1MUYzN118W1xcdTFGNDAtXFx1MUY0NV18W1xcdTFGNTAtXFx1MUY1N118W1xcdTFGNjAtXFx1MUY2N118W1xcdTFGNzAtXFx1MUY3RF18W1xcdTFGODAtXFx1MUY4N118W1xcdTFGOTAtXFx1MUY5N118W1xcdTFGQTAtXFx1MUZBN118W1xcdTFGQjAtXFx1MUZCNF18W1xcdTFGQjYtXFx1MUZCN118W1xcdTFGQkUtXFx1MUZCRV18W1xcdTFGQzItXFx1MUZDNF18W1xcdTFGQzYtXFx1MUZDN118W1xcdTFGRDAtXFx1MUZEM118W1xcdTFGRDYtXFx1MUZEN118W1xcdTFGRTAtXFx1MUZFN118W1xcdTFGRjItXFx1MUZGNF18W1xcdTFGRjYtXFx1MUZGN118W1xcdTIwN0YtXFx1MjA3Rl18W1xcdTIxMEEtXFx1MjEwQV18W1xcdTIxMEUtXFx1MjEwRl18W1xcdTIxMTMtXFx1MjExM118W1xcdTIxMTgtXFx1MjExOF18W1xcdTIxMkUtXFx1MjEyRl18W1xcdTIxMzQtXFx1MjEzNF18W1xcdUZCMDAtXFx1RkIwNl18W1xcdUZCMTMtXFx1RkIxN118W1xcdUZGNDEtXFx1RkY1QV0vLFxuICBMdDogL1tcXHUwMUM1LVxcdTAxQzVdfFtcXHUwMUM4LVxcdTAxQzhdfFtcXHUwMUNCLVxcdTAxQ0JdfFtcXHUwMUYyLVxcdTAxRjJdLyxcbiAgTG06IC9bXFx1MDJCMC1cXHUwMkI4XXxbXFx1MDJCQi1cXHUwMkMxXXxbXFx1MDJEMC1cXHUwMkQxXXxbXFx1MDJFMC1cXHUwMkU0XXxbXFx1MDM3QS1cXHUwMzdBXXxbXFx1MDU1OS1cXHUwNTU5XXxbXFx1MDY0MC1cXHUwNjQwXXxbXFx1MDZFNS1cXHUwNkU2XXxbXFx1MEU0Ni1cXHUwRTQ2XXxbXFx1MEVDNi1cXHUwRUM2XXxbXFx1MzAwNS1cXHUzMDA1XXxbXFx1MzAzMS1cXHUzMDM1XXxbXFx1MzA5RC1cXHUzMDlFXXxbXFx1MzBGQy1cXHUzMEZFXXxbXFx1RkY3MC1cXHVGRjcwXXxbXFx1RkY5RS1cXHVGRjlGXS8sXG4gIExvOiAvW1xcdTAxQUEtXFx1MDFBQV18W1xcdTAxQkItXFx1MDFCQl18W1xcdTAxQkUtXFx1MDFDM118W1xcdTAzRjMtXFx1MDNGM118W1xcdTA0QzAtXFx1MDRDMF18W1xcdTA1RDAtXFx1MDVFQV18W1xcdTA1RjAtXFx1MDVGMl18W1xcdTA2MjEtXFx1MDYzQV18W1xcdTA2NDEtXFx1MDY0QV18W1xcdTA2NzEtXFx1MDZCN118W1xcdTA2QkEtXFx1MDZCRV18W1xcdTA2QzAtXFx1MDZDRV18W1xcdTA2RDAtXFx1MDZEM118W1xcdTA2RDUtXFx1MDZENV18W1xcdTA5MDUtXFx1MDkzOV18W1xcdTA5M0QtXFx1MDkzRF18W1xcdTA5NTAtXFx1MDk1MF18W1xcdTA5NTgtXFx1MDk2MV18W1xcdTA5ODUtXFx1MDk4Q118W1xcdTA5OEYtXFx1MDk5MF18W1xcdTA5OTMtXFx1MDlBOF18W1xcdTA5QUEtXFx1MDlCMF18W1xcdTA5QjItXFx1MDlCMl18W1xcdTA5QjYtXFx1MDlCOV18W1xcdTA5REMtXFx1MDlERF18W1xcdTA5REYtXFx1MDlFMV18W1xcdTA5RjAtXFx1MDlGMV18W1xcdTBBMDUtXFx1MEEwQV18W1xcdTBBMEYtXFx1MEExMF18W1xcdTBBMTMtXFx1MEEyOF18W1xcdTBBMkEtXFx1MEEzMF18W1xcdTBBMzItXFx1MEEzM118W1xcdTBBMzUtXFx1MEEzNl18W1xcdTBBMzgtXFx1MEEzOV18W1xcdTBBNTktXFx1MEE1Q118W1xcdTBBNUUtXFx1MEE1RV18W1xcdTBBNzItXFx1MEE3NF18W1xcdTBBODUtXFx1MEE4Ql18W1xcdTBBOEQtXFx1MEE4RF18W1xcdTBBOEYtXFx1MEE5MV18W1xcdTBBOTMtXFx1MEFBOF18W1xcdTBBQUEtXFx1MEFCMF18W1xcdTBBQjItXFx1MEFCM118W1xcdTBBQjUtXFx1MEFCOV18W1xcdTBBQkQtXFx1MEFCRF18W1xcdTBBRDAtXFx1MEFEMF18W1xcdTBBRTAtXFx1MEFFMF18W1xcdTBCMDUtXFx1MEIwQ118W1xcdTBCMEYtXFx1MEIxMF18W1xcdTBCMTMtXFx1MEIyOF18W1xcdTBCMkEtXFx1MEIzMF18W1xcdTBCMzItXFx1MEIzM118W1xcdTBCMzYtXFx1MEIzOV18W1xcdTBCM0QtXFx1MEIzRF18W1xcdTBCNUMtXFx1MEI1RF18W1xcdTBCNUYtXFx1MEI2MV18W1xcdTBCODUtXFx1MEI4QV18W1xcdTBCOEUtXFx1MEI5MF18W1xcdTBCOTItXFx1MEI5NV18W1xcdTBCOTktXFx1MEI5QV18W1xcdTBCOUMtXFx1MEI5Q118W1xcdTBCOUUtXFx1MEI5Rl18W1xcdTBCQTMtXFx1MEJBNF18W1xcdTBCQTgtXFx1MEJBQV18W1xcdTBCQUUtXFx1MEJCNV18W1xcdTBCQjctXFx1MEJCOV18W1xcdTBDMDUtXFx1MEMwQ118W1xcdTBDMEUtXFx1MEMxMF18W1xcdTBDMTItXFx1MEMyOF18W1xcdTBDMkEtXFx1MEMzM118W1xcdTBDMzUtXFx1MEMzOV18W1xcdTBDNjAtXFx1MEM2MV18W1xcdTBDODUtXFx1MEM4Q118W1xcdTBDOEUtXFx1MEM5MF18W1xcdTBDOTItXFx1MENBOF18W1xcdTBDQUEtXFx1MENCM118W1xcdTBDQjUtXFx1MENCOV18W1xcdTBDREUtXFx1MENERV18W1xcdTBDRTAtXFx1MENFMV18W1xcdTBEMDUtXFx1MEQwQ118W1xcdTBEMEUtXFx1MEQxMF18W1xcdTBEMTItXFx1MEQyOF18W1xcdTBEMkEtXFx1MEQzOV18W1xcdTBENjAtXFx1MEQ2MV18W1xcdTBFMDEtXFx1MEUzMF18W1xcdTBFMzItXFx1MEUzM118W1xcdTBFNDAtXFx1MEU0NV18W1xcdTBFODEtXFx1MEU4Ml18W1xcdTBFODQtXFx1MEU4NF18W1xcdTBFODctXFx1MEU4OF18W1xcdTBFOEEtXFx1MEU4QV18W1xcdTBFOEQtXFx1MEU4RF18W1xcdTBFOTQtXFx1MEU5N118W1xcdTBFOTktXFx1MEU5Rl18W1xcdTBFQTEtXFx1MEVBM118W1xcdTBFQTUtXFx1MEVBNV18W1xcdTBFQTctXFx1MEVBN118W1xcdTBFQUEtXFx1MEVBQl18W1xcdTBFQUQtXFx1MEVCMF18W1xcdTBFQjItXFx1MEVCM118W1xcdTBFQkQtXFx1MEVCRF18W1xcdTBFQzAtXFx1MEVDNF18W1xcdTBFREMtXFx1MEVERF18W1xcdTBGMDAtXFx1MEYwMF18W1xcdTBGNDAtXFx1MEY0N118W1xcdTBGNDktXFx1MEY2OV18W1xcdTBGODgtXFx1MEY4Ql18W1xcdTExMDAtXFx1MTE1OV18W1xcdTExNUYtXFx1MTFBMl18W1xcdTExQTgtXFx1MTFGOV18W1xcdTIxMzUtXFx1MjEzOF18W1xcdTMwMDYtXFx1MzAwNl18W1xcdTMwNDEtXFx1MzA5NF18W1xcdTMwQTEtXFx1MzBGQV18W1xcdTMxMDUtXFx1MzEyQ118W1xcdTMxMzEtXFx1MzE4RV18W1xcdTRFMDAtXFx1OUZBNV18W1xcdUFDMDAtXFx1RDdBM118W1xcdUY5MDAtXFx1RkEyRF18W1xcdUZCMUYtXFx1RkIyOF18W1xcdUZCMkEtXFx1RkIzNl18W1xcdUZCMzgtXFx1RkIzQ118W1xcdUZCM0UtXFx1RkIzRV18W1xcdUZCNDAtXFx1RkI0MV18W1xcdUZCNDMtXFx1RkI0NF18W1xcdUZCNDYtXFx1RkJCMV18W1xcdUZCRDMtXFx1RkQzRF18W1xcdUZENTAtXFx1RkQ4Rl18W1xcdUZEOTItXFx1RkRDN118W1xcdUZERjAtXFx1RkRGQl18W1xcdUZFNzAtXFx1RkU3Ml18W1xcdUZFNzQtXFx1RkU3NF18W1xcdUZFNzYtXFx1RkVGQ118W1xcdUZGNjYtXFx1RkY2Rl18W1xcdUZGNzEtXFx1RkY5RF18W1xcdUZGQTAtXFx1RkZCRV18W1xcdUZGQzItXFx1RkZDN118W1xcdUZGQ0EtXFx1RkZDRl18W1xcdUZGRDItXFx1RkZEN118W1xcdUZGREEtXFx1RkZEQ10vLFxuXG4gIC8vIE51bWJlcnNcbiAgTmw6IC9bXFx1MjE2MC1cXHUyMTgyXXxbXFx1MzAwNy1cXHUzMDA3XXxbXFx1MzAyMS1cXHUzMDI5XS8sXG4gIE5kOiAvW1xcdTAwMzAtXFx1MDAzOV18W1xcdTA2NjAtXFx1MDY2OV18W1xcdTA2RjAtXFx1MDZGOV18W1xcdTA5NjYtXFx1MDk2Rl18W1xcdTA5RTYtXFx1MDlFRl18W1xcdTBBNjYtXFx1MEE2Rl18W1xcdTBBRTYtXFx1MEFFRl18W1xcdTBCNjYtXFx1MEI2Rl18W1xcdTBCRTctXFx1MEJFRl18W1xcdTBDNjYtXFx1MEM2Rl18W1xcdTBDRTYtXFx1MENFRl18W1xcdTBENjYtXFx1MEQ2Rl18W1xcdTBFNTAtXFx1MEU1OV18W1xcdTBFRDAtXFx1MEVEOV18W1xcdTBGMjAtXFx1MEYyOV18W1xcdUZGMTAtXFx1RkYxOV0vLFxuXG4gIC8vIE1hcmtzXG4gIE1uOiAvW1xcdTAzMDAtXFx1MDM0NV18W1xcdTAzNjAtXFx1MDM2MV18W1xcdTA0ODMtXFx1MDQ4Nl18W1xcdTA1OTEtXFx1MDVBMV18W1xcdTA1QTMtXFx1MDVCOV18W1xcdTA1QkItXFx1MDVCRF18W1xcdTA1QkYtXFx1MDVCRl18W1xcdTA1QzEtXFx1MDVDMl18W1xcdTA1QzQtXFx1MDVDNF18W1xcdTA2NEItXFx1MDY1Ml18W1xcdTA2NzAtXFx1MDY3MF18W1xcdTA2RDYtXFx1MDZEQ118W1xcdTA2REYtXFx1MDZFNF18W1xcdTA2RTctXFx1MDZFOF18W1xcdTA2RUEtXFx1MDZFRF18W1xcdTA5MDEtXFx1MDkwMl18W1xcdTA5M0MtXFx1MDkzQ118W1xcdTA5NDEtXFx1MDk0OF18W1xcdTA5NEQtXFx1MDk0RF18W1xcdTA5NTEtXFx1MDk1NF18W1xcdTA5NjItXFx1MDk2M118W1xcdTA5ODEtXFx1MDk4MV18W1xcdTA5QkMtXFx1MDlCQ118W1xcdTA5QzEtXFx1MDlDNF18W1xcdTA5Q0QtXFx1MDlDRF18W1xcdTA5RTItXFx1MDlFM118W1xcdTBBMDItXFx1MEEwMl18W1xcdTBBM0MtXFx1MEEzQ118W1xcdTBBNDEtXFx1MEE0Ml18W1xcdTBBNDctXFx1MEE0OF18W1xcdTBBNEItXFx1MEE0RF18W1xcdTBBNzAtXFx1MEE3MV18W1xcdTBBODEtXFx1MEE4Ml18W1xcdTBBQkMtXFx1MEFCQ118W1xcdTBBQzEtXFx1MEFDNV18W1xcdTBBQzctXFx1MEFDOF18W1xcdTBBQ0QtXFx1MEFDRF18W1xcdTBCMDEtXFx1MEIwMV18W1xcdTBCM0MtXFx1MEIzQ118W1xcdTBCM0YtXFx1MEIzRl18W1xcdTBCNDEtXFx1MEI0M118W1xcdTBCNEQtXFx1MEI0RF18W1xcdTBCNTYtXFx1MEI1Nl18W1xcdTBCODItXFx1MEI4Ml18W1xcdTBCQzAtXFx1MEJDMF18W1xcdTBCQ0QtXFx1MEJDRF18W1xcdTBDM0UtXFx1MEM0MF18W1xcdTBDNDYtXFx1MEM0OF18W1xcdTBDNEEtXFx1MEM0RF18W1xcdTBDNTUtXFx1MEM1Nl18W1xcdTBDQkYtXFx1MENCRl18W1xcdTBDQzYtXFx1MENDNl18W1xcdTBDQ0MtXFx1MENDRF18W1xcdTBENDEtXFx1MEQ0M118W1xcdTBENEQtXFx1MEQ0RF18W1xcdTBFMzEtXFx1MEUzMV18W1xcdTBFMzQtXFx1MEUzQV18W1xcdTBFNDctXFx1MEU0RV18W1xcdTBFQjEtXFx1MEVCMV18W1xcdTBFQjQtXFx1MEVCOV18W1xcdTBFQkItXFx1MEVCQ118W1xcdTBFQzgtXFx1MEVDRF18W1xcdTBGMTgtXFx1MEYxOV18W1xcdTBGMzUtXFx1MEYzNV18W1xcdTBGMzctXFx1MEYzN118W1xcdTBGMzktXFx1MEYzOV18W1xcdTBGNzEtXFx1MEY3RV18W1xcdTBGODAtXFx1MEY4NF18W1xcdTBGODYtXFx1MEY4N118W1xcdTBGOTAtXFx1MEY5NV18W1xcdTBGOTctXFx1MEY5N118W1xcdTBGOTktXFx1MEZBRF18W1xcdTBGQjEtXFx1MEZCN118W1xcdTBGQjktXFx1MEZCOV18W1xcdTIwRDAtXFx1MjBEQ118W1xcdTIwRTEtXFx1MjBFMV18W1xcdTMwMkEtXFx1MzAyRl18W1xcdTMwOTktXFx1MzA5QV18W1xcdUZCMUUtXFx1RkIxRV18W1xcdUZFMjAtXFx1RkUyM10vLFxuICBNYzogL1tcXHUwOTAzLVxcdTA5MDNdfFtcXHUwOTNFLVxcdTA5NDBdfFtcXHUwOTQ5LVxcdTA5NENdfFtcXHUwOTgyLVxcdTA5ODNdfFtcXHUwOUJFLVxcdTA5QzBdfFtcXHUwOUM3LVxcdTA5QzhdfFtcXHUwOUNCLVxcdTA5Q0NdfFtcXHUwOUQ3LVxcdTA5RDddfFtcXHUwQTNFLVxcdTBBNDBdfFtcXHUwQTgzLVxcdTBBODNdfFtcXHUwQUJFLVxcdTBBQzBdfFtcXHUwQUM5LVxcdTBBQzldfFtcXHUwQUNCLVxcdTBBQ0NdfFtcXHUwQjAyLVxcdTBCMDNdfFtcXHUwQjNFLVxcdTBCM0VdfFtcXHUwQjQwLVxcdTBCNDBdfFtcXHUwQjQ3LVxcdTBCNDhdfFtcXHUwQjRCLVxcdTBCNENdfFtcXHUwQjU3LVxcdTBCNTddfFtcXHUwQjgzLVxcdTBCODNdfFtcXHUwQkJFLVxcdTBCQkZdfFtcXHUwQkMxLVxcdTBCQzJdfFtcXHUwQkM2LVxcdTBCQzhdfFtcXHUwQkNBLVxcdTBCQ0NdfFtcXHUwQkQ3LVxcdTBCRDddfFtcXHUwQzAxLVxcdTBDMDNdfFtcXHUwQzQxLVxcdTBDNDRdfFtcXHUwQzgyLVxcdTBDODNdfFtcXHUwQ0JFLVxcdTBDQkVdfFtcXHUwQ0MwLVxcdTBDQzRdfFtcXHUwQ0M3LVxcdTBDQzhdfFtcXHUwQ0NBLVxcdTBDQ0JdfFtcXHUwQ0Q1LVxcdTBDRDZdfFtcXHUwRDAyLVxcdTBEMDNdfFtcXHUwRDNFLVxcdTBENDBdfFtcXHUwRDQ2LVxcdTBENDhdfFtcXHUwRDRBLVxcdTBENENdfFtcXHUwRDU3LVxcdTBENTddfFtcXHUwRjNFLVxcdTBGM0ZdfFtcXHUwRjdGLVxcdTBGN0ZdLyxcblxuICAvLyBQdW5jdHVhdGlvbiwgQ29ubmVjdG9yXG4gIFBjOiAvW1xcdTAwNUYtXFx1MDA1Rl18W1xcdTIwM0YtXFx1MjA0MF18W1xcdTMwRkItXFx1MzBGQl18W1xcdUZFMzMtXFx1RkUzNF18W1xcdUZFNEQtXFx1RkU0Rl18W1xcdUZGM0YtXFx1RkYzRl18W1xcdUZGNjUtXFx1RkY2NV0vLFxuXG4gIC8vIFNlcGFyYXRvciwgU3BhY2VcbiAgWnM6IC9bXFx1MjAwMC1cXHUyMDBCXXxbXFx1MzAwMC1cXHUzMDAwXS8sXG5cbiAgLy8gVGhlc2UgdHdvIGFyZSBub3QgcmVhbCBVbmljb2RlIGNhdGVnb3JpZXMsIGJ1dCBvdXIgdXNlZnVsIGZvciBPaG0uXG4gIC8vIEwgaXMgYSBjb21iaW5hdGlvbiBvZiBhbGwgdGhlIGxldHRlciBjYXRlZ29yaWVzLlxuICAvLyBMdG1vIGlzIGEgY29tYmluYXRpb24gb2YgTHQsIExtLCBhbmQgTG8uXG4gIEw6IC9bXFx1MDA0MS1cXHUwMDVBXXxbXFx1MDBDMC1cXHUwMEQ2XXxbXFx1MDBEOC1cXHUwMERFXXxbXFx1MDEwMC1cXHUwMTAwXXxbXFx1MDEwMi1cXHUwMTAyXXxbXFx1MDEwNC1cXHUwMTA0XXxbXFx1MDEwNi1cXHUwMTA2XXxbXFx1MDEwOC1cXHUwMTA4XXxbXFx1MDEwQS1cXHUwMTBBXXxbXFx1MDEwQy1cXHUwMTBDXXxbXFx1MDEwRS1cXHUwMTBFXXxbXFx1MDExMC1cXHUwMTEwXXxbXFx1MDExMi1cXHUwMTEyXXxbXFx1MDExNC1cXHUwMTE0XXxbXFx1MDExNi1cXHUwMTE2XXxbXFx1MDExOC1cXHUwMTE4XXxbXFx1MDExQS1cXHUwMTFBXXxbXFx1MDExQy1cXHUwMTFDXXxbXFx1MDExRS1cXHUwMTFFXXxbXFx1MDEyMC1cXHUwMTIwXXxbXFx1MDEyMi1cXHUwMTIyXXxbXFx1MDEyNC1cXHUwMTI0XXxbXFx1MDEyNi1cXHUwMTI2XXxbXFx1MDEyOC1cXHUwMTI4XXxbXFx1MDEyQS1cXHUwMTJBXXxbXFx1MDEyQy1cXHUwMTJDXXxbXFx1MDEyRS1cXHUwMTJFXXxbXFx1MDEzMC1cXHUwMTMwXXxbXFx1MDEzMi1cXHUwMTMyXXxbXFx1MDEzNC1cXHUwMTM0XXxbXFx1MDEzNi1cXHUwMTM2XXxbXFx1MDEzOS1cXHUwMTM5XXxbXFx1MDEzQi1cXHUwMTNCXXxbXFx1MDEzRC1cXHUwMTNEXXxbXFx1MDEzRi1cXHUwMTNGXXxbXFx1MDE0MS1cXHUwMTQxXXxbXFx1MDE0My1cXHUwMTQzXXxbXFx1MDE0NS1cXHUwMTQ1XXxbXFx1MDE0Ny1cXHUwMTQ3XXxbXFx1MDE0QS1cXHUwMTRBXXxbXFx1MDE0Qy1cXHUwMTRDXXxbXFx1MDE0RS1cXHUwMTRFXXxbXFx1MDE1MC1cXHUwMTUwXXxbXFx1MDE1Mi1cXHUwMTUyXXxbXFx1MDE1NC1cXHUwMTU0XXxbXFx1MDE1Ni1cXHUwMTU2XXxbXFx1MDE1OC1cXHUwMTU4XXxbXFx1MDE1QS1cXHUwMTVBXXxbXFx1MDE1Qy1cXHUwMTVDXXxbXFx1MDE1RS1cXHUwMTVFXXxbXFx1MDE2MC1cXHUwMTYwXXxbXFx1MDE2Mi1cXHUwMTYyXXxbXFx1MDE2NC1cXHUwMTY0XXxbXFx1MDE2Ni1cXHUwMTY2XXxbXFx1MDE2OC1cXHUwMTY4XXxbXFx1MDE2QS1cXHUwMTZBXXxbXFx1MDE2Qy1cXHUwMTZDXXxbXFx1MDE2RS1cXHUwMTZFXXxbXFx1MDE3MC1cXHUwMTcwXXxbXFx1MDE3Mi1cXHUwMTcyXXxbXFx1MDE3NC1cXHUwMTc0XXxbXFx1MDE3Ni1cXHUwMTc2XXxbXFx1MDE3OC1cXHUwMTc5XXxbXFx1MDE3Qi1cXHUwMTdCXXxbXFx1MDE3RC1cXHUwMTdEXXxbXFx1MDE4MS1cXHUwMTgyXXxbXFx1MDE4NC1cXHUwMTg0XXxbXFx1MDE4Ni1cXHUwMTg3XXxbXFx1MDE4OS1cXHUwMThCXXxbXFx1MDE4RS1cXHUwMTkxXXxbXFx1MDE5My1cXHUwMTk0XXxbXFx1MDE5Ni1cXHUwMTk4XXxbXFx1MDE5Qy1cXHUwMTlEXXxbXFx1MDE5Ri1cXHUwMUEwXXxbXFx1MDFBMi1cXHUwMUEyXXxbXFx1MDFBNC1cXHUwMUE0XXxbXFx1MDFBNi1cXHUwMUE3XXxbXFx1MDFBOS1cXHUwMUE5XXxbXFx1MDFBQy1cXHUwMUFDXXxbXFx1MDFBRS1cXHUwMUFGXXxbXFx1MDFCMS1cXHUwMUIzXXxbXFx1MDFCNS1cXHUwMUI1XXxbXFx1MDFCNy1cXHUwMUI4XXxbXFx1MDFCQy1cXHUwMUJDXXxbXFx1MDFDNC1cXHUwMUM0XXxbXFx1MDFDNy1cXHUwMUM3XXxbXFx1MDFDQS1cXHUwMUNBXXxbXFx1MDFDRC1cXHUwMUNEXXxbXFx1MDFDRi1cXHUwMUNGXXxbXFx1MDFEMS1cXHUwMUQxXXxbXFx1MDFEMy1cXHUwMUQzXXxbXFx1MDFENS1cXHUwMUQ1XXxbXFx1MDFENy1cXHUwMUQ3XXxbXFx1MDFEOS1cXHUwMUQ5XXxbXFx1MDFEQi1cXHUwMURCXXxbXFx1MDFERS1cXHUwMURFXXxbXFx1MDFFMC1cXHUwMUUwXXxbXFx1MDFFMi1cXHUwMUUyXXxbXFx1MDFFNC1cXHUwMUU0XXxbXFx1MDFFNi1cXHUwMUU2XXxbXFx1MDFFOC1cXHUwMUU4XXxbXFx1MDFFQS1cXHUwMUVBXXxbXFx1MDFFQy1cXHUwMUVDXXxbXFx1MDFFRS1cXHUwMUVFXXxbXFx1MDFGMS1cXHUwMUYxXXxbXFx1MDFGNC1cXHUwMUY0XXxbXFx1MDFGQS1cXHUwMUZBXXxbXFx1MDFGQy1cXHUwMUZDXXxbXFx1MDFGRS1cXHUwMUZFXXxbXFx1MDIwMC1cXHUwMjAwXXxbXFx1MDIwMi1cXHUwMjAyXXxbXFx1MDIwNC1cXHUwMjA0XXxbXFx1MDIwNi1cXHUwMjA2XXxbXFx1MDIwOC1cXHUwMjA4XXxbXFx1MDIwQS1cXHUwMjBBXXxbXFx1MDIwQy1cXHUwMjBDXXxbXFx1MDIwRS1cXHUwMjBFXXxbXFx1MDIxMC1cXHUwMjEwXXxbXFx1MDIxMi1cXHUwMjEyXXxbXFx1MDIxNC1cXHUwMjE0XXxbXFx1MDIxNi1cXHUwMjE2XXxbXFx1MDM4Ni1cXHUwMzg2XXxbXFx1MDM4OC1cXHUwMzhBXXxbXFx1MDM4Qy1cXHUwMzhDXXxbXFx1MDM4RS1cXHUwMzhGXXxbXFx1MDM5MS1cXHUwM0ExXXxbXFx1MDNBMy1cXHUwM0FCXXxbXFx1MDNEMi1cXHUwM0Q0XXxbXFx1MDNEQS1cXHUwM0RBXXxbXFx1MDNEQy1cXHUwM0RDXXxbXFx1MDNERS1cXHUwM0RFXXxbXFx1MDNFMC1cXHUwM0UwXXxbXFx1MDNFMi1cXHUwM0UyXXxbXFx1MDNFNC1cXHUwM0U0XXxbXFx1MDNFNi1cXHUwM0U2XXxbXFx1MDNFOC1cXHUwM0U4XXxbXFx1MDNFQS1cXHUwM0VBXXxbXFx1MDNFQy1cXHUwM0VDXXxbXFx1MDNFRS1cXHUwM0VFXXxbXFx1MDQwMS1cXHUwNDBDXXxbXFx1MDQwRS1cXHUwNDJGXXxbXFx1MDQ2MC1cXHUwNDYwXXxbXFx1MDQ2Mi1cXHUwNDYyXXxbXFx1MDQ2NC1cXHUwNDY0XXxbXFx1MDQ2Ni1cXHUwNDY2XXxbXFx1MDQ2OC1cXHUwNDY4XXxbXFx1MDQ2QS1cXHUwNDZBXXxbXFx1MDQ2Qy1cXHUwNDZDXXxbXFx1MDQ2RS1cXHUwNDZFXXxbXFx1MDQ3MC1cXHUwNDcwXXxbXFx1MDQ3Mi1cXHUwNDcyXXxbXFx1MDQ3NC1cXHUwNDc0XXxbXFx1MDQ3Ni1cXHUwNDc2XXxbXFx1MDQ3OC1cXHUwNDc4XXxbXFx1MDQ3QS1cXHUwNDdBXXxbXFx1MDQ3Qy1cXHUwNDdDXXxbXFx1MDQ3RS1cXHUwNDdFXXxbXFx1MDQ4MC1cXHUwNDgwXXxbXFx1MDQ5MC1cXHUwNDkwXXxbXFx1MDQ5Mi1cXHUwNDkyXXxbXFx1MDQ5NC1cXHUwNDk0XXxbXFx1MDQ5Ni1cXHUwNDk2XXxbXFx1MDQ5OC1cXHUwNDk4XXxbXFx1MDQ5QS1cXHUwNDlBXXxbXFx1MDQ5Qy1cXHUwNDlDXXxbXFx1MDQ5RS1cXHUwNDlFXXxbXFx1MDRBMC1cXHUwNEEwXXxbXFx1MDRBMi1cXHUwNEEyXXxbXFx1MDRBNC1cXHUwNEE0XXxbXFx1MDRBNi1cXHUwNEE2XXxbXFx1MDRBOC1cXHUwNEE4XXxbXFx1MDRBQS1cXHUwNEFBXXxbXFx1MDRBQy1cXHUwNEFDXXxbXFx1MDRBRS1cXHUwNEFFXXxbXFx1MDRCMC1cXHUwNEIwXXxbXFx1MDRCMi1cXHUwNEIyXXxbXFx1MDRCNC1cXHUwNEI0XXxbXFx1MDRCNi1cXHUwNEI2XXxbXFx1MDRCOC1cXHUwNEI4XXxbXFx1MDRCQS1cXHUwNEJBXXxbXFx1MDRCQy1cXHUwNEJDXXxbXFx1MDRCRS1cXHUwNEJFXXxbXFx1MDRDMS1cXHUwNEMxXXxbXFx1MDRDMy1cXHUwNEMzXXxbXFx1MDRDNy1cXHUwNEM3XXxbXFx1MDRDQi1cXHUwNENCXXxbXFx1MDREMC1cXHUwNEQwXXxbXFx1MDREMi1cXHUwNEQyXXxbXFx1MDRENC1cXHUwNEQ0XXxbXFx1MDRENi1cXHUwNEQ2XXxbXFx1MDREOC1cXHUwNEQ4XXxbXFx1MDREQS1cXHUwNERBXXxbXFx1MDREQy1cXHUwNERDXXxbXFx1MDRERS1cXHUwNERFXXxbXFx1MDRFMC1cXHUwNEUwXXxbXFx1MDRFMi1cXHUwNEUyXXxbXFx1MDRFNC1cXHUwNEU0XXxbXFx1MDRFNi1cXHUwNEU2XXxbXFx1MDRFOC1cXHUwNEU4XXxbXFx1MDRFQS1cXHUwNEVBXXxbXFx1MDRFRS1cXHUwNEVFXXxbXFx1MDRGMC1cXHUwNEYwXXxbXFx1MDRGMi1cXHUwNEYyXXxbXFx1MDRGNC1cXHUwNEY0XXxbXFx1MDRGOC1cXHUwNEY4XXxbXFx1MDUzMS1cXHUwNTU2XXxbXFx1MTBBMC1cXHUxMEM1XXxbXFx1MUUwMC1cXHUxRTAwXXxbXFx1MUUwMi1cXHUxRTAyXXxbXFx1MUUwNC1cXHUxRTA0XXxbXFx1MUUwNi1cXHUxRTA2XXxbXFx1MUUwOC1cXHUxRTA4XXxbXFx1MUUwQS1cXHUxRTBBXXxbXFx1MUUwQy1cXHUxRTBDXXxbXFx1MUUwRS1cXHUxRTBFXXxbXFx1MUUxMC1cXHUxRTEwXXxbXFx1MUUxMi1cXHUxRTEyXXxbXFx1MUUxNC1cXHUxRTE0XXxbXFx1MUUxNi1cXHUxRTE2XXxbXFx1MUUxOC1cXHUxRTE4XXxbXFx1MUUxQS1cXHUxRTFBXXxbXFx1MUUxQy1cXHUxRTFDXXxbXFx1MUUxRS1cXHUxRTFFXXxbXFx1MUUyMC1cXHUxRTIwXXxbXFx1MUUyMi1cXHUxRTIyXXxbXFx1MUUyNC1cXHUxRTI0XXxbXFx1MUUyNi1cXHUxRTI2XXxbXFx1MUUyOC1cXHUxRTI4XXxbXFx1MUUyQS1cXHUxRTJBXXxbXFx1MUUyQy1cXHUxRTJDXXxbXFx1MUUyRS1cXHUxRTJFXXxbXFx1MUUzMC1cXHUxRTMwXXxbXFx1MUUzMi1cXHUxRTMyXXxbXFx1MUUzNC1cXHUxRTM0XXxbXFx1MUUzNi1cXHUxRTM2XXxbXFx1MUUzOC1cXHUxRTM4XXxbXFx1MUUzQS1cXHUxRTNBXXxbXFx1MUUzQy1cXHUxRTNDXXxbXFx1MUUzRS1cXHUxRTNFXXxbXFx1MUU0MC1cXHUxRTQwXXxbXFx1MUU0Mi1cXHUxRTQyXXxbXFx1MUU0NC1cXHUxRTQ0XXxbXFx1MUU0Ni1cXHUxRTQ2XXxbXFx1MUU0OC1cXHUxRTQ4XXxbXFx1MUU0QS1cXHUxRTRBXXxbXFx1MUU0Qy1cXHUxRTRDXXxbXFx1MUU0RS1cXHUxRTRFXXxbXFx1MUU1MC1cXHUxRTUwXXxbXFx1MUU1Mi1cXHUxRTUyXXxbXFx1MUU1NC1cXHUxRTU0XXxbXFx1MUU1Ni1cXHUxRTU2XXxbXFx1MUU1OC1cXHUxRTU4XXxbXFx1MUU1QS1cXHUxRTVBXXxbXFx1MUU1Qy1cXHUxRTVDXXxbXFx1MUU1RS1cXHUxRTVFXXxbXFx1MUU2MC1cXHUxRTYwXXxbXFx1MUU2Mi1cXHUxRTYyXXxbXFx1MUU2NC1cXHUxRTY0XXxbXFx1MUU2Ni1cXHUxRTY2XXxbXFx1MUU2OC1cXHUxRTY4XXxbXFx1MUU2QS1cXHUxRTZBXXxbXFx1MUU2Qy1cXHUxRTZDXXxbXFx1MUU2RS1cXHUxRTZFXXxbXFx1MUU3MC1cXHUxRTcwXXxbXFx1MUU3Mi1cXHUxRTcyXXxbXFx1MUU3NC1cXHUxRTc0XXxbXFx1MUU3Ni1cXHUxRTc2XXxbXFx1MUU3OC1cXHUxRTc4XXxbXFx1MUU3QS1cXHUxRTdBXXxbXFx1MUU3Qy1cXHUxRTdDXXxbXFx1MUU3RS1cXHUxRTdFXXxbXFx1MUU4MC1cXHUxRTgwXXxbXFx1MUU4Mi1cXHUxRTgyXXxbXFx1MUU4NC1cXHUxRTg0XXxbXFx1MUU4Ni1cXHUxRTg2XXxbXFx1MUU4OC1cXHUxRTg4XXxbXFx1MUU4QS1cXHUxRThBXXxbXFx1MUU4Qy1cXHUxRThDXXxbXFx1MUU4RS1cXHUxRThFXXxbXFx1MUU5MC1cXHUxRTkwXXxbXFx1MUU5Mi1cXHUxRTkyXXxbXFx1MUU5NC1cXHUxRTk0XXxbXFx1MUVBMC1cXHUxRUEwXXxbXFx1MUVBMi1cXHUxRUEyXXxbXFx1MUVBNC1cXHUxRUE0XXxbXFx1MUVBNi1cXHUxRUE2XXxbXFx1MUVBOC1cXHUxRUE4XXxbXFx1MUVBQS1cXHUxRUFBXXxbXFx1MUVBQy1cXHUxRUFDXXxbXFx1MUVBRS1cXHUxRUFFXXxbXFx1MUVCMC1cXHUxRUIwXXxbXFx1MUVCMi1cXHUxRUIyXXxbXFx1MUVCNC1cXHUxRUI0XXxbXFx1MUVCNi1cXHUxRUI2XXxbXFx1MUVCOC1cXHUxRUI4XXxbXFx1MUVCQS1cXHUxRUJBXXxbXFx1MUVCQy1cXHUxRUJDXXxbXFx1MUVCRS1cXHUxRUJFXXxbXFx1MUVDMC1cXHUxRUMwXXxbXFx1MUVDMi1cXHUxRUMyXXxbXFx1MUVDNC1cXHUxRUM0XXxbXFx1MUVDNi1cXHUxRUM2XXxbXFx1MUVDOC1cXHUxRUM4XXxbXFx1MUVDQS1cXHUxRUNBXXxbXFx1MUVDQy1cXHUxRUNDXXxbXFx1MUVDRS1cXHUxRUNFXXxbXFx1MUVEMC1cXHUxRUQwXXxbXFx1MUVEMi1cXHUxRUQyXXxbXFx1MUVENC1cXHUxRUQ0XXxbXFx1MUVENi1cXHUxRUQ2XXxbXFx1MUVEOC1cXHUxRUQ4XXxbXFx1MUVEQS1cXHUxRURBXXxbXFx1MUVEQy1cXHUxRURDXXxbXFx1MUVERS1cXHUxRURFXXxbXFx1MUVFMC1cXHUxRUUwXXxbXFx1MUVFMi1cXHUxRUUyXXxbXFx1MUVFNC1cXHUxRUU0XXxbXFx1MUVFNi1cXHUxRUU2XXxbXFx1MUVFOC1cXHUxRUU4XXxbXFx1MUVFQS1cXHUxRUVBXXxbXFx1MUVFQy1cXHUxRUVDXXxbXFx1MUVFRS1cXHUxRUVFXXxbXFx1MUVGMC1cXHUxRUYwXXxbXFx1MUVGMi1cXHUxRUYyXXxbXFx1MUVGNC1cXHUxRUY0XXxbXFx1MUVGNi1cXHUxRUY2XXxbXFx1MUVGOC1cXHUxRUY4XXxbXFx1MUYwOC1cXHUxRjBGXXxbXFx1MUYxOC1cXHUxRjFEXXxbXFx1MUYyOC1cXHUxRjJGXXxbXFx1MUYzOC1cXHUxRjNGXXxbXFx1MUY0OC1cXHUxRjREXXxbXFx1MUY1OS1cXHUxRjU5XXxbXFx1MUY1Qi1cXHUxRjVCXXxbXFx1MUY1RC1cXHUxRjVEXXxbXFx1MUY1Ri1cXHUxRjVGXXxbXFx1MUY2OC1cXHUxRjZGXXxbXFx1MUY4OC1cXHUxRjhGXXxbXFx1MUY5OC1cXHUxRjlGXXxbXFx1MUZBOC1cXHUxRkFGXXxbXFx1MUZCOC1cXHUxRkJDXXxbXFx1MUZDOC1cXHUxRkNDXXxbXFx1MUZEOC1cXHUxRkRCXXxbXFx1MUZFOC1cXHUxRkVDXXxbXFx1MUZGOC1cXHUxRkZDXXxbXFx1MjEwMi1cXHUyMTAyXXxbXFx1MjEwNy1cXHUyMTA3XXxbXFx1MjEwQi1cXHUyMTBEXXxbXFx1MjExMC1cXHUyMTEyXXxbXFx1MjExNS1cXHUyMTE1XXxbXFx1MjExOS1cXHUyMTFEXXxbXFx1MjEyNC1cXHUyMTI0XXxbXFx1MjEyNi1cXHUyMTI2XXxbXFx1MjEyOC1cXHUyMTI4XXxbXFx1MjEyQS1cXHUyMTJEXXxbXFx1MjEzMC1cXHUyMTMxXXxbXFx1MjEzMy1cXHUyMTMzXXxbXFx1RkYyMS1cXHVGRjNBXXxbXFx1MDA2MS1cXHUwMDdBXXxbXFx1MDBBQS1cXHUwMEFBXXxbXFx1MDBCNS1cXHUwMEI1XXxbXFx1MDBCQS1cXHUwMEJBXXxbXFx1MDBERi1cXHUwMEY2XXxbXFx1MDBGOC1cXHUwMEZGXXxbXFx1MDEwMS1cXHUwMTAxXXxbXFx1MDEwMy1cXHUwMTAzXXxbXFx1MDEwNS1cXHUwMTA1XXxbXFx1MDEwNy1cXHUwMTA3XXxbXFx1MDEwOS1cXHUwMTA5XXxbXFx1MDEwQi1cXHUwMTBCXXxbXFx1MDEwRC1cXHUwMTBEXXxbXFx1MDEwRi1cXHUwMTBGXXxbXFx1MDExMS1cXHUwMTExXXxbXFx1MDExMy1cXHUwMTEzXXxbXFx1MDExNS1cXHUwMTE1XXxbXFx1MDExNy1cXHUwMTE3XXxbXFx1MDExOS1cXHUwMTE5XXxbXFx1MDExQi1cXHUwMTFCXXxbXFx1MDExRC1cXHUwMTFEXXxbXFx1MDExRi1cXHUwMTFGXXxbXFx1MDEyMS1cXHUwMTIxXXxbXFx1MDEyMy1cXHUwMTIzXXxbXFx1MDEyNS1cXHUwMTI1XXxbXFx1MDEyNy1cXHUwMTI3XXxbXFx1MDEyOS1cXHUwMTI5XXxbXFx1MDEyQi1cXHUwMTJCXXxbXFx1MDEyRC1cXHUwMTJEXXxbXFx1MDEyRi1cXHUwMTJGXXxbXFx1MDEzMS1cXHUwMTMxXXxbXFx1MDEzMy1cXHUwMTMzXXxbXFx1MDEzNS1cXHUwMTM1XXxbXFx1MDEzNy1cXHUwMTM4XXxbXFx1MDEzQS1cXHUwMTNBXXxbXFx1MDEzQy1cXHUwMTNDXXxbXFx1MDEzRS1cXHUwMTNFXXxbXFx1MDE0MC1cXHUwMTQwXXxbXFx1MDE0Mi1cXHUwMTQyXXxbXFx1MDE0NC1cXHUwMTQ0XXxbXFx1MDE0Ni1cXHUwMTQ2XXxbXFx1MDE0OC1cXHUwMTQ5XXxbXFx1MDE0Qi1cXHUwMTRCXXxbXFx1MDE0RC1cXHUwMTREXXxbXFx1MDE0Ri1cXHUwMTRGXXxbXFx1MDE1MS1cXHUwMTUxXXxbXFx1MDE1My1cXHUwMTUzXXxbXFx1MDE1NS1cXHUwMTU1XXxbXFx1MDE1Ny1cXHUwMTU3XXxbXFx1MDE1OS1cXHUwMTU5XXxbXFx1MDE1Qi1cXHUwMTVCXXxbXFx1MDE1RC1cXHUwMTVEXXxbXFx1MDE1Ri1cXHUwMTVGXXxbXFx1MDE2MS1cXHUwMTYxXXxbXFx1MDE2My1cXHUwMTYzXXxbXFx1MDE2NS1cXHUwMTY1XXxbXFx1MDE2Ny1cXHUwMTY3XXxbXFx1MDE2OS1cXHUwMTY5XXxbXFx1MDE2Qi1cXHUwMTZCXXxbXFx1MDE2RC1cXHUwMTZEXXxbXFx1MDE2Ri1cXHUwMTZGXXxbXFx1MDE3MS1cXHUwMTcxXXxbXFx1MDE3My1cXHUwMTczXXxbXFx1MDE3NS1cXHUwMTc1XXxbXFx1MDE3Ny1cXHUwMTc3XXxbXFx1MDE3QS1cXHUwMTdBXXxbXFx1MDE3Qy1cXHUwMTdDXXxbXFx1MDE3RS1cXHUwMTgwXXxbXFx1MDE4My1cXHUwMTgzXXxbXFx1MDE4NS1cXHUwMTg1XXxbXFx1MDE4OC1cXHUwMTg4XXxbXFx1MDE4Qy1cXHUwMThEXXxbXFx1MDE5Mi1cXHUwMTkyXXxbXFx1MDE5NS1cXHUwMTk1XXxbXFx1MDE5OS1cXHUwMTlCXXxbXFx1MDE5RS1cXHUwMTlFXXxbXFx1MDFBMS1cXHUwMUExXXxbXFx1MDFBMy1cXHUwMUEzXXxbXFx1MDFBNS1cXHUwMUE1XXxbXFx1MDFBOC1cXHUwMUE4XXxbXFx1MDFBQi1cXHUwMUFCXXxbXFx1MDFBRC1cXHUwMUFEXXxbXFx1MDFCMC1cXHUwMUIwXXxbXFx1MDFCNC1cXHUwMUI0XXxbXFx1MDFCNi1cXHUwMUI2XXxbXFx1MDFCOS1cXHUwMUJBXXxbXFx1MDFCRC1cXHUwMUJEXXxbXFx1MDFDNi1cXHUwMUM2XXxbXFx1MDFDOS1cXHUwMUM5XXxbXFx1MDFDQy1cXHUwMUNDXXxbXFx1MDFDRS1cXHUwMUNFXXxbXFx1MDFEMC1cXHUwMUQwXXxbXFx1MDFEMi1cXHUwMUQyXXxbXFx1MDFENC1cXHUwMUQ0XXxbXFx1MDFENi1cXHUwMUQ2XXxbXFx1MDFEOC1cXHUwMUQ4XXxbXFx1MDFEQS1cXHUwMURBXXxbXFx1MDFEQy1cXHUwMUREXXxbXFx1MDFERi1cXHUwMURGXXxbXFx1MDFFMS1cXHUwMUUxXXxbXFx1MDFFMy1cXHUwMUUzXXxbXFx1MDFFNS1cXHUwMUU1XXxbXFx1MDFFNy1cXHUwMUU3XXxbXFx1MDFFOS1cXHUwMUU5XXxbXFx1MDFFQi1cXHUwMUVCXXxbXFx1MDFFRC1cXHUwMUVEXXxbXFx1MDFFRi1cXHUwMUYwXXxbXFx1MDFGMy1cXHUwMUYzXXxbXFx1MDFGNS1cXHUwMUY1XXxbXFx1MDFGQi1cXHUwMUZCXXxbXFx1MDFGRC1cXHUwMUZEXXxbXFx1MDFGRi1cXHUwMUZGXXxbXFx1MDIwMS1cXHUwMjAxXXxbXFx1MDIwMy1cXHUwMjAzXXxbXFx1MDIwNS1cXHUwMjA1XXxbXFx1MDIwNy1cXHUwMjA3XXxbXFx1MDIwOS1cXHUwMjA5XXxbXFx1MDIwQi1cXHUwMjBCXXxbXFx1MDIwRC1cXHUwMjBEXXxbXFx1MDIwRi1cXHUwMjBGXXxbXFx1MDIxMS1cXHUwMjExXXxbXFx1MDIxMy1cXHUwMjEzXXxbXFx1MDIxNS1cXHUwMjE1XXxbXFx1MDIxNy1cXHUwMjE3XXxbXFx1MDI1MC1cXHUwMkE4XXxbXFx1MDM5MC1cXHUwMzkwXXxbXFx1MDNBQy1cXHUwM0NFXXxbXFx1MDNEMC1cXHUwM0QxXXxbXFx1MDNENS1cXHUwM0Q2XXxbXFx1MDNFMy1cXHUwM0UzXXxbXFx1MDNFNS1cXHUwM0U1XXxbXFx1MDNFNy1cXHUwM0U3XXxbXFx1MDNFOS1cXHUwM0U5XXxbXFx1MDNFQi1cXHUwM0VCXXxbXFx1MDNFRC1cXHUwM0VEXXxbXFx1MDNFRi1cXHUwM0YyXXxbXFx1MDQzMC1cXHUwNDRGXXxbXFx1MDQ1MS1cXHUwNDVDXXxbXFx1MDQ1RS1cXHUwNDVGXXxbXFx1MDQ2MS1cXHUwNDYxXXxbXFx1MDQ2My1cXHUwNDYzXXxbXFx1MDQ2NS1cXHUwNDY1XXxbXFx1MDQ2Ny1cXHUwNDY3XXxbXFx1MDQ2OS1cXHUwNDY5XXxbXFx1MDQ2Qi1cXHUwNDZCXXxbXFx1MDQ2RC1cXHUwNDZEXXxbXFx1MDQ2Ri1cXHUwNDZGXXxbXFx1MDQ3MS1cXHUwNDcxXXxbXFx1MDQ3My1cXHUwNDczXXxbXFx1MDQ3NS1cXHUwNDc1XXxbXFx1MDQ3Ny1cXHUwNDc3XXxbXFx1MDQ3OS1cXHUwNDc5XXxbXFx1MDQ3Qi1cXHUwNDdCXXxbXFx1MDQ3RC1cXHUwNDdEXXxbXFx1MDQ3Ri1cXHUwNDdGXXxbXFx1MDQ4MS1cXHUwNDgxXXxbXFx1MDQ5MS1cXHUwNDkxXXxbXFx1MDQ5My1cXHUwNDkzXXxbXFx1MDQ5NS1cXHUwNDk1XXxbXFx1MDQ5Ny1cXHUwNDk3XXxbXFx1MDQ5OS1cXHUwNDk5XXxbXFx1MDQ5Qi1cXHUwNDlCXXxbXFx1MDQ5RC1cXHUwNDlEXXxbXFx1MDQ5Ri1cXHUwNDlGXXxbXFx1MDRBMS1cXHUwNEExXXxbXFx1MDRBMy1cXHUwNEEzXXxbXFx1MDRBNS1cXHUwNEE1XXxbXFx1MDRBNy1cXHUwNEE3XXxbXFx1MDRBOS1cXHUwNEE5XXxbXFx1MDRBQi1cXHUwNEFCXXxbXFx1MDRBRC1cXHUwNEFEXXxbXFx1MDRBRi1cXHUwNEFGXXxbXFx1MDRCMS1cXHUwNEIxXXxbXFx1MDRCMy1cXHUwNEIzXXxbXFx1MDRCNS1cXHUwNEI1XXxbXFx1MDRCNy1cXHUwNEI3XXxbXFx1MDRCOS1cXHUwNEI5XXxbXFx1MDRCQi1cXHUwNEJCXXxbXFx1MDRCRC1cXHUwNEJEXXxbXFx1MDRCRi1cXHUwNEJGXXxbXFx1MDRDMi1cXHUwNEMyXXxbXFx1MDRDNC1cXHUwNEM0XXxbXFx1MDRDOC1cXHUwNEM4XXxbXFx1MDRDQy1cXHUwNENDXXxbXFx1MDREMS1cXHUwNEQxXXxbXFx1MDREMy1cXHUwNEQzXXxbXFx1MDRENS1cXHUwNEQ1XXxbXFx1MDRENy1cXHUwNEQ3XXxbXFx1MDREOS1cXHUwNEQ5XXxbXFx1MDREQi1cXHUwNERCXXxbXFx1MDRERC1cXHUwNEREXXxbXFx1MDRERi1cXHUwNERGXXxbXFx1MDRFMS1cXHUwNEUxXXxbXFx1MDRFMy1cXHUwNEUzXXxbXFx1MDRFNS1cXHUwNEU1XXxbXFx1MDRFNy1cXHUwNEU3XXxbXFx1MDRFOS1cXHUwNEU5XXxbXFx1MDRFQi1cXHUwNEVCXXxbXFx1MDRFRi1cXHUwNEVGXXxbXFx1MDRGMS1cXHUwNEYxXXxbXFx1MDRGMy1cXHUwNEYzXXxbXFx1MDRGNS1cXHUwNEY1XXxbXFx1MDRGOS1cXHUwNEY5XXxbXFx1MDU2MS1cXHUwNTg3XXxbXFx1MTBEMC1cXHUxMEY2XXxbXFx1MUUwMS1cXHUxRTAxXXxbXFx1MUUwMy1cXHUxRTAzXXxbXFx1MUUwNS1cXHUxRTA1XXxbXFx1MUUwNy1cXHUxRTA3XXxbXFx1MUUwOS1cXHUxRTA5XXxbXFx1MUUwQi1cXHUxRTBCXXxbXFx1MUUwRC1cXHUxRTBEXXxbXFx1MUUwRi1cXHUxRTBGXXxbXFx1MUUxMS1cXHUxRTExXXxbXFx1MUUxMy1cXHUxRTEzXXxbXFx1MUUxNS1cXHUxRTE1XXxbXFx1MUUxNy1cXHUxRTE3XXxbXFx1MUUxOS1cXHUxRTE5XXxbXFx1MUUxQi1cXHUxRTFCXXxbXFx1MUUxRC1cXHUxRTFEXXxbXFx1MUUxRi1cXHUxRTFGXXxbXFx1MUUyMS1cXHUxRTIxXXxbXFx1MUUyMy1cXHUxRTIzXXxbXFx1MUUyNS1cXHUxRTI1XXxbXFx1MUUyNy1cXHUxRTI3XXxbXFx1MUUyOS1cXHUxRTI5XXxbXFx1MUUyQi1cXHUxRTJCXXxbXFx1MUUyRC1cXHUxRTJEXXxbXFx1MUUyRi1cXHUxRTJGXXxbXFx1MUUzMS1cXHUxRTMxXXxbXFx1MUUzMy1cXHUxRTMzXXxbXFx1MUUzNS1cXHUxRTM1XXxbXFx1MUUzNy1cXHUxRTM3XXxbXFx1MUUzOS1cXHUxRTM5XXxbXFx1MUUzQi1cXHUxRTNCXXxbXFx1MUUzRC1cXHUxRTNEXXxbXFx1MUUzRi1cXHUxRTNGXXxbXFx1MUU0MS1cXHUxRTQxXXxbXFx1MUU0My1cXHUxRTQzXXxbXFx1MUU0NS1cXHUxRTQ1XXxbXFx1MUU0Ny1cXHUxRTQ3XXxbXFx1MUU0OS1cXHUxRTQ5XXxbXFx1MUU0Qi1cXHUxRTRCXXxbXFx1MUU0RC1cXHUxRTREXXxbXFx1MUU0Ri1cXHUxRTRGXXxbXFx1MUU1MS1cXHUxRTUxXXxbXFx1MUU1My1cXHUxRTUzXXxbXFx1MUU1NS1cXHUxRTU1XXxbXFx1MUU1Ny1cXHUxRTU3XXxbXFx1MUU1OS1cXHUxRTU5XXxbXFx1MUU1Qi1cXHUxRTVCXXxbXFx1MUU1RC1cXHUxRTVEXXxbXFx1MUU1Ri1cXHUxRTVGXXxbXFx1MUU2MS1cXHUxRTYxXXxbXFx1MUU2My1cXHUxRTYzXXxbXFx1MUU2NS1cXHUxRTY1XXxbXFx1MUU2Ny1cXHUxRTY3XXxbXFx1MUU2OS1cXHUxRTY5XXxbXFx1MUU2Qi1cXHUxRTZCXXxbXFx1MUU2RC1cXHUxRTZEXXxbXFx1MUU2Ri1cXHUxRTZGXXxbXFx1MUU3MS1cXHUxRTcxXXxbXFx1MUU3My1cXHUxRTczXXxbXFx1MUU3NS1cXHUxRTc1XXxbXFx1MUU3Ny1cXHUxRTc3XXxbXFx1MUU3OS1cXHUxRTc5XXxbXFx1MUU3Qi1cXHUxRTdCXXxbXFx1MUU3RC1cXHUxRTdEXXxbXFx1MUU3Ri1cXHUxRTdGXXxbXFx1MUU4MS1cXHUxRTgxXXxbXFx1MUU4My1cXHUxRTgzXXxbXFx1MUU4NS1cXHUxRTg1XXxbXFx1MUU4Ny1cXHUxRTg3XXxbXFx1MUU4OS1cXHUxRTg5XXxbXFx1MUU4Qi1cXHUxRThCXXxbXFx1MUU4RC1cXHUxRThEXXxbXFx1MUU4Ri1cXHUxRThGXXxbXFx1MUU5MS1cXHUxRTkxXXxbXFx1MUU5My1cXHUxRTkzXXxbXFx1MUU5NS1cXHUxRTlCXXxbXFx1MUVBMS1cXHUxRUExXXxbXFx1MUVBMy1cXHUxRUEzXXxbXFx1MUVBNS1cXHUxRUE1XXxbXFx1MUVBNy1cXHUxRUE3XXxbXFx1MUVBOS1cXHUxRUE5XXxbXFx1MUVBQi1cXHUxRUFCXXxbXFx1MUVBRC1cXHUxRUFEXXxbXFx1MUVBRi1cXHUxRUFGXXxbXFx1MUVCMS1cXHUxRUIxXXxbXFx1MUVCMy1cXHUxRUIzXXxbXFx1MUVCNS1cXHUxRUI1XXxbXFx1MUVCNy1cXHUxRUI3XXxbXFx1MUVCOS1cXHUxRUI5XXxbXFx1MUVCQi1cXHUxRUJCXXxbXFx1MUVCRC1cXHUxRUJEXXxbXFx1MUVCRi1cXHUxRUJGXXxbXFx1MUVDMS1cXHUxRUMxXXxbXFx1MUVDMy1cXHUxRUMzXXxbXFx1MUVDNS1cXHUxRUM1XXxbXFx1MUVDNy1cXHUxRUM3XXxbXFx1MUVDOS1cXHUxRUM5XXxbXFx1MUVDQi1cXHUxRUNCXXxbXFx1MUVDRC1cXHUxRUNEXXxbXFx1MUVDRi1cXHUxRUNGXXxbXFx1MUVEMS1cXHUxRUQxXXxbXFx1MUVEMy1cXHUxRUQzXXxbXFx1MUVENS1cXHUxRUQ1XXxbXFx1MUVENy1cXHUxRUQ3XXxbXFx1MUVEOS1cXHUxRUQ5XXxbXFx1MUVEQi1cXHUxRURCXXxbXFx1MUVERC1cXHUxRUREXXxbXFx1MUVERi1cXHUxRURGXXxbXFx1MUVFMS1cXHUxRUUxXXxbXFx1MUVFMy1cXHUxRUUzXXxbXFx1MUVFNS1cXHUxRUU1XXxbXFx1MUVFNy1cXHUxRUU3XXxbXFx1MUVFOS1cXHUxRUU5XXxbXFx1MUVFQi1cXHUxRUVCXXxbXFx1MUVFRC1cXHUxRUVEXXxbXFx1MUVFRi1cXHUxRUVGXXxbXFx1MUVGMS1cXHUxRUYxXXxbXFx1MUVGMy1cXHUxRUYzXXxbXFx1MUVGNS1cXHUxRUY1XXxbXFx1MUVGNy1cXHUxRUY3XXxbXFx1MUVGOS1cXHUxRUY5XXxbXFx1MUYwMC1cXHUxRjA3XXxbXFx1MUYxMC1cXHUxRjE1XXxbXFx1MUYyMC1cXHUxRjI3XXxbXFx1MUYzMC1cXHUxRjM3XXxbXFx1MUY0MC1cXHUxRjQ1XXxbXFx1MUY1MC1cXHUxRjU3XXxbXFx1MUY2MC1cXHUxRjY3XXxbXFx1MUY3MC1cXHUxRjdEXXxbXFx1MUY4MC1cXHUxRjg3XXxbXFx1MUY5MC1cXHUxRjk3XXxbXFx1MUZBMC1cXHUxRkE3XXxbXFx1MUZCMC1cXHUxRkI0XXxbXFx1MUZCNi1cXHUxRkI3XXxbXFx1MUZCRS1cXHUxRkJFXXxbXFx1MUZDMi1cXHUxRkM0XXxbXFx1MUZDNi1cXHUxRkM3XXxbXFx1MUZEMC1cXHUxRkQzXXxbXFx1MUZENi1cXHUxRkQ3XXxbXFx1MUZFMC1cXHUxRkU3XXxbXFx1MUZGMi1cXHUxRkY0XXxbXFx1MUZGNi1cXHUxRkY3XXxbXFx1MjA3Ri1cXHUyMDdGXXxbXFx1MjEwQS1cXHUyMTBBXXxbXFx1MjEwRS1cXHUyMTBGXXxbXFx1MjExMy1cXHUyMTEzXXxbXFx1MjExOC1cXHUyMTE4XXxbXFx1MjEyRS1cXHUyMTJGXXxbXFx1MjEzNC1cXHUyMTM0XXxbXFx1RkIwMC1cXHVGQjA2XXxbXFx1RkIxMy1cXHVGQjE3XXxbXFx1RkY0MS1cXHVGRjVBXXxbXFx1MDFDNS1cXHUwMUM1XXxbXFx1MDFDOC1cXHUwMUM4XXxbXFx1MDFDQi1cXHUwMUNCXXxbXFx1MDFGMi1cXHUwMUYyXXxbXFx1MDJCMC1cXHUwMkI4XXxbXFx1MDJCQi1cXHUwMkMxXXxbXFx1MDJEMC1cXHUwMkQxXXxbXFx1MDJFMC1cXHUwMkU0XXxbXFx1MDM3QS1cXHUwMzdBXXxbXFx1MDU1OS1cXHUwNTU5XXxbXFx1MDY0MC1cXHUwNjQwXXxbXFx1MDZFNS1cXHUwNkU2XXxbXFx1MEU0Ni1cXHUwRTQ2XXxbXFx1MEVDNi1cXHUwRUM2XXxbXFx1MzAwNS1cXHUzMDA1XXxbXFx1MzAzMS1cXHUzMDM1XXxbXFx1MzA5RC1cXHUzMDlFXXxbXFx1MzBGQy1cXHUzMEZFXXxbXFx1RkY3MC1cXHVGRjcwXXxbXFx1RkY5RS1cXHVGRjlGXXxbXFx1MDFBQS1cXHUwMUFBXXxbXFx1MDFCQi1cXHUwMUJCXXxbXFx1MDFCRS1cXHUwMUMzXXxbXFx1MDNGMy1cXHUwM0YzXXxbXFx1MDRDMC1cXHUwNEMwXXxbXFx1MDVEMC1cXHUwNUVBXXxbXFx1MDVGMC1cXHUwNUYyXXxbXFx1MDYyMS1cXHUwNjNBXXxbXFx1MDY0MS1cXHUwNjRBXXxbXFx1MDY3MS1cXHUwNkI3XXxbXFx1MDZCQS1cXHUwNkJFXXxbXFx1MDZDMC1cXHUwNkNFXXxbXFx1MDZEMC1cXHUwNkQzXXxbXFx1MDZENS1cXHUwNkQ1XXxbXFx1MDkwNS1cXHUwOTM5XXxbXFx1MDkzRC1cXHUwOTNEXXxbXFx1MDk1MC1cXHUwOTUwXXxbXFx1MDk1OC1cXHUwOTYxXXxbXFx1MDk4NS1cXHUwOThDXXxbXFx1MDk4Ri1cXHUwOTkwXXxbXFx1MDk5My1cXHUwOUE4XXxbXFx1MDlBQS1cXHUwOUIwXXxbXFx1MDlCMi1cXHUwOUIyXXxbXFx1MDlCNi1cXHUwOUI5XXxbXFx1MDlEQy1cXHUwOUREXXxbXFx1MDlERi1cXHUwOUUxXXxbXFx1MDlGMC1cXHUwOUYxXXxbXFx1MEEwNS1cXHUwQTBBXXxbXFx1MEEwRi1cXHUwQTEwXXxbXFx1MEExMy1cXHUwQTI4XXxbXFx1MEEyQS1cXHUwQTMwXXxbXFx1MEEzMi1cXHUwQTMzXXxbXFx1MEEzNS1cXHUwQTM2XXxbXFx1MEEzOC1cXHUwQTM5XXxbXFx1MEE1OS1cXHUwQTVDXXxbXFx1MEE1RS1cXHUwQTVFXXxbXFx1MEE3Mi1cXHUwQTc0XXxbXFx1MEE4NS1cXHUwQThCXXxbXFx1MEE4RC1cXHUwQThEXXxbXFx1MEE4Ri1cXHUwQTkxXXxbXFx1MEE5My1cXHUwQUE4XXxbXFx1MEFBQS1cXHUwQUIwXXxbXFx1MEFCMi1cXHUwQUIzXXxbXFx1MEFCNS1cXHUwQUI5XXxbXFx1MEFCRC1cXHUwQUJEXXxbXFx1MEFEMC1cXHUwQUQwXXxbXFx1MEFFMC1cXHUwQUUwXXxbXFx1MEIwNS1cXHUwQjBDXXxbXFx1MEIwRi1cXHUwQjEwXXxbXFx1MEIxMy1cXHUwQjI4XXxbXFx1MEIyQS1cXHUwQjMwXXxbXFx1MEIzMi1cXHUwQjMzXXxbXFx1MEIzNi1cXHUwQjM5XXxbXFx1MEIzRC1cXHUwQjNEXXxbXFx1MEI1Qy1cXHUwQjVEXXxbXFx1MEI1Ri1cXHUwQjYxXXxbXFx1MEI4NS1cXHUwQjhBXXxbXFx1MEI4RS1cXHUwQjkwXXxbXFx1MEI5Mi1cXHUwQjk1XXxbXFx1MEI5OS1cXHUwQjlBXXxbXFx1MEI5Qy1cXHUwQjlDXXxbXFx1MEI5RS1cXHUwQjlGXXxbXFx1MEJBMy1cXHUwQkE0XXxbXFx1MEJBOC1cXHUwQkFBXXxbXFx1MEJBRS1cXHUwQkI1XXxbXFx1MEJCNy1cXHUwQkI5XXxbXFx1MEMwNS1cXHUwQzBDXXxbXFx1MEMwRS1cXHUwQzEwXXxbXFx1MEMxMi1cXHUwQzI4XXxbXFx1MEMyQS1cXHUwQzMzXXxbXFx1MEMzNS1cXHUwQzM5XXxbXFx1MEM2MC1cXHUwQzYxXXxbXFx1MEM4NS1cXHUwQzhDXXxbXFx1MEM4RS1cXHUwQzkwXXxbXFx1MEM5Mi1cXHUwQ0E4XXxbXFx1MENBQS1cXHUwQ0IzXXxbXFx1MENCNS1cXHUwQ0I5XXxbXFx1MENERS1cXHUwQ0RFXXxbXFx1MENFMC1cXHUwQ0UxXXxbXFx1MEQwNS1cXHUwRDBDXXxbXFx1MEQwRS1cXHUwRDEwXXxbXFx1MEQxMi1cXHUwRDI4XXxbXFx1MEQyQS1cXHUwRDM5XXxbXFx1MEQ2MC1cXHUwRDYxXXxbXFx1MEUwMS1cXHUwRTMwXXxbXFx1MEUzMi1cXHUwRTMzXXxbXFx1MEU0MC1cXHUwRTQ1XXxbXFx1MEU4MS1cXHUwRTgyXXxbXFx1MEU4NC1cXHUwRTg0XXxbXFx1MEU4Ny1cXHUwRTg4XXxbXFx1MEU4QS1cXHUwRThBXXxbXFx1MEU4RC1cXHUwRThEXXxbXFx1MEU5NC1cXHUwRTk3XXxbXFx1MEU5OS1cXHUwRTlGXXxbXFx1MEVBMS1cXHUwRUEzXXxbXFx1MEVBNS1cXHUwRUE1XXxbXFx1MEVBNy1cXHUwRUE3XXxbXFx1MEVBQS1cXHUwRUFCXXxbXFx1MEVBRC1cXHUwRUIwXXxbXFx1MEVCMi1cXHUwRUIzXXxbXFx1MEVCRC1cXHUwRUJEXXxbXFx1MEVDMC1cXHUwRUM0XXxbXFx1MEVEQy1cXHUwRUREXXxbXFx1MEYwMC1cXHUwRjAwXXxbXFx1MEY0MC1cXHUwRjQ3XXxbXFx1MEY0OS1cXHUwRjY5XXxbXFx1MEY4OC1cXHUwRjhCXXxbXFx1MTEwMC1cXHUxMTU5XXxbXFx1MTE1Ri1cXHUxMUEyXXxbXFx1MTFBOC1cXHUxMUY5XXxbXFx1MjEzNS1cXHUyMTM4XXxbXFx1MzAwNi1cXHUzMDA2XXxbXFx1MzA0MS1cXHUzMDk0XXxbXFx1MzBBMS1cXHUzMEZBXXxbXFx1MzEwNS1cXHUzMTJDXXxbXFx1MzEzMS1cXHUzMThFXXxbXFx1NEUwMC1cXHU5RkE1XXxbXFx1QUMwMC1cXHVEN0EzXXxbXFx1RjkwMC1cXHVGQTJEXXxbXFx1RkIxRi1cXHVGQjI4XXxbXFx1RkIyQS1cXHVGQjM2XXxbXFx1RkIzOC1cXHVGQjNDXXxbXFx1RkIzRS1cXHVGQjNFXXxbXFx1RkI0MC1cXHVGQjQxXXxbXFx1RkI0My1cXHVGQjQ0XXxbXFx1RkI0Ni1cXHVGQkIxXXxbXFx1RkJEMy1cXHVGRDNEXXxbXFx1RkQ1MC1cXHVGRDhGXXxbXFx1RkQ5Mi1cXHVGREM3XXxbXFx1RkRGMC1cXHVGREZCXXxbXFx1RkU3MC1cXHVGRTcyXXxbXFx1RkU3NC1cXHVGRTc0XXxbXFx1RkU3Ni1cXHVGRUZDXXxbXFx1RkY2Ni1cXHVGRjZGXXxbXFx1RkY3MS1cXHVGRjlEXXxbXFx1RkZBMC1cXHVGRkJFXXxbXFx1RkZDMi1cXHVGRkM3XXxbXFx1RkZDQS1cXHVGRkNGXXxbXFx1RkZEMi1cXHVGRkQ3XXxbXFx1RkZEQS1cXHVGRkRDXS8sXG4gIEx0bW86IC9bXFx1MDFDNS1cXHUwMUM1XXxbXFx1MDFDOC1cXHUwMUM4XXxbXFx1MDFDQi1cXHUwMUNCXXxbXFx1MDFGMi1cXHUwMUYyXVtcXHUwMkIwLVxcdTAyQjhdfFtcXHUwMkJCLVxcdTAyQzFdfFtcXHUwMkQwLVxcdTAyRDFdfFtcXHUwMkUwLVxcdTAyRTRdfFtcXHUwMzdBLVxcdTAzN0FdfFtcXHUwNTU5LVxcdTA1NTldfFtcXHUwNjQwLVxcdTA2NDBdfFtcXHUwNkU1LVxcdTA2RTZdfFtcXHUwRTQ2LVxcdTBFNDZdfFtcXHUwRUM2LVxcdTBFQzZdfFtcXHUzMDA1LVxcdTMwMDVdfFtcXHUzMDMxLVxcdTMwMzVdfFtcXHUzMDlELVxcdTMwOUVdfFtcXHUzMEZDLVxcdTMwRkVdfFtcXHVGRjcwLVxcdUZGNzBdfFtcXHVGRjlFLVxcdUZGOUZdW1xcdTAxQUEtXFx1MDFBQV18W1xcdTAxQkItXFx1MDFCQl18W1xcdTAxQkUtXFx1MDFDM118W1xcdTAzRjMtXFx1MDNGM118W1xcdTA0QzAtXFx1MDRDMF18W1xcdTA1RDAtXFx1MDVFQV18W1xcdTA1RjAtXFx1MDVGMl18W1xcdTA2MjEtXFx1MDYzQV18W1xcdTA2NDEtXFx1MDY0QV18W1xcdTA2NzEtXFx1MDZCN118W1xcdTA2QkEtXFx1MDZCRV18W1xcdTA2QzAtXFx1MDZDRV18W1xcdTA2RDAtXFx1MDZEM118W1xcdTA2RDUtXFx1MDZENV18W1xcdTA5MDUtXFx1MDkzOV18W1xcdTA5M0QtXFx1MDkzRF18W1xcdTA5NTAtXFx1MDk1MF18W1xcdTA5NTgtXFx1MDk2MV18W1xcdTA5ODUtXFx1MDk4Q118W1xcdTA5OEYtXFx1MDk5MF18W1xcdTA5OTMtXFx1MDlBOF18W1xcdTA5QUEtXFx1MDlCMF18W1xcdTA5QjItXFx1MDlCMl18W1xcdTA5QjYtXFx1MDlCOV18W1xcdTA5REMtXFx1MDlERF18W1xcdTA5REYtXFx1MDlFMV18W1xcdTA5RjAtXFx1MDlGMV18W1xcdTBBMDUtXFx1MEEwQV18W1xcdTBBMEYtXFx1MEExMF18W1xcdTBBMTMtXFx1MEEyOF18W1xcdTBBMkEtXFx1MEEzMF18W1xcdTBBMzItXFx1MEEzM118W1xcdTBBMzUtXFx1MEEzNl18W1xcdTBBMzgtXFx1MEEzOV18W1xcdTBBNTktXFx1MEE1Q118W1xcdTBBNUUtXFx1MEE1RV18W1xcdTBBNzItXFx1MEE3NF18W1xcdTBBODUtXFx1MEE4Ql18W1xcdTBBOEQtXFx1MEE4RF18W1xcdTBBOEYtXFx1MEE5MV18W1xcdTBBOTMtXFx1MEFBOF18W1xcdTBBQUEtXFx1MEFCMF18W1xcdTBBQjItXFx1MEFCM118W1xcdTBBQjUtXFx1MEFCOV18W1xcdTBBQkQtXFx1MEFCRF18W1xcdTBBRDAtXFx1MEFEMF18W1xcdTBBRTAtXFx1MEFFMF18W1xcdTBCMDUtXFx1MEIwQ118W1xcdTBCMEYtXFx1MEIxMF18W1xcdTBCMTMtXFx1MEIyOF18W1xcdTBCMkEtXFx1MEIzMF18W1xcdTBCMzItXFx1MEIzM118W1xcdTBCMzYtXFx1MEIzOV18W1xcdTBCM0QtXFx1MEIzRF18W1xcdTBCNUMtXFx1MEI1RF18W1xcdTBCNUYtXFx1MEI2MV18W1xcdTBCODUtXFx1MEI4QV18W1xcdTBCOEUtXFx1MEI5MF18W1xcdTBCOTItXFx1MEI5NV18W1xcdTBCOTktXFx1MEI5QV18W1xcdTBCOUMtXFx1MEI5Q118W1xcdTBCOUUtXFx1MEI5Rl18W1xcdTBCQTMtXFx1MEJBNF18W1xcdTBCQTgtXFx1MEJBQV18W1xcdTBCQUUtXFx1MEJCNV18W1xcdTBCQjctXFx1MEJCOV18W1xcdTBDMDUtXFx1MEMwQ118W1xcdTBDMEUtXFx1MEMxMF18W1xcdTBDMTItXFx1MEMyOF18W1xcdTBDMkEtXFx1MEMzM118W1xcdTBDMzUtXFx1MEMzOV18W1xcdTBDNjAtXFx1MEM2MV18W1xcdTBDODUtXFx1MEM4Q118W1xcdTBDOEUtXFx1MEM5MF18W1xcdTBDOTItXFx1MENBOF18W1xcdTBDQUEtXFx1MENCM118W1xcdTBDQjUtXFx1MENCOV18W1xcdTBDREUtXFx1MENERV18W1xcdTBDRTAtXFx1MENFMV18W1xcdTBEMDUtXFx1MEQwQ118W1xcdTBEMEUtXFx1MEQxMF18W1xcdTBEMTItXFx1MEQyOF18W1xcdTBEMkEtXFx1MEQzOV18W1xcdTBENjAtXFx1MEQ2MV18W1xcdTBFMDEtXFx1MEUzMF18W1xcdTBFMzItXFx1MEUzM118W1xcdTBFNDAtXFx1MEU0NV18W1xcdTBFODEtXFx1MEU4Ml18W1xcdTBFODQtXFx1MEU4NF18W1xcdTBFODctXFx1MEU4OF18W1xcdTBFOEEtXFx1MEU4QV18W1xcdTBFOEQtXFx1MEU4RF18W1xcdTBFOTQtXFx1MEU5N118W1xcdTBFOTktXFx1MEU5Rl18W1xcdTBFQTEtXFx1MEVBM118W1xcdTBFQTUtXFx1MEVBNV18W1xcdTBFQTctXFx1MEVBN118W1xcdTBFQUEtXFx1MEVBQl18W1xcdTBFQUQtXFx1MEVCMF18W1xcdTBFQjItXFx1MEVCM118W1xcdTBFQkQtXFx1MEVCRF18W1xcdTBFQzAtXFx1MEVDNF18W1xcdTBFREMtXFx1MEVERF18W1xcdTBGMDAtXFx1MEYwMF18W1xcdTBGNDAtXFx1MEY0N118W1xcdTBGNDktXFx1MEY2OV18W1xcdTBGODgtXFx1MEY4Ql18W1xcdTExMDAtXFx1MTE1OV18W1xcdTExNUYtXFx1MTFBMl18W1xcdTExQTgtXFx1MTFGOV18W1xcdTIxMzUtXFx1MjEzOF18W1xcdTMwMDYtXFx1MzAwNl18W1xcdTMwNDEtXFx1MzA5NF18W1xcdTMwQTEtXFx1MzBGQV18W1xcdTMxMDUtXFx1MzEyQ118W1xcdTMxMzEtXFx1MzE4RV18W1xcdTRFMDAtXFx1OUZBNV18W1xcdUFDMDAtXFx1RDdBM118W1xcdUY5MDAtXFx1RkEyRF18W1xcdUZCMUYtXFx1RkIyOF18W1xcdUZCMkEtXFx1RkIzNl18W1xcdUZCMzgtXFx1RkIzQ118W1xcdUZCM0UtXFx1RkIzRV18W1xcdUZCNDAtXFx1RkI0MV18W1xcdUZCNDMtXFx1RkI0NF18W1xcdUZCNDYtXFx1RkJCMV18W1xcdUZCRDMtXFx1RkQzRF18W1xcdUZENTAtXFx1RkQ4Rl18W1xcdUZEOTItXFx1RkRDN118W1xcdUZERjAtXFx1RkRGQl18W1xcdUZFNzAtXFx1RkU3Ml18W1xcdUZFNzQtXFx1RkU3NF18W1xcdUZFNzYtXFx1RkVGQ118W1xcdUZGNjYtXFx1RkY2Rl18W1xcdUZGNzEtXFx1RkY5RF18W1xcdUZGQTAtXFx1RkZCRV18W1xcdUZGQzItXFx1RkZDN118W1xcdUZGQ0EtXFx1RkZDRl18W1xcdUZGRDItXFx1RkZEN118W1xcdUZGREEtXFx1RkZEQ10vXG59O1xuIl19
