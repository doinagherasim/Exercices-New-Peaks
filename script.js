function addNewRow(firstName, lastName, email, value) {
    const tbody = document.getElementById('tableResult');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${email}</td>
      <td id="valueNumber" data-value="${value}">${value}</td>
    `;
    tbody.appendChild(row);
  }

document.getElementById('dataForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const value = document.getElementById('value').value;

  if (firstName && lastName && email && value > 0) {

    addNewRow(firstName, lastName, email, value);
    document.getElementById('dataForm').reset();
    document.getElementById('error-message').style.display = 'none';

  } else if (value && value <= 0 ) {

    document.getElementById('error-message').style.display = 'none';
    document.getElementById('error-message-value').style.display = 'block';

  } else {

    document.getElementById('error-message-value').style.display = 'none';
    document.getElementById('error-message').style.display = 'block';
  }
});

document.getElementById('firstName').addEventListener('input', function() {

    if (this.value) {
      document.getElementById('lastName').value = '';
      document.getElementById('email').value = '';
      document.getElementById('value').value = '';
    }
});

function sortTable() {
    const tbody = document.getElementById('tableResult');
    const rows = Array.from(tbody.rows);

    rows.sort((rowA, rowB) => {
        const valueA = parseFloat(rowA.cells[3].textContent);
        const valueB = parseFloat(rowB.cells[3].textContent);
        return valueA - valueB;
    });

    rows.forEach(row => tbody.appendChild(row));
}

document.getElementById('sortTable').addEventListener('click', sortTable);

document.getElementById('calculateAverage').addEventListener('click', function() {
    const valuesArray = Array.from(document.querySelectorAll('td[data-value]'))
                             .map(cell => parseFloat(cell.getAttribute('data-value')));
    const tbody = document.getElementById('processResult');
    const row = document.createElement('tr');

    if (valuesArray.length > 0) {
        const total = valuesArray.reduce((sum, value) => sum + value, 0);
        const average = total / valuesArray.length;

        row.innerHTML = `
            <td>Average Value</td>
            <td>${average.toFixed(2)}</td>
        `;

    } else {

        row.innerHTML = `
            <td>Average Value</td>
            <td class="text-danger">There are no values to be calculated. Please add data.</td>
        `;
    }

    tbody.appendChild(row);
});

document.getElementById('highlightEntries').addEventListener('click', function() {
  const valuesArray = Array.from(document.querySelectorAll('td[data-value]'))
                           .map(cell => parseFloat(cell.getAttribute('data-value')));
  const rows = document.querySelectorAll('#tableResult tr');

  if (valuesArray.length > 0) {
      const total = valuesArray.reduce((sum, value) => sum + value, 0);
      const average = total / valuesArray.length;

      rows.forEach(row => {
          const valueCell = row.querySelector('td[data-value]');
          if (valueCell) {
              const value = parseFloat(valueCell.getAttribute('data-value'));
              if (value < average) {
                  row.classList.add('border', 'border-5', 'border-danger');
              };
          }
      });
  } else {
      console.log('No values smaller than average.');
  }
});
