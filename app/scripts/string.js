var Strings = {
    hasValue: function (input) {
        return !(input == null || input == undefined || input === "");
    },
    RemoverAcentos: function (palavra) {
        var com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ';
        var sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
        var palavraSemAcento = '';

        if (!palavra || palavra.length < 1) { return palavra; }

        for (var i = 0, len = palavra.length; i < len; i++) {
            var indexOf = -1;
            try {
                indexOf = com_acento.search(palavra[i]);
            } catch (e) {
                console.log("Erro em remover acentuação o char: \"" + palavra[i] + "\".");
            }
            if (indexOf >= 0) {
                palavraSemAcento += sem_acento[indexOf];
            } else {
                palavraSemAcento += palavra[i];
            }
        }
        return palavraSemAcento;
    },
    Equals: function (a, b, testCase, compareAccents) {
        var isEqual = false;

        if (testCase === false) {
            a = a ? a.toLowerCase() : a;
            b = b ? b.toLowerCase() : b;
        }
        if (compareAccents === false) {
            a = Strings.RemoverAcentos(a);
            b = Strings.RemoverAcentos(b);
        }
        isEqual = (a == b);

        return isEqual;
    },
    isNumber: function (number) {
        var resp = false;
        var aux = number + "";
        var regex = /^[0-9]+$/;

        if (aux.match(regex)) { resp = true; }

        return resp;
    },
    formatNumber: function (number) {
        if (!Strings.hasValue(number) || !Strings.isNumber(number)) { return ""; }


        if (typeof number === "string") { number = parseInt(number); }

        return number.toLocaleString().replace(',', '.')
    },
    padNumber: function (number, minSize) {
        if (number.toString().length >= minSize) { return number };

        return (Math.pow(10, minSize) + Math.floor(number)).toString().substring(1);
    }

};

String.prototype.trim = function () {
    return $.trim(this);
};

String.prototype.leftTrim = function () { return this.replace(/^\s+/, ''); };

String.prototype.rightTrim = function () { return this.replace(/\s+$/, ''); };

String.prototype.contains = function (input) {
    var resp = false;

    if (this) {
        var thisStr = this.toString().toLowerCase();

        input = input.toLowerCase();
        resp = !!~thisStr.indexOf(input);
    }

    return resp;
};

String.prototype.equals = function (word, testCase, compareAccents) {
    var isEqual = false;
    var a = this;

    if (this) {
        if (testCase === false) {
            a = a ? a.toLowerCase() : word;
            word = word ? word.toLowerCase() : word;
        }
        if (compareAccents === false) {
            a = Strings.RemoverAcentos(a);
            word = Strings.RemoverAcentos(word);
        }
    }
    isEqual = (a == word);

    return isEqual;
};
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
    });
};

