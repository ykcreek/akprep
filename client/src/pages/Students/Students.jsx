import { useEffect, useState } from "react";
import StudentCard from "../../components/StudentCard/StudentCard";
import StudentDetail from "../../components/StudentDetails/StudentDetails";
import "./Students.css";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to load students:", err);
      }

      setLoading(false);
    };

    loadStudents();
  }, []);

  const filtered = students.filter((s) =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="students-page">
      <div className="students-header">
        <div>
          <h1>Students</h1>
          <p>{students.length} total • {filtered.length} shown</p>
        </div>

        <input
          type="text"
          placeholder="Search students..."
          className="students-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="students-body">
          <div className="students-list">
            {filtered.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                isSelected={selectedStudent?.id === student.id}
                onSelect={() => setSelectedStudent(student)}
              />
            ))}
          </div>

          <div className="students-detail">
            {selectedStudent ? (
              <StudentDetail student={selectedStudent} />
            ) : (
              <div className="students-empty">
                <h3>No student selected</h3>
                <p>Select a student to view details.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
