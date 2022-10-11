//Libraries
import { FlexboxGrid, Loader, Panel } from "rsuite";
//Icons
import {
  faDollarSign,
  faPeopleGroup,
  faPersonArrowUpFromLine,
} from "@fortawesome/free-solid-svg-icons";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Components
import { ICardInfo } from "../../../../interfaces/DashboardInterfaces/card-info.interface";
//Utils
import { formatCurrency } from "../../../../utils/formatCurrency";

interface ICardComponent {
  cardItem: ICardInfo;
}

const getClassNameById = (id: string) => {
  switch (id) {
    case "TM":
      return "total-members-p";
    case "CI":
      return "current-income-p";
    case "JTM":
      return "joined-this-month-p";
  }
};

export default function Card({ cardItem }: ICardComponent) {
  const { qty, id, name } = cardItem;
  return (
    <Panel bordered shaded className="card-container ">
      <FlexboxGrid align="middle">
        <FlexboxGrid.Item colspan={10}>
          {id === "TM" && <FontAwesomeIcon size="3x" icon={faPeopleGroup} />}
          {id === "CI" && <FontAwesomeIcon size="3x" icon={faDollarSign} />}
          {id === "JTM" && (
            <FontAwesomeIcon size="3x" icon={faPersonArrowUpFromLine} />
          )}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={14}>
          <p className={getClassNameById(id)}>
            {qty >= 0 ? formatCurrency(qty, id) : <Loader />}
          </p>
          <p>{name}</p>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  );
}
