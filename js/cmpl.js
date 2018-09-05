'use strict';

/**
 * CMPL
 */
let $cmpl = (function($, window, document, undefined) {
  'use strict';

  /***************
   * Bootstrap 4 *
   ***************/

  let _bs4_handleFormErrors = ($xhr, $form) => {
    let errors = $xhr.responseJSON;
    let selector = ':input:not([type=button]):not([type=hidden]):not([type=submit]):not([type=reset])';
    $form.find(selector).each((index, value) => {
      let $elem = $(value);
      let name = $elem.attr('name');
      if (errors.hasOwnProperty(name)) {
        $elem.addClass('is-invalid');
        $('#input-' + name + '-error').html('(' + errors[name] + ')');
        $elem.siblings('label').addClass('text-danger');
      } else {
        $elem.removeClass('is-invalid');
        $('#input-' + name + '-error').empty();
        $elem.siblings('label').removeClass('text-danger');
      }
    });
    $form.find('.is-invalid:first').focus();
  };

  /**************
   * DataTables *
   **************/

  let _dataTables_opts = {
    language: {
      search: 'Filter:',
    },
    filter: false,
    scrollX: true,
    scrollY: '100vh',
    scrollCollapse: true,
    scroller: true,
    paging: true,
    select: {
      style: 'single',
      info: false,
    }
  };

  /************
   * DateTime *
   ************/

  let _datetime_format = (date, fromFormat, toFormat, defaultValue) => {
    if ( arguments.length === 3 ) {
      defaultValue = null;
    }
    if (date === null || date === undefined || date.trim() === '') {
      return defaultValue;
    }
    let dt = moment(date, fromFormat, true); // Parse in strict mode
    return dt.isValid() ? dt.format(toFormat) : defaultValue;
  };

  /**********
   * jQuery *
   **********/

  /**
   * jQuery plugin to autogrow textareas within the jQuery selector it is being used on.
   *
   * Credit goes to: http://stackoverflow.com/a/25621277 (option 3)
   *
   * If you need to populate / update the textarea content via JavaScript, fire the function by calling:
   *
   *   $('textarea').trigger('input');
   *
   * Example usage:
   *
   *   $('#target-form').autogrow();
   *   $('#target-div').autogrow();
   */
  $.fn.autogrow = function() {
    this.find('textarea').each(function () {
      this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    }).on('input', function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
    return this;
  };

  /********
   * HTML *
   ********/

  let _html_multiline = (value) => {
    return (value === null || value === undefined) ? value : value.replace(/\n/g, '<br>');
  };

  return {
    bs4: {
      handleFormErrors: _bs4_handleFormErrors
    },
    dataTables: {
      opts: () => $.extend(true, {}, _dataTables_opts)
    },
    datetime: {
      format: _datetime_format,
    },
    html: {
      multiline: _html_multiline,
    }
  };
})(jQuery, window, document);

/**
 * DataTables
 */
(function($, window, document, undefined) {
  'use strict';
  $.fn.dataTable.render.moment = (from, to, defaultValue) => {
    return (data, type, row) => {
      return (type === 'display' || type === 'filter')
        ? $cmpl.datetime.format(data, from, to, defaultValue) : data;
    };
  };
  /* $.fn.dataTable.render.multiline = (escapeHTML) => {
    return (data, type, row) => {
      if (data === null || data === undefined) {
        return data; // return as-is
      }
      return (type === 'display' || type === 'filter')
        ? (escapeHTML ? $cmpl.html.multiline(_.escape(data)) : $cmpl.html.multiline(data))
        : data;
    };
  }; */
})(jQuery, window, document);

/**
 * Handlebars
 */
Handlebars.registerHelper ('defaultValue', function(value, defaultValue, options) {
  return (value === null || value === undefined || value.trim() === '' ) ? defaultValue : value;
});

Handlebars.registerHelper ('formatDate', function(value, fromFormat, toFormat, defaultValue, options) {
  return $cmpl.datetime.format(value, fromFormat, toFormat, defaultValue);
});
