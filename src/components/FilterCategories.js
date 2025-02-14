import React, { Component } from "react";

import "./FilterCategories.scss";
import peluche from "../assets/images/peluche.png";
import diaDelN from "../assets/images/DiaDelNino.png";
import { Image } from "react-bootstrap";

class FilterCategories extends Component {
  render() {
    return (
      <>
        <div className="categories">
          <article>
            <a href="{base_url}tags/23-dia-del-nino">
              <div className="frame blue-color">
                <h2>Día del Niño</h2>
                <div className="title">
                  Día del <br />
                  Niño
                </div>
                <div className="productos">Ver productos</div>
                <div className="textos">
                  Consultanos los plazos
                  <br />
                  temporada DDN 2024
                </div>
              </div>
              <Image src={diaDelN} loading="lazy" className="bottom-img" />
            </a>
          </article>
          <article>
            <a href="{base_url}tags/15-peluches">
              <div className="frame red-color">
                <h2>Nuevos en Stock</h2>
                <div className="title">Peluches</div>
                <div>Mira todos los productos</div>
                <div className="productos">Ver productos</div>
              </div>
              <Image src={peluche} loading="lazy" className="bottom-img" />
            </a>
          </article>
          <div className="multiple">
            <article>
              <a href="{base_url}edad/2">
                <div className="box pastel-blue">
                  <h2>Productos por edad</h2>
                  <div className="title">
                    +6
                    <div className="edad">meses</div>
                  </div>

                  <div className="productos">Ver productos</div>
                </div>
              </a>
            </article>
            <article>
              <a href="{base_url}edad/5">
                <div className="box pastel-yellow">
                  <h2>Productos por edad</h2>
                  <div className="title">
                    +3
                    <div className="edad">años</div>
                  </div>

                  <div className="productos">Ver productos</div>
                </div>
              </a>
            </article>
          </div>
        </div>
      </>
    );
  }
}

export default FilterCategories;
