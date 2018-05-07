import React from 'react';
import { Grid, ScrollSync, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import './virtualizeTable.css'; // only needs to be imported once
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
// import AutoSizer from "./AutoSizer";

export default class VirtualizeTable extends React.Component {

  constructor(props, context) {
      super(props, context);

      this.state = {
          columnCount: 20,
          rowCount: 100,
          columnWidth: 75,
          rowHeight: 25,
          height: 500,
          overscanColumnCount: 0,
          overscanRowCount: 5,
      };

      this._renderBodyCell = this._renderBodyCell.bind(this);
      this._renderHeaderCell = this._renderHeaderCell.bind(this);
      // this._renderLeftSideCell = this._renderLeftSideCell.bind(this);
  }

    _renderHeaderCell({columnIndex, key, style}) {
    return (
      <div key={key} style={style}>
        {`C${columnIndex}`}
      </div>
    );
  }

  
  _renderBodyCell({columnIndex, key, rowIndex, style}) {
    if (columnIndex < 1) {
      return;
    }
    
    return (
      <div key={key} style={style}>
        {`R${rowIndex}, C${columnIndex}`}
      </div>
    );
  }
  
  
  render() {
      const {
          columnCount,
          columnWidth,
          height,
          overscanColumnCount,
          overscanRowCount,
          rowHeight,
          rowCount,
      } = this.state;

    return (
      <section>
        <h1>ScrollSync</h1>
        <h2>https://bvaughn.github.io/react-virtualized/#/components/ScrollSync</h2>
        <ScrollSync>
          {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => {


            return (
                <div className='Table'>
                  <AutoSizer>
                      {({width}) => (
                          <div>
                              <div className='topRow'
                                   style={{
                                       height: rowHeight,
                                       width: width - scrollbarSize(),
                                   }}>
                                  <Grid
                                      columnWidth={columnWidth}
                                      columnCount={columnCount}
                                      height={rowHeight}
                                      overscanColumnCount={overscanColumnCount}
                                      cellRenderer={this._renderHeaderCell}
                                      rowHeight={rowHeight}
                                      rowCount={1}
                                      scrollLeft={scrollLeft}
                                      width={width - scrollbarSize()}
                                  />
                              </div>
                              <div className='tableContent'
                                   style={{
                                       height,
                                       width,
                                   }}>>
                                <Grid
                                    columnWidth={columnWidth}
                                    columnCount={columnCount}
                                    height={height}
                                    onScroll={onScroll}
                                    overscanColumnCount={overscanColumnCount}
                                    overscanRowCount={overscanRowCount}
                                    cellRenderer={this._renderBodyCell}
                                    rowHeight={rowHeight}
                                    rowCount={rowCount}
                                    width={width}
                                />
                              </div>
                          </div>
                      )};
                  </AutoSizer>
                </div>
              )
          }}
        </ScrollSync>
      </section>
    )
  }
}