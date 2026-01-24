import { useState, useEffect } from "react";
import { Search, MoreVertical } from "lucide-react";
import "./StudentList.css";
import StudentModal from "../../components/StudentModal/StudentModal";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modal State
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch("YOUR_GOOGLE_SCRIPT_WEB_APP_URL");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      // Fallback sample data
      setStudents([
        {
          "First Name": "Jane", "Last Name": "Doe", "Email Address": "jane@example.com",
          "Current College or University": "University of Massachusetts Amherst (Commonwealth Honors)",
          "GPA": "3.85", "What Schools Are You Considering?": "NYU Stern, Columbia University, UPenn Wharton",
          "Timestamp": "2026-01-20",
          "Notable Extracurriculars or Awards": "Founder of Pre-Law Society, 2x Dean's List, Volunteer at local clinic."
        },
        {
          "First Name": "John", "Last Name": "Smith", "Email Address": "john.smith.extralongemail@provider.com",
          "Current College or University": "Indiana University Bloomington",
          "GPA": "3.92", "What Schools Are You Considering?": "UPenn, UChicago, Northwestern, Stanford",
          "Timestamp": "2026-01-21",
          "Notable Extracurriculars or Awards": "Division 1 Swimmer, Investment Club VP, Research assistant in Economics."
        }
      ]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchStudents(); }, []);

  const filteredStudents = students.filter(s => 
    `${s["First Name"]} ${s["Last Name"]}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <div className="student-list-container">
      <header className="list-header">
        <div className="list-title-area">
          <div className="list-title-wrapper">
            <div className="list-line"></div>
            <h1>Student Leads</h1>
            <div className="list-line"></div>
          </div>
          <p>Manage and review incoming transfer inquiries from Google Forms.</p>
        </div>
      </header>

      <div className="list-controls">
        <div className="search-wrapper">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="refresh-btn" onClick={fetchStudents}>Refresh</button>
      </div>

      <div className="table-wrapper">
        <table className="student-table">
          <colgroup>
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "5%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Name</th>
              <th>Current Institution</th>
              <th>GPA</th>
              <th>Target Schools</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="table-loader">Loading...</td></tr>
            ) : filteredStudents.map((student, index) => (
              <tr 
                key={index} 
                onClick={() => handleRowClick(student)} 
                className="student-row"
              >
                <td className="student-name-cell">
                  <div className="truncate-wrapper">
                    <strong>{student["First Name"]} {student["Last Name"]}</strong>
                    <span>{student["Email Address"]}</span>
                  </div>
                </td>
                <td>
                  <div className="truncate-wrapper">
                    {student["Current College or University"]}
                  </div>
                </td>
                <td><span className="gpa-badge">{student["GPA"]}</span></td>
                <td>
                  <div className="truncate-wrapper">
                    {student["What Schools Are You Considering?"]}
                  </div>
                </td>
                <td className="date-cell">
                   {new Date(student["Timestamp"]).toLocaleDateString()}
                </td>
                <td>
                  <button className="action-dot">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Component */}
      <StudentModal 
        student={selectedStudent} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}