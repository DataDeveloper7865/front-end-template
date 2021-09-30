import React, { useState } from 'react';

function Student (props) {

    const [plusSignToggle, setPlusSignToggle] = useState(false)

    //Calculate Average Grade For Students
    function averageGrade(grades) {
        let total = 0;
        grades.forEach(num => total += parseInt(num))
        return total / grades.length
    }

    //Toggle Plus Button Click
    function handlePlusButtonClicked(e) {
        setPlusSignToggle(!plusSignToggle);
    }

    //Add A Tag To Student In Parent State
    function addATagInput(e) {
        if (e.key === "Enter" && e.target.value !== "") {
            props.tagHandler(props.student.firstName, e.target.value)
            e.target.value = "";
        }
    };

    return (

        // Main Card Container
        <div className="card flex-row flex-wrap w-75" style={{margin: "auto"}}>

            {/* Profile Image */}
            <div>
                <img style={{width: "100px"}} className="m-4 rounded-circle" src={props.student.pic} alt={props.student.firstName} />
            </div>

            {/* Main Card Content */}
            <div className="card-block px-2">
                <h1 className="card-title" style={{textAlign: "left"}}>{props.student.firstName} {props.student.lastName}</h1>
                <p className="card-text" style={{textAlign: "left"}}> Email: {props.student.email}  </p>
                <p className="card-text" style={{textAlign: "left"}}> Company: {props.student.company}  </p>
                <p className="card-text" style={{textAlign: "left"}}> Skill: {props.student.skill}  </p>
                <p className="card-text" style={{textAlign: "left"}}>  Average: {averageGrade(props.student.grades)} % </p>
                {plusSignToggle 
                    ? 
                    props.student.grades.map((el, index) => <p key={index} style={{textAlign: "left"}}> 
                        Test {props.student.grades.indexOf(el)+1} {el}%
                        </p>)
                    : 
                    ""
                }

                {/* Tag List */}
                <h4 style={{textAlign: "left"}}>
                    {props.student.tagList
                        ?
                            props.student.tagList.map((tag, index) => (
                                <button key={index} style={{marginRight: "2px"}} className="btn btn-secondary">{tag}</button>))
                        :
                        ""
                    }
                </h4>

                {/* Tag Input */}
                <div style={{textAlign: "left"}}>
                    <input 
                        style={{
                            textAlign: "left",
                            border: 0,
                            outline: 0,
                            background: 'transparent',
                            borderBottom: "1px solid gray",
                            width: "250px"
                        }}
                        type="text"
                        onKeyUp={e => addATagInput(e)}
                        placeholder="Add A Tag (Enter To Submit)"
                    />
                </div>
            </div>

            {/* Plus Sign Click */}
            <div style={{position: 'absolute', top: '10px', right: '10px'}}>
                {plusSignToggle 
                    ? 
                        <svg onClick={(e) => handlePlusButtonClicked(e)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-dash-lg" viewBox="0 0 16 16">
                            <path d="M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z"/>
                        </svg>
                    : 
                        <svg onClick={(e) => handlePlusButtonClicked(e)} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                }
            </div>

        </div>

    )

}

export default Student;