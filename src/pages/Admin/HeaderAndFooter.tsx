// Header компонент для админки
const AdminHeader: React.FC = () => {
  return (
    <header>
      <h1>Страница администратора</h1>
      {/* Для разработки */}
    </header>
  );
};

// Footer компонент для админки
const AdminFooter: React.FC = () => {
  return (
    <footer>
      <p>&copy; 2024 Администратор</p>
    </footer>
  );
};

export { AdminHeader, AdminFooter };