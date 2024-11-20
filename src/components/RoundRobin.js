import React, { useState } from "react";

const RoundRobin = () => {
  const [numProcesses, setNumProcesses] = useState(0);
  const [timeQuantum, setTimeQuantum] = useState("");
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState([]);
  const [animationSequence, setAnimationSequence] = useState([]);

  const handleNumProcessesChange = (e) => {
    setNumProcesses(parseInt(e.target.value, 10) || 0);
    setProcesses([]);
  };

  const generateProcessInputs = () => {
    const newProcesses = Array.from({ length: numProcesses }, (_, index) => ({
      id: index + 1,
      arrival: "",
      burst: "",
      remainingBurst: "",
      completion: 0,
      turnaround: 0,
      waiting: 0,
    }));
    setProcesses(newProcesses);
  };

  const handleProcessChange = (index, field, value) => {
    const updatedProcesses = [...processes];
    updatedProcesses[index][field] = parseInt(value, 10) || 0;
    if (field === "burst") {
      updatedProcesses[index].remainingBurst = parseInt(value, 10) || 0;
    }
    setProcesses(updatedProcesses);
  };

  const runRoundRobinSimulation = () => {
    if (!timeQuantum || timeQuantum <= 0) {
      alert("Please enter a valid time quantum.");
      return;
    }

    const processList = processes.map((p) => ({ ...p }));
    processList.sort((a, b) => a.arrival - b.arrival);
    let currentTime = 0;
    let queue = [];
    let completed = 0;
    const animation = [];
    const resultsData = [];

    while (completed < processList.length) {
      processList.forEach((process, index) => {
        if (
          process.arrival <= currentTime &&
          process.remainingBurst > 0 &&
          !queue.includes(index)
        ) {
          queue.push(index);
        }
      });

      if (queue.length > 0) {
        const currentProcessIndex = queue.shift();
        const currentProcess = processList[currentProcessIndex];
        const executionTime = Math.min(timeQuantum, currentProcess.remainingBurst);

        // Animation sequence
        animation.push({
          id: currentProcess.id,
          start: currentTime,
          duration: executionTime,
        });

        currentTime += executionTime;
        currentProcess.remainingBurst -= executionTime;

        if (currentProcess.remainingBurst <= 0) {
          currentProcess.completion = currentTime;
          currentProcess.turnaround =
            currentProcess.completion - currentProcess.arrival;
          currentProcess.waiting =
            currentProcess.turnaround - currentProcess.burst;
          completed++;
          resultsData.push(currentProcess);
        }
      } else {
        currentTime++;
      }
    }

    setAnimationSequence(animation);
    setResults(resultsData);
  };

  return (
    <div className="container">
      <h1>Round Robin Scheduling</h1>

      {/* Input for Number of Processes */}
      <div className="form-group">
        <label htmlFor="numProcesses">Number of Processes:</label>
        <input
          type="number"
          id="numProcesses"
          className="form-control"
          value={numProcesses || ""}
          onChange={handleNumProcessesChange}
        />
        <button className="btn btn-primary mt-2" onClick={generateProcessInputs}>
          Generate Inputs
        </button>
      </div>

      {/* Process Input Fields */}
      {processes.map((process, index) => (
        <div key={index} className="form-group">
          <label>Process {process.id} Arrival Time:</label>
          <input
            type="number"
            className="form-control"
            value={process.arrival}
            onChange={(e) =>
              handleProcessChange(index, "arrival", e.target.value)
            }
          />
          <label>Process {process.id} Burst Time:</label>
          <input
            type="number"
            className="form-control"
            value={process.burst}
            onChange={(e) =>
              handleProcessChange(index, "burst", e.target.value)
            }
          />
        </div>
      ))}

      {/* Time Quantum Input */}
      <div className="form-group">
        <label htmlFor="timeQuantum">Time Quantum:</label>
        <input
          type="number"
          id="timeQuantum"
          className="form-control"
          value={timeQuantum}
          onChange={(e) => setTimeQuantum(parseInt(e.target.value, 10) || "")}
        />
      </div>

      {/* Run Simulation Button */}
      <button className="btn btn-success mt-3" onClick={runRoundRobinSimulation}>
        Run Simulation
      </button>

      {/* Animation Section */}
      <div id="roundRobinAnimation" className="mt-4">
        <h3>Execution Animation</h3>
        <div className="d-flex">
          {animationSequence.map((step, index) => (
            <div
              key={index}
              className="process bg-primary text-white p-2 mx-1"
              style={{
                width: `${step.duration * 20}px`,
                transition: "background-color 1s",
              }}
            >
              P{step.id}
            </div>
          ))}
        </div>
      </div>

      {/* Results Table */}
      <div className="mt-4">
        <h3>Results</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Process</th>
              <th>Arrival Time</th>
              <th>Burst Time</th>
              <th>Completion Time</th>
              <th>Turnaround Time</th>
              <th>Waiting Time</th>
            </tr>
          </thead>
          <tbody>
            {results.map((process) => (
              <tr key={process.id}>
                <td>P{process.id}</td>
                <td>{process.arrival}</td>
                <td>{process.burst}</td>
                <td>{process.completion}</td>
                <td>{process.turnaround}</td>
                <td>{process.waiting}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export {RoundRobin};
