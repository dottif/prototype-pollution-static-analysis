#codeql database create --language=javascript --source-root <codebase_dir> <db_dir> --overwrite
dir="$HOME/codeql/results/${1}/"

if [ ! -d "$dir" ]
then
    mkdir $dir
fi

codeql database analyze \
    --format="csv" \
    --output="$dir/pp.csv" \
    $HOME/codeql/databases/$1 \
    $HOME/codeql-repo/javascript/ql/src/Security/CWE-915/PrototypePollutingFunction.ql \
    $HOME/codeql-repo/javascript/ql/src/Security/CWE-915/PrototypePollutingAssignment.ql \
    $HOME/codeql-repo/javascript/ql/src/Security/CWE-915/PrototypePollutingMergeCall.ql
