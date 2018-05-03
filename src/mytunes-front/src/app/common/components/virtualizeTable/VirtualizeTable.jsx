import * as React from 'react';
import { ScrollSync, Grid, AutoSizer } from 'react-virtualized';
import cn from 'classnames';
import styles from './ScrollSync.example.css';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import PropTypes from "prop-types";


export default class VirtualizeTable extends React.PureComponent {
    constructor(props) {
        super(props);

        const listArray = [];
        const rowCount = 500;
        for (let i = 0; i < rowCount; i++) {
            listArray.push({
                color : 'red',
                size : 50,
                name : "name " + i
            });
        }

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
                                            {(childrenParam) => (
                                                <div>
                                                    <div
                                                        className={"headerLine"}
                                                        style={{
                                                            height: rowHeight,
                                                            width: childrenParam.width - scrollbarSize(),
                                                        }}>
                                                        <Grid
                                                            className={styles.HeaderGrid}
                                                            columnWidth={(index) => this._getColumnWidth(index, childrenParam.width - scrollbarSize())}
                                                            columnCount={columnCount}
                                                            height={rowHeight}
                                                            overscanColumnCount={overscanColumnCount}
                                                            cellRenderer={(headerParam) => this._renderHeaderCell(headerParam, childrenParam.width - scrollbarSize())}
                                                            rowHeight={rowHeight}
                                                            rowCount={1}
                                                            scrollLeft={scrollLeft}
                                                            width={childrenParam.width - scrollbarSize()}
                                                        />
                                                    </div>
                                                    <div
                                                        style={{
                                                            height : childrenParam.height,
                                                            width : childrenParam.width,
                                                        }}>
                                                        <Grid
                                                            className={styles.BodyGrid}
                                                            columnWidth={(index) => this._getColumnWidth(index, childrenParam.width - scrollbarSize())}
                                                            columnCount={columnCount}
                                                            height={childrenParam.height}
                                                            onScroll={onScroll}
                                                            overscanColumnCount={overscanColumnCount}
                                                            overscanRowCount={overscanRowCount}
                                                            cellRenderer={(headerParam) => this._renderBodyCell(headerParam, childrenParam.width - scrollbarSize())}
                                                            rowHeight={rowHeight}
                                                            rowCount={rowCount}
                                                            width={childrenParam.width}
                                                        />
                                                    </div>
                                                </div>
                                            )}
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

    _renderBodyCell({columnIndex, key, rowIndex, style}, totalWidth) {
        const datumRenderer = this.props.data[rowIndex];
        const headerData = this.props.headers[columnIndex];
        const rowClass = rowIndex % 2 === 0 ? "evenRow" : "oddRow";
        const classNames = cn(rowClass, styles.cell, "tableCell", headerData.className);
        
        return (
            <div className={classNames}
                 key={"body_" + key}
                 style={ {...style, width : this._getColumnWidth({ index : columnIndex }, totalWidth)} }>
                <span>
                    { datumRenderer.renderCell(columnIndex) }
                </span>
            </div>
        );
    }

    _renderHeaderCell({columnIndex, key, rowIndex, style}, totalWidth) {
        const headerData = this.props.headers[columnIndex];
        const classNames = cn(styles.headerCell, "tableHeader", headerData.className);

        return (
            <div className={classNames}
                 key={"header_" + key}
                 style={ {...style, width : this._getColumnWidth({ index : columnIndex }, totalWidth)} }>
                <span>
                    { headerData.name }
                </span>
            </div>
        );
    }

    _getColumnWidth(indexObject, totalWidth) {
        const headerData = this.props.headers[indexObject.index];
        return totalWidth * headerData.widthPercentage;
    }
}

VirtualizeTable.propTypes = {
    headers: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
};