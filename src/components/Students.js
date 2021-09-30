import React, { useEffect, useState } from 'react';
import Student from './Student';

function Students () {

    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([])
    const [curNameSearch, setCurNameSearch] = useState("");
    const [curTagSearch, setCurTagSearch] = useState("");

    // Grab Data From API On Component Load
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
                `https://api.hatchways.io/assessment/students`
            );
            const data = await response.json();
            setStudents(data.students)
            setFilteredStudents(data.students)
          } catch (error) {
            console.log(error.message);
          }
        };
    
        fetchData();
      }, []);

    function handleSearchInput(e) {
        let search = e.target.value;
        setCurNameSearch(search);
        let tempFilteredStudents = students.filter(
                student => student.firstName.toLowerCase().startsWith(search.toLowerCase()) 
                || student.lastName.toLowerCase().startsWith(search.toLowerCase())).filter(
                    student => searchTagHelper(student, curTagSearch)
                )
        setFilteredStudents(tempFilteredStudents);
    }

    function updateTagOnStudent(studentName, tagName) {
        //Get Student From Array
        let studentToUpdate = students.filter(student => student.firstName === studentName);
        //Check if tag list exists on student, if not make it and push it
        if (studentToUpdate[0].tagList !== undefined) {
            studentToUpdate[0].tagList.push(tagName.toLowerCase())
        } else {
            studentToUpdate[0].tagList = [tagName.toLowerCase()]
        }
        //Make Copy of State without Student
        let studentsWithOutUpdatedStudent = students.filter(student => student.firstName !== studentName);
        //Add Updated Student
        studentsWithOutUpdatedStudent.push(studentToUpdate[0]);
        //Set Students with Updated Student
        setStudents(studentsWithOutUpdatedStudent);
    }

    function handleSearchTag(e) {
        let search = e.target.value;
        setCurTagSearch(search);
        let tempFilteredStudents = students.filter(
                student => searchTagHelper(student, search)).filter(
                    student => student.firstName.toLowerCase().startsWith(curNameSearch.toLowerCase())
                    || student.lastName.toLowerCase().startsWith(curNameSearch.toLowerCase())
                );
        setFilteredStudents(tempFilteredStudents);
    }

    function searchTagHelper(student, tagSearch) {
        if (tagSearch === '') {
            return true;
        }
        if (student.tagList !== undefined) {
            for (let tag of student.tagList) {
                if (tag.startsWith(tagSearch.toLowerCase())) {
                    return true
                }
            }
        } else {
            return false;
        }
    }

    return (

        <div>
            <h1> Front End Hatchways Assessment </h1>

            {/* Search By Name */}
            <div className="form-outline w-75" style={{margin: "auto"}}>
                <input 
                    style={{
                        textAlign: "left",
                        border: 0,
                        outline: 0,
                        background: 'transparent',
                        borderBottom: "1px solid gray",
                        width: "100%"
                    }}
                    type="search" id="form1" className="form-control" placeholder="Search By First or Last Name"
                        aria-label="Search" onChange={(e) => handleSearchInput(e)}/>
            </div>

            {/* Search By Tag */}
            <div className="form-outline w-75" style={{margin: "auto"}}>
                <input 
                    style={{
                        textAlign: "left",
                        border: 0,
                        outline: 0,
                        background: 'transparent',
                        borderBottom: "1px solid gray",
                        width: "100%"
                    }}
                    type="search" id="form1" className="form-control" placeholder="Search By Tag"
                        aria-label="Search" onChange={(e) => handleSearchTag(e)}/>
            </div>

            {/* Student List */}
                    {filteredStudents.map(student =>  
                            <Student tagHandler={updateTagOnStudent} student={student} key={student.id}/>
                        ) 
                    }
        </div>
    )
}

export default Students;