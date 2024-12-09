// Fetch GBIF data when the page loads
window.onload = async () => {
    try {
      const response = await fetch('/species');
      const data = await response.json();

      // Populate the table with the data
      const tableBody = document.getElementById('table-body');
      data.forEach(item => {
        const row = document.createElement('tr');

        // Create and populate table cells for each item
        const cell1 = document.createElement('td');
        cell1.textContent = item.speciesKey || 'N/A'; // Example data point
        row.appendChild(cell1);

        const cell2 = document.createElement('td');
        cell2.textContent = item.country || 'N/A'; // Example data point
        row.appendChild(cell2);

        const cell3 = document.createElement('td');
        cell3.textContent = item.decimalLongitude || 'N/A'; // Example data point
        row.appendChild(cell3);

        const cell4 = document.createElement('td');
        cell4.textContent = item.decimalLatitude || 'N/A'; // Example data point
        row.appendChild(cell4);

        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };