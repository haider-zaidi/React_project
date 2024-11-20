import React, { useState } from "react";

function RoundRobin() {
    const [numProcesses, setNumProcesses] = useState(0);
    const [processes, setProcesses] = useState([]);
    const [timeQuantum, setTimeQuantum] = useState("");
    const [results, setResults] = useState([]);
    const [simulationSequence, setSimulationSequence] = useState([]);
    const [isSimulating, setIsSimulating] = useState(false);

    const handleNumProcessesChange = (e) => {
        setNumProcesses(parseInt(e.target.value, 10) || 0);
        setProcesses([]);
    };

    const generateProcessInputs = () => {
        const newProcesses = Array.from({ length: numProcesses }, (_, i) => ({
            id: i + 1,
            arrival: "",
            burst: "",
            remainingBurst: "",
            completion: 0,
            turnaround: 0,
            waiting: 0,
        }));
        setProcesses(newProcesses);
    };

    const handleInputChange = (index, field, value) => {
        const updatedProcesses = [...processes];
        updatedProcesses[index][field] = value === "" ? "" : parseInt(value, 10);
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

        setResults(resultsData);
        animateSimulation(animation);
    };

    const animateSimulation = (sequence) => {
        setSimulationSequence([]); 
        setIsSimulating(true);

        sequence.forEach((step, index) => {
            setTimeout(() => {
                setSimulationSequence((prev) => [...prev, step]);
                if (index === sequence.length - 1) {
                    setIsSimulating(false);
                }
            }, index * 1000); 
        });
    };

    return (
        <div className="box p-4">
            <h2>Round Robin Scheduling</h2>
            <form>
                <div className="form-group">
                    <label>Number of Processes:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={numProcesses || ""}
                        onChange={handleNumProcessesChange}
                        min="1"
                        required
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={generateProcessInputs}
                >
                    Generate Inputs
                </button>
            </form>

            {/* Process Inputs */}
            {processes.map((process, index) => (
                <div key={index} className="form-group mt-3">
                    <label>Process {process.id} Arrival Time:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={process.arrival}
                        onChange={(e) =>
                            handleInputChange(index, "arrival", e.target.value)
                        }
                        min="0"
                        required
                    />
                    <label>Process {process.id} Burst Time:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={process.burst}
                        onChange={(e) =>
                            handleInputChange(index, "burst", e.target.value)
                        }
                        min="1"
                        required
                    />
                </div>
            ))}

            {/* Time Quantum Input */}
            <div className="form-group mt-3">
                <label>Time Quantum:</label>
                <input
                    type="number"
                    className="form-control"
                    value={timeQuantum}
                    onChange={(e) => setTimeQuantum(parseInt(e.target.value, 10) || "")}
                    min="1"
                    required
                />
            </div>
            <button
                type="button"
                className="btn btn-success mt-3"
                onClick={runRoundRobinSimulation}
                disabled={isSimulating}
            >
                Simulate
            </button>

            {/* Simulation Animation */}
            <div className="simulation-box mt-4">
                <h3>Simulation Animation</h3>
                <div className="process-container">
                    {simulationSequence.map((step, index) => (
                        <button
                            key={index}
                            className="btn btn-primary m-1"
                            style={{ animationDuration: `${step.duration}s` }}
                        >
                            P{step.id}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Table */}
            <table className="table table-bordered mt-4">
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
                    {results.map((result) => (
                        <tr key={result.id}>
                            <td>P{result.id}</td>
                            <td>{result.arrival}</td>
                            <td>{result.burst}</td>
                            <td>{result.completion}</td>
                            <td>{result.turnaround}</td>
                            <td>{result.waiting}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export {RoundRobin};
