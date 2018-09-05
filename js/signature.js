let $body = $('body');
$('.vo-signature, .sign-box').each(function(index, el) {
  let $el = $(el);
  // console.dir($el);
  // let $inputSignature = $(el).find('#input-signature');

  let signatureModalId = "modal-signature-" + index;
  /* let html = "<div id=\"signature-pad\" style='width:480px;height:120px;border:5px solid #00f;margin:auto;'>"
           + (( $inputSignature.val() ) ? "<img id=\"img-signature\" src='" + $inputSignature.val() + "' style=\"width:100%;height:100%\"/>" : "<img id=\"img-signature\"  style=\"width:100%;height:100%\">")
           + "</div>"; */
  /* let html = "<div id=\"signature-pad\" style='width:480px;height:120px;border:5px solid #00f;margin:auto;'>"
           + "<img id=\"img-signature\"  style=\"width:100%;height:100%\">")
           + "</div>"; */

  let htmlModal = "<div id=\"" + signatureModalId + "\" style=\"position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,0.8);z-index:1040;\">"
                + "<div class=\"modal-container\">"
                + "<div class=\"m-signature-pad--body\">"
                + "<div style=\"font-weight:bold;\">Signature</div>"
                + "<canvas></canvas>"
                + "</div>"
                + "<div class=\"m-signature-pad--btn-group\">"
                + "<button type='button' data-cancel>Cancel</button>&nbsp;&nbsp;"
                + "<button type='button' data-clear>Clear</button>&nbsp;&nbsp;"
                + "<button type='button' data-save>Save</button>"
                + "</div>"
                + "</div>"
                + "</div>";
  //alert(htmlModal);
  //$(el).append(html);
  $body.append(htmlModal);

  //let $divSignature = $(el).find('#signature-pad');
  let $modal = $body.find("#modal-signature-" + index);
  $modal.hide();

  $(el).on('click', function(e){
    e.preventDefault();
    $modal.show();
  });

  // init signature pad
  let canvas = $modal.find('canvas').get(0);

  let ratio =  Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = 480 * ratio;
  canvas.height = 120 * ratio;
  canvas.getContext("2d").scale(ratio, ratio);

  //resizeCanvas(canvas);
  let signaturePad = new SignaturePad(canvas);

  // bind btn click
  let $btnCancel = $modal.find('button[data-cancel]');
  let $btnClear  = $modal.find('button[data-clear]');
  let $btnSave   = $modal.find('button[data-save]');

  $btnCancel.on('click', function(){
    $modal.hide();
  });

  $btnClear.on('click', function() {
    signaturePad.clear();
  });

  $btnSave.on('click', function() {
    let dataUrl = signaturePad.toDataURL();
    $el.css('background-image', "url('" + dataUrl + "')");
    $modal.hide();
  });
});
