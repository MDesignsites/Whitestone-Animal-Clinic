// Service Finder Search Logic
const servicesData = [
    // General Medical Services
    { name: "Consultation", category: "General Medical Services", description: "General medical advice and check-ups." },
    { name: "Diagnostic", category: "General Medical Services", description: "Identifying diseases or conditions." },
    { name: "Wellness and therapeutic services", category: "General Medical Services", description: "Services for overall well-being and therapy." },
    { name: "Infectious and non-infectious in-house care", category: "General Medical Services", description: "Care for various conditions within the facility." },
    { name: "Emergency care", category: "General Medical Services", description: "Urgent medical attention when you need it most." },
    { name: "Farm and home visits", category: "General Medical Services", description: "Medical services provided at your farm or home." },
    { name: "Dentistry", category: "General Medical Services", description: "Comprehensive oral health services for pets." },
    { name: "Dietary and behaviour counseling", category: "General Medical Services", description: "Guidance on pet nutrition and behavior." },
    // Laboratory & Diagnostic Testing
    { name: "Radiology", category: "Laboratory & Diagnostic Testing", description: "Imaging tests including X-rays for diagnosis." },
    { name: "Ultrasonography", category: "Laboratory & Diagnostic Testing", description: "Ultrasound imaging for internal assessments." },
    { name: "Electrocardiography", category: "Laboratory & Diagnostic Testing", description: "ECG for monitoring heart activity and health." },
    { name: "Serum chemistry", category: "Laboratory & Diagnostic Testing", description: "Blood tests to evaluate organ function and health." },
    { name: "Hematology (CBC)", category: "Laboratory & Diagnostic Testing", description: "Complete blood count for overall health screening." },
    { name: "Canine and feline blood typing", category: "Laboratory & Diagnostic Testing", description: "Blood type identification for dogs and cats." },
    { name: "Urinalysis", category: "Laboratory & Diagnostic Testing", description: "Analysis of urine to detect health issues." },
    { name: "Fecalysis", category: "Laboratory & Diagnostic Testing", description: "Stool sample analysis for parasites and other issues." },
    { name: "Cytology", category: "Laboratory & Diagnostic Testing", description: "Microscopic examination of cells for diagnosis." },
    { name: "Biopsy", category: "Laboratory & Diagnostic Testing", description: "Examination of tissue samples for diagnosis." },
    { name: "Parasite and microbial testing", category: "Laboratory & Diagnostic Testing", description: "Testing for various parasites and microbes." },
    // Specialized Treatments
    { name: "Chemotherapy", category: "Specialized Treatments", description: "Cancer treatment using specialized drugs." },
    { name: "Microchipping", category: "Specialized Treatments", description: "Permanent pet identification via microchip implant." },
    { name: "Therapeutic bath and grooming", category: "Specialized Treatments", description: "Medicated baths and grooming for skin conditions and health." },
    // Retail & Supplies
    { name: "Veterinary pharmacy", category: "Retail & Supplies", description: "Dispensing medications and veterinary pharmaceutical products." },
    { name: "Pet supplies", category: "Retail & Supplies", description: "A range of quality pet food, toys, and accessories." }
];

const searchInput = document.getElementById('serviceSearchInput');
const searchButton = document.getElementById('serviceSearchButton');
const resultsArea = document.getElementById('resultsArea');
const noResultsMessage = resultsArea.querySelector('.no-results');

function displayResults(query) {
    resultsArea.innerHTML = ''; // Clear previous results including "no results" message
    const lowerCaseQuery = query.toLowerCase().trim();

    if (!lowerCaseQuery) {
        resultsArea.appendChild(noResultsMessage); // Show initial message if query is empty
        return;
    }

    const filteredServices = servicesData.filter(service =>
        service.name.toLowerCase().includes(lowerCaseQuery) ||
        service.category.toLowerCase().includes(lowerCaseQuery) ||
        (service.description && service.description.toLowerCase().includes(lowerCaseQuery))
    );

    if (filteredServices.length > 0) {
        const ul = document.createElement('ul');
        ul.className = 'service-results-list';
        filteredServices.forEach(service => {
            const li = document.createElement('li');
            li.className = 'service-card';
            li.innerHTML = `
                        <h3>${service.name}</h3>
                        <p class="category"><strong>Category:</strong> ${service.category}</p>
                        <p class="description">${service.description}</p>
                    `;
            ul.appendChild(li);
        });
        resultsArea.appendChild(ul);
    } else {
        const p = document.createElement('p');
        p.className = 'no-results';
        p.textContent = `No services found matching "${query}". Try a different term.`;
        resultsArea.appendChild(p);
    }
}

if (searchButton && searchInput) {
    searchButton.addEventListener('click', () => {
        displayResults(searchInput.value);
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            displayResults(searchInput.value);
        }
    });
}