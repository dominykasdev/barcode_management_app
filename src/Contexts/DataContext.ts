import React from "react";
import { IDataContext } from "../interfaces";

const DataContext = React.createContext<IDataContext>({} as IDataContext);

export default DataContext;
