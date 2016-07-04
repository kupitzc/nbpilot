#!/bin/bash
DATE=$(date +%s)
BDIR=./cleanptbackup/

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
