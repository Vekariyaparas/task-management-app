import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

// DATA STORE IN API 
function App() {
  const title = useRef("");
  const date = useRef("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const addtask = () => {
    var insert = {
      title: title.current.value,
      date: date.current.value
    }

    axios.post("http://localhost:400/task", insert)
      .then(() => {
        swal("Task Added Successfully");
        window.location = '/'
      });

  }

  // DESTRUCTURE OF DATA 

  const [task, settask] = useState([]);

  function Adddata() {
    axios.get("http://localhost:400/task")
      .then((res) => { settask(res.data) });
  }

  useEffect(() => {
    Adddata();
  }, []);

  // DELETE DATA FROM API 
  const Deletedata = (id) => {
    axios.delete(`http://localhost:400/task/${id}`)
      .then((res) => {
        console.warn(res)
        swal({
          icon: 'success',
          title: 'Delete Successfully'
        })
        Adddata();
      })
  }


  return (
    <>
        <div className='TaskManager rounded'>
          <div className='pops bg-light mx-auto mt-5 p-2'>
            <div className='d-flex justify-content-between m-0 p-3'>
              <div className=''>
                <h2 className='text-success'>Task Manager App</h2>
                <h3 className='mt-4'>Number of Task : <b className='text-success'>1 {task.length} </b></h3>
              </div>
              <div className=''>
                <button className='btn btn-success mt-1' onClick={handleShow}>Add Task</button>
              </div>
            </div>
          </div>
        </div>

        <Modal className='' show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Task Manager App</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className='form-control'>
              <label>Task</label><br />
              <input type='text' ref={title} placeholder='Task Title**' className='form-control' /><br />

              <label>Date & Time</label><br />
              <input type='date' ref={date} placeholder='Date & Time **' className='form-control' /><br />
              <button type='button' onClick={addtask} className='form-control bg-dark text-white'>Submit Task</button>
            </form>
          </Modal.Body>
        </Modal>

        <div className='Manage mt-5 mx-auto pt-5'>
          <h1 className='text-success'>Manage Task</h1>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Date (yy/mm/dd)</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                    <th scope="row">0</th>
                    <td>Create Login Form</td>
                    <td>2023/08/10</td>
                    <td>
                      <button type='button'className='ms-2 p-1 border-0 bg-danger text-light rounded-1'>Delete</button>
                    </td>
                  </tr>
              {task && task.map((item) => {
                return (


                  <tr>
                    <th scope="row" key={item.id}>{item.id}</th>
                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    <td>
                      <button type='button' onClick={() => Deletedata(item.id)} className='ms-2 p-1 border-0 bg-danger text-light rounded-1'>Delete</button>
                    </td>
                  </tr>

                )
              })}
            </tbody>
          </table>
        </div>
    </>
  );
}

export default App;
