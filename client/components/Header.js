import Link from "next/link";
import { Button, Menu } from "semantic-ui-react";
import React, { Component, useState } from "react";
import { useRouter } from "next/router";

const Header = (props) => {
  const [textButton, setTextButton] = useState("Войти");
  const router = useRouter();

  function hanldeButtonClick() {
    if (textButton === "Войти") {
      connectWallet();
    } else {
      router.push("/user");
    }
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "👆🏽 Write a message in the text-field above.",
          address: addressArray[0],
        };
        setTextButton(addressArray[0]);
        return obj;
      } catch (error) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  return (
    <Menu>
      <Menu.Item>
        <Link href="/">Главная</Link>
      </Menu.Item>

      <Menu.Item>
        <Link href="/about">Как это работает</Link>
      </Menu.Item>

      <Menu.Item>
        <Link href="/create_deal">Создать сделку</Link>
      </Menu.Item>

      <Menu.Item>
        <Link href="/deal">Проверить сделку</Link>
      </Menu.Item>

      <Menu.Item>
        <Link href="/gist">Гист</Link>
      </Menu.Item>

      <Menu.Item>
        <Link href="/notarize">Заверить</Link>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>
          <Button onClick={hanldeButtonClick}>{textButton}</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
