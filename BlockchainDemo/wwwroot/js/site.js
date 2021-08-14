function ObterHash(dado) {
    $.ajax({
        method: "GET",
        url: "/home/ObterHash",
        data: { texto: dado }
    })
    .done(function (result) {
        $("#hash").val(result);
    });
}


function MinerarBloco(idForm) {
    var blockIndex = $('#BlockIndex').val();
    var nonce = $('#Nonce').val();
    var data = $('#Data').val();
    $.ajax({
        method: "GET",
        url: "/home/Minerar",
        data: { BlockIndex: blockIndex, Nonce: nonce, Data: data }
    })
    .done(function (result) {
        $("#Hash").val(result.hash);
        $("#Nonce").val(result.nonce);
        ValidarHash(idForm);
    });
}


function ObterBlockchain() {
    $.ajax({
        method: "GET",
        url: "/home/ObterBlockChain",
        data: {}
    })
    .done(function (result) {
        MontarBlockchain(result);
    });
}


function AdicionarBloco() {
    $.ajax({
        method: "GET",
        url: "/home/AdicionarBloco",
        data: { }
    })
    .done(function (result) {
        MontarBlockchain(result);
    });
}


function InvalidarBlockchain(idForm) {
    var form = $(idForm);
    var formId = form.attr("id");
    var id = formId.replace("formulario", "");
    var blockIndex, nonce, data;
    form.each(function () {
        data = $("#Data"+id).val();
        blockIndex = $("#BlockIndex"+id).val();
        nonce = $("#Nonce"+id).val();
    });
    $.ajax({
        method: "GET",
        url: "/home/InvalidarBlockchain",
        data: { BlockIndex: blockIndex, Nonce: nonce, Data: data, idList: id }
    })
    .done(function (result) {
        MontarBlockchain(result);
    });
}


function RemoverUltimoBlockChain() {
    $.ajax({
        method: "GET",
        url: "/home/RemoverUltimoBlockChain",
        data: { }
    })
    .done(function (result) {
        MontarBlockchain(result);
    });
}


function MinerarBlockchain(idForm) {
    var form = $(idForm);
    var formId = form.attr("id");
    var id = formId.replace("formulario", "");
    var blockIndex, nonce, data;
    form.each(function () {
        data = $("#Data" + id).val();
        blockIndex = $("#BlockIndex" + id).val();
        nonce = $("#Nonce" + id).val();
    });
    $.ajax({
        method: "GET",
        url: "/home/MinerarBlockchain",
        data: { BlockIndex: blockIndex, Nonce: nonce, Data: data, idList: id }
    })
    .done(function (result) {
        MontarBlockchain(result);
    });
}



function InvalidarHash(objeto) {
    $(objeto).css("background-color", "#ECD0AF");
}


function ValidarHash(objeto) {
    $(objeto).css("background-color", "#D1F3B0");
}


function MontarBlockchain(data) {
    $("#Blockchain").html("");
    var formatHtml = "";
    var template = "";
    var ind = 0;
    while (ind < data.length) {
        template = '<div class="row" style="padding:10px;">';
        template += TemplateBlockchain(ind, data[ind]);
        if ((ind + 1) < data.length) {
            ind = ind + 1;
            template += TemplateBlockchain(ind, data[ind]);
        }
        ind += 1;
        template += '</div>';
        formatHtml += template;
    }
    $("#Blockchain").html(formatHtml);
}


function TemplateBlockchain(indice, dado) {
    var template = "";
    var formulario = "formulario" + indice;
    var formularioId = "'#formulario" + indice + "'";
    var estilo = "";
    if (dado.isValid) 
        estilo = "background-color:#D1F3B0;padding:10px;border-radius:5px;";
    else
        estilo = "background-color:#ECD0AF;padding:10px;border-radius:5px;";
    template += '<div class="col-md-6">';
    template += '  <form class="form-horizontal" id="' + formulario + '" style="' + estilo + '">';
    template += '    <div class="form-group">';
    template += '      <label class="control-label"><b>Bloco</b></label>';
    template += '      <div class="input-group">';
    template += '        <div class="input-group-prepend">';
    template += '          <span class="input-group-text">#</span>';
    template += '        </div>';
    template += '        <input value="' + dado.blockIndex + '" class="form-control" id="BlockIndex' + indice + '" type="number" onchange="InvalidarBlockchain(' + formularioId + ')" />';
    template += '      </div>';
    template += '	 </div>';
    template += '    <div class="form-group">';
    template += '      <label class="control-label"><b>Nonce</b></label>';
    template += '      <input value="' + dado.nonce + '" class="form-control" id="Nonce' + indice + '" type="number" onchange="InvalidarBlockchain(' + formularioId + ')" />';
    template += '	 </div >';
    template += '    <div class="form-group">';
    template += '      <label class="control-label"><b>Dados</b></label>';
    template += '      <textarea class="form-control" id="Data' + indice + '" rows = "3" onchange="InvalidarBlockchain(' + formularioId + ')">' + dado.data + '</textarea >';
    template += '	 </div>';
    template += '    <div class="form-group">';
    template += '      <label class="control-label" for="PreviousHash"><b>Prévio</b></label>';
    template += '        <input value="' + dado.previousHash + '" class="form-control" id="PreviousHash' + indice + '" type="text" disabled />';
    template += '	 </div>';
    template += '    <div class="form-group">';
    template += '      <label class="control-label"><b>Hash</b></label>';
    template += '      <input value="' + dado.hash + '" class="form-control" id="Hash' + indice + '" type="text" disabled />';
    template += '	 </div>';
    template += '    <div class="form-group">';
    template += '      <button type="button" class="btn btn-info" onclick="MinerarBlockchain(' + formularioId + ')">Minerar</button>';
    template += '	 </div>';
    template += '  </form>';
    template += '</div>';
    return template;
}
          
