var app = app || {};

app.importCSV = app.importCSV || function() {

	$('#csvInput').parse({

		config: { },
		before: function(file, inputElem) { },
		error: function(err, file, inputElem) { console.log(err); },
		complete: function(results, file, inputElem, event) {
			var data = results.results,
				table = $('#results'),
				header = $('#results thead tr'),
				body = $('#results tbody'),
				numFields = data.fields.length,
				numRows = data.rows.length;

			console.log(data);

			for (var i = 0; i < numFields; i++) {
				var FieldName = data.fields[i];

				// Add a heading for the field
				$(header).append('<th>' + FieldName + '</th>');
			}

			for (var j = 0; j < numRows; j++) {
				var RowContents = data.rows[j],
					profileData = data.fields,
					Row = document.createElement('tr');

				for (RowProperty in RowContents) {
					$(Row).append('<td>' + RowContents[RowProperty] + '</td>');
				}

				$(body).append(Row);
			}

		}

	});
};