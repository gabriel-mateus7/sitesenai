const spreadsheetId = '1GjhWQe5Fw_sYr-TVFnpYeQ3EH6fjBrgUobQR8Z71lnA';
        const apiKey = 'AIzaSyDoxlOv0YGQWQ7L3pJUP9eGZOKC_kV6SSs';
        const sheetNames = ['Aperfeiçoamento Profissional', 'Qualificação Profissional', 'TÉCNICO', 'Aprendizagem Industrial'];
        
        let allCourses = [];
        let filteredCourses = [];
        let currentPage = 1;
        const coursesPerPage = 6;

        async function fetchCourses(sheetName) {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!B4:E?key=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            return data.values || [];
        }

        async function loadAllCourses() {
            for (const sheetName of sheetNames) {
                const courses = await fetchCourses(sheetName);
                allCourses = allCourses.concat(courses);
            }
            filteredCourses = [...allCourses];
            renderCourses();
            updatePagination();
        }

        function renderCourses() {
            const container = document.getElementById('coursesContainer');
            container.innerHTML = '';
            
            const startIndex = (currentPage - 1) * coursesPerPage;
            const endIndex = startIndex + coursesPerPage;
            const coursesToDisplay = filteredCourses.slice(startIndex, endIndex);

            coursesToDisplay.forEach(course => {
                const [nome, cargaHoraria, , preco] = course;

                const card = document.createElement('div');
                card.className = 'card';

                const title = document.createElement('h3');
                title.textContent = nome;
                card.appendChild(title);

                const hours = document.createElement('p');
                hours.textContent = `Carga Horária: ${cargaHoraria}`;
                card.appendChild(hours);

                const price = document.createElement('p');
                price.textContent = `Preço: ${preco}`;
                card.appendChild(price);

                const button = document.createElement('button');
                button.textContent = 'Matricule-se';
                button.onclick = () => window.location.href = '../Pré Matricula/index.html';
                card.appendChild(button);

                container.appendChild(card);
            });
        }

        function updatePagination() {
            document.getElementById('prevButton').disabled = currentPage === 1;
            document.getElementById('nextButton').disabled = currentPage === Math.ceil(filteredCourses.length / coursesPerPage);
        }

        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                renderCourses();
                updatePagination();
            }
        }

        function nextPage() {
            if (currentPage < Math.ceil(filteredCourses.length / coursesPerPage)) {
                currentPage++;
                renderCourses();
                updatePagination();
            }
        }

        // Função de Filtro para a Pesquisa Dinâmica
        function filterCourses() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            filteredCourses = allCourses.filter(course => course[0].toLowerCase().includes(query));
            currentPage = 1;  // Reset para a primeira página dos resultados filtrados
            renderCourses();
            updatePagination();
        }

        loadAllCourses();