# OS-Scheduling Simulator

An interactive, web-based simulation tool for visualizing and understanding various CPU scheduling algorithms used in operating systems. Built using React and Tailwind CSS, and now fully containerized using Docker for easy deployment and scalability.

## 🚀 Features

### Scheduling Algorithms Supported
- **First Come First Serve (FCFS)**
- **Shortest Job First (SJF)**
  - Preemptive and Non-Preemptive
- **Round Robin**
  - User-defined Time Quantum
- Optional: Extendable for Multilevel Queue or Feedback Scheduling

### Process Input & Control
- Add processes with:
  - Process ID
  - Arrival Time
  - Burst Time
  - Priority (if applicable)
- Set Time Quantum for Round Robin
- Clear and Reset buttons for user-friendly experience

### Output & Visualization
- Table showing:
  - Completion Time
  - Turnaround Time
  - Waiting Time
- Average Turnaround and Waiting Time
- Real-time visual updates after simulation

## 🛠️ Tech Stack

### Frontend
- React 19
- Tailwind CSS
- React Hooks for State Management
- React Icons

### DevOps & Tooling
- Vite for fast development
- ESLint + Prettier for linting and formatting
- Docker for containerization

## 📦 Docker & Containerization

This project is fully containerized using **Docker**, making it easy to build, run, and deploy anywhere.

### 🐳 How to Run with Docker

1. **Build Docker Image**
   ```bash
   docker build -t os-scheduler-sim .
   ```

2. **Run the Docker Container**
    ```bash
   docker run -p 3000:3000 os-scheduler-sim
   ```

### 🤝 Contributions
- Pull requests are welcome! Feel free to contribute with:
    - New scheduling algorithms
    - Better visualizations
    - UI/UX improvements
    - Performance optimizations


## 👏 Acknowledgments
- Tailwind CSS
- React

## Hosted Website Link
- OS-Scheduling Simulator - [Link](https://os-scheduling-algorithm-simulation.vercel.app/)

## 📞 Contact
Your Name - haiderzaidi45h@gmail.com

Project Link - [GitHub Repository](https://github.com/haider-zaidi/React_project)
