import React from 'react';
import styles from './Paginator.module.css';

let Paginator = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div className={styles.pageNumbers}>
        {pages.map(page => {
            return <span className={props.currentPage === page && styles.selectedPage}
                onClick={() => props.onPageChanged(page)}>{page}</span>
        })}
    </div>
}

export default Paginator;