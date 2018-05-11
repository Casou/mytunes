import * as React from 'react';
import { ScrollSync, Grid, AutoSizer } from 'react-virtualized';
import { FontIcon } from 'material-ui';
import cn from 'classnames';
import styles from './ScrollSync.example.css';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import PropTypes from "prop-types";
import hash from "js-hash-code";


export default class VirtualizeTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columnWidth: 75,
            columnCount: props.headers ? props.headers.length : 0,
            height: 300,
            overscanColumnCount: 0,
            overscanRowCount: 20,
            rowHeight: 30,
            sortableColumnsProperties : props.sortableColumnsProperties ? props.sortableColumnsProperties : [],
            sortedColumn : props.sortedColumn ? props.sortedColumn : undefined,
            sortOrder : props.sortOrder ? props.sortOrder : "ASC"
        };

        this.renderTime = 0;

        this._renderBodyCell = this._renderBodyCell.bind(this);
        this._renderHeaderCell = this._renderHeaderCell.bind(this);
        this._sortDatas = this._sortDatas.bind(this);
    }

    render() {
        const {
            columnCount,
            overscanColumnCount,
            overscanRowCount,
            rowHeight
        } = this.state;
        
        const rowCount = this.props.data.length;
        const fixedWidth = this.props.headers.map(header => header.fixedWidth ? header.fixedWidth : 0).reduce((acc, val) => acc + val);
        this.renderTime++;

        return (
            <div>
                <ScrollSync>
                    {({
                          clientHeight,
                          clientWidth,
                          onScroll,
                          scrollHeight,
                          scrollLeft,
                          scrollTop,
                          scrollWidth,
                      }) => {
                        return (
                            <div className={cn(styles.GridColumn, "VirtualizeTable")}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ flex: '1 1 auto' , height: `calc(100vh - var(--lecteur-height) - ${rowHeight}px)` }}>
                                        <AutoSizer>
                                            {(childrenParam) => {
                                                const totalWidth = childrenParam.width - scrollbarSize();
                                                const totalWidthToDivide = totalWidth - fixedWidth;
                                                return (
                                                    <div>
                                                        <div
                                                            className={"headerLine"}
                                                            style={{
                                                                height: rowHeight,
                                                                width: totalWidth,
                                                            }}>
                                                            <Grid
                                                                className={styles.HeaderGrid}
                                                                columnWidth={(index) => this._getColumnWidth(index, totalWidthToDivide)}
                                                                columnCount={columnCount}
                                                                height={rowHeight}
                                                                overscanColumnCount={overscanColumnCount}
                                                                cellRenderer={(headerParam) => this._renderHeaderCell(headerParam, totalWidthToDivide)}
                                                                rowHeight={rowHeight}
                                                                rowCount={1}
                                                                scrollLeft={scrollLeft}
                                                                width={totalWidth}
                                                            />
                                                        </div>
                                                        <div
                                                            style={{
                                                                height : childrenParam.height - 40,
                                                                width : childrenParam.width,
                                                            }}>
                                                            <Grid
                                                                key={ hash(this.props.data) }
                                                                className={styles.BodyGrid}
                                                                columnWidth={(index) => this._getColumnWidth(index, totalWidthToDivide)}
                                                                columnCount={columnCount}
                                                                height={childrenParam.height - 40}
                                                                onScroll={onScroll}
                                                                overscanColumnCount={overscanColumnCount}
                                                                overscanRowCount={overscanRowCount}
                                                                cellRenderer={(headerParam) => this._renderBodyCell(headerParam, totalWidthToDivide)}
                                                                rowHeight={rowHeight}
                                                                rowCount={rowCount}
                                                                width={totalWidth}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            }}
                                        </AutoSizer>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                </ScrollSync>
            </div>
        );
    }

    _renderBodyCell({columnIndex, key, rowIndex, style}, totalWidthToDivide) {
        const datumRenderer = this.props.data[rowIndex];
        const headerData = this.props.headers[columnIndex];
        const rowClass = rowIndex % 2 === 0 ? "evenRow" : "oddRow";
        const classNames = cn(rowClass, styles.cell, "tableCell", headerData.className);
        
        return (
            <div className={classNames}
                 key={"body_" + key}
                 style={ {...style, width : this._getColumnWidth({ index : columnIndex }, totalWidthToDivide)} }>
                <span>
                    { datumRenderer.renderCell(columnIndex) }
                </span>
            </div>
        );
    }

    _renderHeaderCell({columnIndex, key, rowIndex, style}, totalWidthToDivide) {
        const headerData = this.props.headers[columnIndex];
        const sortable = this.props.sortableColumnsProperties[columnIndex].sortable;
        const sorted = this.state.sortedColumn === columnIndex;
        const sortOrder = this.state.sortOrder;
        const classNames = cn(
            styles.headerCell,
            "tableHeader",
            headerData.className,
            { "sortable" : sortable },
            { "sorted" : sorted });

        return (
            <div className={classNames}
                 key={"header_" + key}
                 style={ {...style, width : this._getColumnWidth({ index : columnIndex }, totalWidthToDivide)} }
                 onClick={() => {
                     if (sortable) {
                         this._sortDatas(columnIndex)
                     }
                 }}>
                <span>
                    { columnIndex === 0 ? this.renderTime : "" }
                    { headerData.name }
                </span>
                {
                    sortable ?
                        sortOrder === "ASC" ?
                            <FontIcon className="material-icons sortIcon">arrow_drop_up</FontIcon>
                            :
                            <FontIcon className="material-icons sortIcon">arrow_drop_down</FontIcon>
                        : ""
                }
            </div>
        );
    }

    _sortDatas(columnIndex) {
        const sortedColumn = columnIndex;
        const columnSortProperty = this.props.sortableColumnsProperties[sortedColumn];
        let sortOrder = "ASC";

        if (this.state.sortedColumn === columnIndex) {
            sortOrder = this.state.sortOrder === "ASC" ? "DESC" : "ASC";
        }

        const property = columnSortProperty.property;

        this.setState({
            ...this.state,
            sortOrder,
            sortedColumn
        });

        this.props.onSortDatas(property, sortOrder);
    }

    _getColumnWidth(indexObject, totalWidthToDivide) {
        const headerData = this.props.headers[indexObject.index];
        return headerData.fixedWidth ?
            headerData.fixedWidth :
            totalWidthToDivide * headerData.widthPercentage;
    }
}

VirtualizeTable.propTypes = {
    headers: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    sortableColumnsProperties: PropTypes.array,
    sortedColumn: PropTypes.number,
    sortOrder: PropTypes.string,
    onSortDatas: PropTypes.func
};