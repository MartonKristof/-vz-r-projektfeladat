const hamburger = document.getElementById('hamburger');
        const navLinks = document.querySelector('.nav-links');
        hamburger.onclick = () => navLinks.classList.toggle('show');

        const questions = [
            {
                question: "Melyik SQL utasítással hozol létre új táblát?",
                answers: [
                    "CREATE TABLE",
                    "INSERT INTO",
                    "ALTER TABLE",
                    "NEW TABLE"
                ],
                correct: 0
            },
            {
                question: "Hogyan íratod ki az összes adatot a 'diakok' táblából?",
                answers: [
                    "SELECT * FROM diakok;",
                    "GET ALL FROM diakok;",
                    "SHOW diakok;",
                    "DISPLAY * diakok;"
                ],
                correct: 0
            },
            {
                question: "Melyik kulcsszóval kapcsolsz össze két táblát lekérdezésben?",
                answers: [
                    "CONNECT",
                    "JOIN",
                    "LINK",
                    "MERGE"
                ],
                correct: 1
            },
            {
                question: "Melyik SQL utasítással törölsz egy egész táblát?",
                answers: [
                    "REMOVE TABLE",
                    "DROP TABLE",
                    "DELETE TABLE",
                    "ERASE TABLE"
                ],
                correct: 1
            },
            {
                question: "Melyik parancsot használod egy rekord törlésére?",
                answers: [
                    "REMOVE FROM",
                    "DROP FROM",
                    "DELETE FROM",
                    "ERASE FROM"
                ],
                correct: 2
            },
            {
                question: "Melyik kulcsszóval frissítesz adatot egy táblában?",
                answers: [
                    "CHANGE",
                    "UPDATE",
                    "MODIFY",
                    "SET"
                ],
                correct: 1
            },
            {
                question: "Melyik kulcsszóval korlátozod, hogy egy oszlop értéke ne ismétlődhessen?",
                answers: [
                    "UNIQUE",
                    "PRIMARY",
                    "NOT NULL",
                    "FOREIGN"
                ],
                correct: 0
            },
            {
                question: "Melyik kulcsszóval akadályozod meg, hogy egy oszlop értéke NULL legyen?",
                answers: [
                    "UNIQUE",
                    "PRIMARY",
                    "NOT NULL",
                    "FOREIGN"
                ],
                correct: 2
            },
            {
                question: "Melyik kulcsszóval kapcsolsz össze két táblát idegen kulccsal?",
                answers: [
                    "FOREIGN KEY",
                    "PRIMARY KEY",
                    "UNIQUE KEY",
                    "REFERENCE KEY"
                ],
                correct: 0
            },
            {
                question: "Melyik SQL utasítással módosítod egy tábla szerkezetét?",
                answers: [
                    "CHANGE TABLE",
                    "ALTER TABLE",
                    "MODIFY TABLE",
                    "UPDATE TABLE"
                ],
                correct: 1
            },
            {
                question: "Melyik SQL utasítással adhatsz új oszlopot egy meglévő táblához?",
                answers: [
                    "ALTER TABLE ... ADD",
                    "UPDATE TABLE ... ADD",
                    "INSERT INTO ... ADD",
                    "MODIFY TABLE ... ADD"
                ],
                correct: 0
            },
            {
                question: "Melyik SQL kulcsszóval adsz elsődleges kulcsot egy oszlophoz?",
                answers: [
                    "PRIMARY KEY",
                    "FOREIGN KEY",
                    "UNIQUE",
                    "INDEX"
                ],
                correct: 0
            },
            {
                question: "Melyik SQL kulcsszóval adsz idegen kulcsot egy oszlophoz?",
                answers: [
                    "FOREIGN KEY",
                    "PRIMARY KEY",
                    "UNIQUE",
                    "INDEX"
                ],
                correct: 0
            },
            {
                question: "Melyik SQL kulcsszóval tiltasz meg NULL értéket egy oszlopban?",
                answers: [
                    "NOT NULL",
                    "UNIQUE",
                    "PRIMARY",
                    "FOREIGN"
                ],
                correct: 0
            },
            {
                question: "Melyik SQL utasítással módosítasz adatot egy táblában?",
                answers: [
                    "UPDATE",
                    "MODIFY",
                    "CHANGE",
                    "ALTER"
                ],
                correct: 0
            },
            {
                question: "Melyik SQL utasítással törölsz rekordokat egy táblából?",
                answers: [
                    "DELETE FROM",
                    "REMOVE FROM",
                    "DROP FROM",
                    "ERASE FROM"
                ],
                correct: 0
            },
            {
                question: "Melyik SQL utasítással szűrsz le adatokat egy lekérdezésben?",
                answers: [
                    "WHERE",
                    "HAVING",
                    "ORDER BY",
                    "GROUP BY"
                ],
                correct: 0
            },
            {
                question: "Melyik SQL utasítással csoportosítasz adatokat?",
                answers: [
                    "GROUP BY",
                    "ORDER BY",
                    "WHERE",
                    "HAVING"
                ],
                correct: 0
            },
            {
                question: "Melyik SQL utasítással rendezel adatokat?",
                answers: [
                    "ORDER BY",
                    "GROUP BY",
                    "WHERE",
                    "HAVING"
                ],
                correct: 0
            },
            {
                question: "Melyik SQL kulcsszóval adsz egyedi értéket minden rekordhoz?",
                answers: [
                    "AUTO_INCREMENT",
                    "UNIQUE",
                    "PRIMARY",
                    "SERIAL"
                ],
                correct: 0
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        let attempts = [];
        let selectedQuestions = [];

        function getRandomQuestions() {
            // Véletlen keverés, majd az első 5 kérdés kiválasztása
            const shuffled = questions
                .map(q => ({ q, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ q }) => q);
            return shuffled.slice(0, 5);
        }

        const questionDiv = document.getElementById('question');
        const answersDiv = document.getElementById('answers');
        const nextBtn = document.getElementById('next-btn');
        const scoreDiv = document.getElementById('score');

        function loadQuestion() {
            nextBtn.disabled = true;
            questionDiv.textContent = selectedQuestions[currentQuestion].question;
            answersDiv.innerHTML = '';
            scoreDiv.textContent = "";
            selectedQuestions[currentQuestion].answers.forEach((ans, idx) => {
                const btn = document.createElement('button');
                btn.textContent = ans;
                btn.className = 'answer-btn';
                btn.onclick = () => selectAnswer(idx, btn);
                answersDiv.appendChild(btn);
            });
        }

        function selectAnswer(idx, btn) {
            const correctIdx = selectedQuestions[currentQuestion].correct;
            const buttons = answersDiv.querySelectorAll('button');
            buttons.forEach(b => b.disabled = true);
            if (idx === correctIdx) {
                btn.classList.add('correct');
                score++;
            } else {
                btn.classList.add('incorrect');
                buttons[correctIdx].classList.add('correct');
            }
            nextBtn.disabled = false;
        }

        function nextButtonHandler() {
            if (nextBtn.textContent === "Új próba") {
                currentQuestion = 0;
                score = 0;
                nextBtn.textContent = "Következő kérdés";
                scoreDiv.textContent = "";
                selectedQuestions = getRandomQuestions();
                loadQuestion();
            } else {
                currentQuestion++;
                if (currentQuestion < selectedQuestions.length) {
                    loadQuestion();
                } else {
                    showScore();
                }
            }
        }

        nextBtn.onclick = nextButtonHandler;

        function showScore() {
            const now = new Date();
            attempts.push({
                score: score,
                date: now.toLocaleString('hu-HU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
            });
            questionDiv.textContent = "Vége a kvíznek!";
            answersDiv.innerHTML = '';
            scoreDiv.textContent = `Összpontszám: ${score} / ${selectedQuestions.length}`;
            nextBtn.disabled = false;
            nextBtn.textContent = "Új próba";
            updateResultsTable();
        }

        // Táblázat frissítése
        function updateResultsTable() {
            let quizDiv = document.querySelector('.glass');
            if (!quizDiv) return;

            let table = quizDiv.querySelector('.responsive-table');
            if (!table) {
                table = document.createElement('table');
                table.className = 'responsive-table';
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>Próba</th>
                            <th>Pontszám</th>
                            <th>Dátum</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;
                quizDiv.appendChild(table);
            }
            const tbody = table.querySelector('tbody');
            tbody.innerHTML = '';
            attempts.forEach((att, idx) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td data-label="Próba">${idx + 1}.</td>
                    <td data-label="Pontszám">${att.score} / ${selectedQuestions.length}</td>
                    <td data-label="Dátum">${att.date}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Indítás
        selectedQuestions = getRandomQuestions();
        loadQuestion();