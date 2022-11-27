import { useState } from "react";
import Modal from "react-modal";
import Button from "../../components/Button";
import Form from "../../components/Form";
import logo from "../../imgs/logo.svg";
import styles from "./style.module.css";

const Home = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  Modal.setAppElement("#root");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <section className={styles.left}>
        <img src={logo} alt="" />
        <h2>Textinho do banco NGCASH</h2>
        <h3>Pra ficar bonitinho</h3>
      </section>
      <section className={styles.right}>
        <Form title="Faça o login" typeSubmit="login" buttonText="Login" />
      </section>
      <Button onClick={openModal} innerText="Cadastrar" />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal Cadastro"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div>
          <h1>Bem vindo(a) ao NG.CASH</h1>
          <h2>Realize seu cadastro a seguir</h2>
          <Button className={styles["btn-close"]} onClick={closeModal} innerText="Fechar" />
          <Form typeSubmit="signup" buttonText="Cadastrar" />
        </div>
      </Modal>
    </div>
  );
};

export default Home;
