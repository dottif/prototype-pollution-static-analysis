# Detecting prototype pollution vulnerabilities in JavaScript using static analysis
This study focuses on prototype pollution vulnerability, a "new" type of security
vulnerability, first discovered in 2018, that has not been studied in depth. The
vulnerability exploits the prototype oriented design of JavaScript. By modifying
the prototype of native objects such as Object, from which most other objects 
inherit properties and methods, it’s possible, depending on the logic of the specific
application, to escalate to almost any other web vulnerability.

We collected JavaScript code containing real word prototype pollution vulnerability 
examples searching on vulnerability databases such as GitHub Advisory and
other sources. To be sure that the collected examples are actually vulnerable we
wrote a simple proof of concept exploit for each vulnerable function. We ran the
static analysis tools considered against the vulnerable applications. Among the
vulnerability dataset we picked some case studies which we analyzed in detail to
explain different code patterns that lead to the vulnerability. These case studies
were chosen to show interesting results which allowed us to highlight the strengths
and limitations of each tool.

## Static Analysis Tools considered

### [ODGen](https://github.com/Song-Li/ODGen) and [ObjLupAnsys](https://github.com/Song-Li/ObjLupAnsys)
ODGen/ObjLupAnsys new approach, based on Object Dependence Graph
which succesfully model object lookups based on prototype chain, can detect
almost all vulnerability cases. The current experimental implementation,
however, is affected by bugs when it encounters some code patterns. It also
suffers from serious performance issues when analyzing large packages or
certain patterns. Also, it is very prone to flag false positives when executed
against patched version of precedently vulnerable functions.

### [Semgrep](https://semgrep.dev/)
Semgrep rules do not cover all cases such as direct assignments, due to the
diﬀiculty of including this case without having a very high false positive rate.
The semgrep engine offers only limited intraprocedural dataflow analysis,
and as expected can’t always detect vulnerability that are distributed across
different functions (e.g. indirect recursive calls). The rules flag many false
positives when executed against patched version of precedently vulnerable
functions, as most mitigation techniques are not even considered.

### [CodeQL](https://codeql.github.com/)
CodeQL can identify almost all vulnerability examples collected. The queries
considered seem to be well written, the problems encountered are most likely
limitation of the closed source engine. For what concerns false postives,
most mitigation techniques are considered, thus CodeQL queries performs
significantly better than other tools.

---

More details in the [thesis pdf](./thesis.pdf)
