PHONY: github pudding

github:
	rm -rf docs
	cp -r build docs
	touch docs/.nojekyll
	git add -A
	git commit -m "update github pages"
	git push

copy-data:
	cp /Users/michellemcghee/Desktop/code/outliers-data/data/processed/dev-tracts-simplified-topo.json src/data/dev-tracts-simplified-topo.json 
	
# aws-sync:
# 	aws s3 sync build s3://pudding.cool/year/month/name --delete --cache-control 'max-age=31536000'

# aws-cache:
# 	aws cloudfront create-invalidation --distribution-id E13X38CRR4E04D --paths '/year/month/name*'	

# pudding: aws-sync aws-cache