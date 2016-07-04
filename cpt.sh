#!/bin/bash
DATE=$(date +%s)
BDIR=./backup/csv/

for file in *.csv
do
	NAME=${file%.*}
	mv $file ${BDIR}${NAME}_${DATE}.csv
done

#for file in *.db
#do
#	NAME=${file%.*}
#	mv $file ${BDIR}${NAME}_${DATE}.db
#done
