# Corporate Communication Calendar

A React-based Calendar Application for managing and tracking corporate communications efficiently.

## 🌟 Live Demo

[View Live Demo](https://corporate-comm-calendar.example.com)

## 🎯 Features

### Admin Module

- **Company Management**
  - CRUD operations for companies
  - Detailed company profiles including name, location, LinkedIn, contacts
  - Communication periodicity settings
- **Communication Methods**
  - Predefined communication sequence
  - Customizable method settings
  - Priority and mandatory flags

### User Module

- **Interactive Dashboard**
  - Grid view of companies
  - Last 5 communications history
  - Next scheduled communication display
  - Color-coded status indicators
- **Smart Notifications**
  - Overdue communications alerts
  - Due today reminders
  - Badge counter for pending tasks
- **Calendar Interface**
  - Past communication logs
  - Future communication planning
  - Visual scheduling

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

git clone https://github.com/your-username/corporate-communication-calendar.git
cd corporate-communication-calendar
npm install
npm start

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables with your specific settings

## 🛠️ Built With

- React.js
- Tailwind CSS
- React Router
- Context API for state management

## 📝 Usage

### Admin Access

1. Navigate to `/admin`
2. Use the company management interface to add/edit companies
3. Configure communication methods and sequences

### User Dashboard

1. View company grid on the main dashboard
2. Check notifications for pending communications
3. Log new communications using the action modal
4. Use calendar view for schedule management

## 🔍 Known Limitations

- Calendar view limited to 6-month future planning
- Maximum of 10 communication methods per company
- Bulk actions limited to 20 companies at once
- Real-time collaboration features not yet implemented

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 👥 Contact

John Doe - john.doe@example.com
Project Link: https://github.com/johndoe/corporate-communication-calendar
