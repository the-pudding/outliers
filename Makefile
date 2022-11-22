PHONY: github pudding

github:
	rm -rf docs
	cp -r build docs
	touch docs/.nojekyll
	git add -A
	git commit -m "update github pages"
	git push

DATA_PROJECT_ROOT=~/Code/outliers-data
DATA_PATH=${DATA_PROJECT_ROOT}/data/processed/california-tracts-topo.json
OUTPUT_PATH=src/data
copy-data:
	cp ${DATA_PATH} ${OUTPUT_PATH}
	
aws-sync:
	aws s3 sync build s3://pudding.cool/2022/11/upward-mobility --delete --cache-control 'max-age=31536000'

aws-cache:
	aws cloudfront create-invalidation --distribution-id E13X38CRR4E04D --paths '/2022/11/upward-mobility*'	

pudding: aws-sync aws-cache