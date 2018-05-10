import * as React from 'react';
import { ScrollSync, Grid, AutoSizer } from 'react-virtualized';
import cn from 'classnames';
import styles from './ScrollSync.example.css';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import PropTypes from "prop-types";


export default class VirtualizeTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columnWidth: 75,
            columnCount: props.headers ? props.headers.length : 0,
            height: 300,
            overscanColumnCount: 0,
            overscanRowCount: 5,
            rowHeight: 30
        };

        this._renderBodyCell = this._renderBodyCell.bind(this);
        this._renderHeaderCell = this._renderHeaderCell.bind(this);
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
                                                                height : childrenParam.height,
                                                                width : childrenParam.width,
                                                            }}>
                                                            <Grid
                                                                className={styles.BodyGrid}
                                                                columnWidth={(index) => this._getColumnWidth(index, totalWidthToDivide)}
                                                                columnCount={columnCount}
                                                                height={childrenParam.height}
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
        const classNames = cn(styles.headerCell, "tableHeader", headerData.className);

        return (
            <div className={classNames}
                 key={"header_" + key}
                 style={ {...style, width : this._getColumnWidth({ index : columnIndex }, totalWidthToDivide)} }>
                <span>
                    { headerData.name }
                </span>
            </div>
        );
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
    data: PropTypes.array.isRequired
};