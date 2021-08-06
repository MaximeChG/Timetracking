$(document).ready(function() {
    $('#project-name-index').on('change', function() {
        // get the value of the selected item
        var project_id = $(this).val();
            // check if it is not 0
        if (project_id != 0) {
            $.ajax({
                // What type of values are sent
                type: 'POST',
                // URL of sent values.
                url: '/fillTask',
                //Data to send
                data: { project_id: project_id },
                // Choose what happens when the call succeeds
                success: function(response) {
            
                    var $select = $('#task-name-index');
                    // Empty the select box to remove previous options
                    $select.empty();
                    // add the default option back in
                    $select.append("<option value=\"0\" selected>Choose Task</option>");
                    // add the options returned from the php file.
                    $.each(response, function(key, value) {
                        var stringValue = JSON.stringify(value.task_name);
                        $select.append("<option value=" + JSON.stringify(value.task_id)  + ">" + JSON.parse(stringValue) +"</option>");
                    });

                    // enable the input field
                    $select.prop("disabled", false);
                },
                error: function(response) {
                    console.log(response);
                }
            });


        } else {
            // empty the select box and add the default option
            $('#task-name-index').empty();
            $('#task-name-index').append("<option value=\"0\" selected>Choose Task</option>");
            // disable the field
            $('#task-name-index').prop("disabled", true);
        }

    });
});
